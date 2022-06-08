import EventEmitter from 'eventemitter3';
import * as uuid from 'uuid';
import { GraphData, tsort } from '../lib/tsort';
import { ArcheType } from './ArcheType';
import { Component } from './Component';
import { Entity } from './Entity';
import {
  AddComponentOptions,
  ECSEventName,
  EntityOptions,
  RegisteredComponents,
  RegisteredSystems,
  RemoveComponentOptions,
  SystemOptions,
  ValueOf,
  WorldEvents,
  WorldOptions,
} from './model';
import { state } from './state';
import { buildComponentId, matchTags } from './utils';

const TICKET_ERROR_EVENT = 'tick:error';
export class World<
    C extends RegisteredComponents = any,
    S extends RegisteredSystems<World> = any,
    State extends object = any
  >
  extends EventEmitter<ECSEventName>
  implements WorldEvents
{
  systems: Partial<{
    [K in keyof S]: InstanceType<S[K]>;
  }> = {};

  components: Partial<C> = {};

  componentInstances: Record<string, Component> = {};

  entities: Record<string, Entity<World<C, S, State>>> = {};

  queryMapping = {
    id: this.queryEntitiesByIds.bind(this),
    tag: this.queryEntitiesByTags.bind(this),
    component: this.queryEntitiesByComponents.bind(this),
  };

  /**
   * global state
   */
  state = state<State>({});

  constructor(readonly options?: WorldOptions) {
    super();
  }
  /**
   * use archetype to get related entities
   * @param componentNames
   * @returns
   */

  archetype(componentNames: string[]): ArcheType {
    return new ArcheType(componentNames, this);
  }

  registerComponents(comps: C) {
    for (const val of Object.values(comps)) {
      this.registerComponent(val as ValueOf<C>);
    }
  }

  registerComponent(Comp: ValueOf<C>) {
    if (this.components[Comp.componentName]) {
      throw new Error(
        `World: component ${Comp.componentName} is already added`
      );
    }
    this.components[Comp.componentName as keyof C] = Comp;
    return this;
  }

  unregisterComponent(name: string) {
    for (const entity of Object.values(this.entities)) {
      this.removeComponentFromEntity({
        componentName: name,
        entityId: entity.id,
      });
    }
    delete this.components[name];
  }

  addComponentToEntity<
    EO extends ConstructorParameters<C[EK]>[0],
    EK extends keyof C
  >(opt: AddComponentOptions<EO, EK>) {
    const Comp = this.components[opt.componentName];
    if (!Comp) {
      throw new Error(`World: component ${opt.componentName} not found`);
    }
    const inst = new Comp!(opt, this);
    if (opt.importData) {
      inst.importData(opt.data);
    }
    this.componentInstances[inst.id] = inst;
    this.emit('component:add', opt);
    return this;
  }

  getComponent<T extends typeof Component>(name: string): T {
    return this.components[name] as any;
  }

  removeComponentFromEntity(opt: RemoveComponentOptions) {
    const id =
      opt.componentId ||
      buildComponentId({
        componentName: opt.componentName!,
        entityId: opt.entityId,
      });
    if (this.componentInstances[id]) {
      this.componentInstances[id].dispose();
      this.emit('component:remove', opt);
      return true;
    }
    return false;
  }

  addSystems(sys: S) {
    for (const val of Object.values(sys)) {
      this.addSystem(val as ValueOf<S>);
    }
  }

  addSystem(Sys: ValueOf<S>, opt?: SystemOptions<C, S>) {
    const inst: any = new Sys(this, opt);
    this.systems[inst.opt.name as keyof S] = inst;
    return this;
  }

  getSystem(sysName: keyof S) {
    return this.systems[sysName];
  }

  sortSystems(systems = Object.values(this.systems)) {
    const noOrder: string[] = [];
    const beforeAll: string[] = [];
    const afterAll: string[] = [];
    const systemGraph = systems.reduce((data: GraphData, sys) => {
      const name = sys!.opt.name;
      if (sys!.opt.beforeAll) {
        beforeAll.push(name);
        return data;
      }
      if (sys!.opt.afterAll) {
        afterAll.push(name);
        return data;
      }
      if (sys!.opt.updateBefore) {
        data.push([name, sys!.opt.updateBefore]);
      } else if (sys!.opt.updateAfter) {
        data.push([sys!.opt.updateAfter, name]);
      } else {
        noOrder.push(name);
      }
      return data;
    }, []);
    return {
      beforeAll,
      afterAll,
      orderedSystems: tsort(systemGraph),
      systems: noOrder,
    };
  }

  async tick() {
    const tickId = uuid.v4();
    this.emit('tick:before', {
      tickId,
      timestamp: Date.now(),
    });
    const sortedSystemOrder = this.sortSystems();

    // run beforeAll systems at the same time, waiting for the results
    const beforeAll = sortedSystemOrder.beforeAll.map(async sysName =>
      this.runSystem(sysName, tickId)
    );
    await Promise.allSettled(beforeAll);

    // run normal systems at the same time without waiting for it
    const systemExecutions = sortedSystemOrder.systems.map(async sysName =>
      this.runSystem(sysName, tickId)
    );
    void Promise.allSettled(systemExecutions);

    // run ordered systems in the given order
    for (const sysName of sortedSystemOrder.orderedSystems) {
      await this.runSystem(sysName, tickId);
    }

    // run afterAll systems at the same time, waiting for the results
    const afterAll = sortedSystemOrder.afterAll.map(async sysName =>
      this.runSystem(sysName, tickId)
    );
    await Promise.allSettled(afterAll);

    this.emit('tick:after', {
      tickId,
      timestamp: Date.now(),
    });
  }

  private async runSystem(sysName: string, tickId: string) {
    try {
      return await this.getSystem(sysName)?.run();
    } catch (err) {
      this.emit(TICKET_ERROR_EVENT, {
        error: err,
        systemName: sysName,
        tickId,
        timestamp: Date.now(),
      });
      return null;
    }
  }

  exportEntities(): EntityOptions[] {
    return Object.values(this.entities).map(entity =>
      this.exportEntity(entity)
    );
  }

  exportEntity(entity: Entity<World>) {
    const components = entity.components.map(compName => {
      const comp = this.componentInstances[compName];
      return {
        componentName: comp.componentName,
        data: comp.exportData(),
      };
    });
    return {
      id: entity.id,
      tags: entity.opt.tags,
      components,
    };
  }

  loadEntities(data: EntityOptions[]) {
    for (const entityData of data) {
      this.addEntity({
        ...entityData,
        importData: true,
      });
    }
  }

  addEntity<
    EO extends ConstructorParameters<C[EK]>[0]['data'],
    EK extends keyof C
  >(opt: EntityOptions<EO, EK>) {
    const entity = new Entity(opt, this);
    this.entities[entity.id] = entity;
    entity.init();
    this.emit('entity:add', {
      entity,
    });
    return entity;
  }

  removeEntityByTags(tags: string[]) {
    for (const entity of Object.values(this.entities)) {
      const found = matchTags(tags, entity.opt.tags || []);
      if (found) {
        this.removeEntityById(entity.id);
      }
    }
    return this;
  }

  removeEntityById(id: string) {
    if (this.entities[id]) {
      const tags = this.entities[id].opt.tags;
      delete this.entities[id];
      this.emit('entity:remove', {
        id,
        tags,
      });
    }
    return this;
  }

  findEntityById(id: string) {
    return this.entities[id];
  }

  /**
   * query components by names
   * @param componentNames
   * @returns
   */
  *queryComponents(componentNames: (keyof C)[]) {
    for (const entity of Object.values(this.entities)) {
      const res = entity.findComponents(componentNames);
      if (res.filter((a: any) => !!a).length === componentNames.length) {
        yield res;
      }
    }
  }

  /**
   * query local entities
   * @param data
   * @param type
   * @returns
   */
  queryEntities(data: string[], type: keyof World['queryMapping'] = 'id') {
    return this.queryMapping[type](data);
  }

  queryEntitiesByTags(tags: string[]): Entity<World<C, S, State>>[] {
    return Object.values(this.entities).reduce(
      (arr: Entity<World<C, S, State>>[], entity) => {
        if (matchTags(tags, entity.opt.tags || [])) {
          arr.push(entity);
        }
        return arr;
      },
      []
    );
  }

  queryEntitiesByIds(ids: string[]) {
    return ids.map(id => this.entities[id]);
  }

  queryEntitiesByComponents(
    componentNames: string[]
  ): Entity<World<C, S, State>>[] {
    return Object.values(this.entities).reduce(
      (arr: Entity<World<C, S, State>>[], entity) => {
        const res = entity.findComponents(componentNames);
        if (res.filter(a => !!a).length === componentNames.length) {
          arr.push(entity);
        }

        return arr;
      },
      []
    );
  }
}
