import EventEmitter from 'eventemitter3';
import { AddEntityEvent, ECSEvents, RemoveEntityEvent } from './model';
import type { World } from './World';

const StrConstant = {
  entityAdd: 'entity:add',
  entityRemove: 'entity:remove',
} as const;

export class ArcheType<W extends World> extends EventEmitter<
  Pick<ECSEvents, 'entity:add' | 'entity:remove'>
> {
  entityIds = new Set<keyof W['entities']>();

  events: any[] = [];

  constructor(
    readonly componentNames: (keyof W['components'])[],
    readonly world: W
  ) {
    super();
    this.indexeEntities();
    const addEntity = (data: AddEntityEvent) => {
      if (
        data.entity.findComponents(this.componentNames).filter(a => !!a)
          .length === this.componentNames.length
      ) {
        this.entityIds.add(data.entity.id);
        this.emit(StrConstant.entityAdd, data.entity.id);
      }
    };
    const removeEntity = (data: RemoveEntityEvent) => {
      this.entityIds.delete(data.id);
      this.emit(StrConstant.entityRemove, data.id);
    };
    this.world.on(StrConstant.entityAdd, addEntity);
    this.world.on(StrConstant.entityRemove, removeEntity);
    this.events.push(() => {
      this.world.off(StrConstant.entityAdd, addEntity);
    });
    this.events.push(() => {
      this.world.off(StrConstant.entityRemove, removeEntity);
    });
  }

  indexeEntities() {
    const entityIds = this.world
      .queryEntitiesByComponents(this.componentNames)
      .map(entity => entity.id);
    this.entityIds = new Set(entityIds);
  }

  dispose() {
    this.events.forEach(fnc => fnc());
    this.events.length = 0;
  }
}
