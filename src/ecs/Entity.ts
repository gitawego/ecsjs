import * as uuid from 'uuid';
import type { Component } from './Component';
import { EntityOptions } from './model';
import { buildComponentId, parseTags } from './utils';
import { World } from './World';
export class Entity<W extends World> {
  readonly id: string;

  updated = false;

  constructor(readonly opt: EntityOptions, readonly world: W) {
    this.id = this.opt.id || uuid.v4();
  }

  init() {
    for (const compOption of this.opt.components || []) {
      this.addComponent({
        componentName: compOption.componentName,
        initialData: compOption.data,
        importData: this.opt.importData,
      });
    }
  }

  get components() {
    const reg = new RegExp(this.id);
    return Object.keys(this.world.componentInstances).filter(name =>
      reg.test(name)
    );
  }

  addChild(opt: EntityOptions) {
    opt.tags = opt.tags || [];
    opt.tags.push(`parent:${this.id}`);
    this.world.addEntity(opt);
  }

  children() {
    const tag = `parent:${this.id}`;
    return Object.values(this.world.entities).filter(entity =>
      entity.opt.tags?.includes(tag)
    );
  }

  moveToParent(entityId: string) {
    const parent = this.world.findEntityById(entityId);
    if (!parent) {
      throw new Error(`moveToParent: parent ${entityId} is not found`);
    }
    const parsedTags = parseTags(this.opt.tags || []);
    if (parsedTags.parent !== entityId) {
      this.removeTag(`parent:${parsedTags.parent}`);
      this.addTag(`parent:${entityId}`);
      this.world.emit('entity:parent:change', {
        id: this.id,
        fromParent: parsedTags.parent,
        toParent: entityId,
      });
    }
  }

  findComponents(names: (keyof W['components'])[]): Component[] {
    return names.reduce((arr: Component[], name) => {
      const id = buildComponentId({
        componentName: name,
        entityId: this.id,
      });
      const comp = this.world.componentInstances[id];
      arr.push(comp || null);
      return arr;
    }, []);
  }

  addComponent<T extends Component>({
    componentName,
    initialData,
    importData = false,
  }: {
    componentName: string;
    initialData?: T['data'];
    importData?: boolean;
  }) {
    const [comp] = this.findComponents([componentName]);
    if (comp) {
      console.warn(
        `Entity: component ${componentName} is already added, overwrite data`
      );
      if (importData) {
        console.log('importing data for component', componentName);
        comp.setData(initialData!, true);
        return;
      }
    }
    this.world.addComponentToEntity({
      componentName,
      data: initialData,
      entityId: this.id,
      importData,
    });
  }

  removeComponent(componentName: string) {
    return this.world.removeComponentFromEntity({
      componentName,
      entityId: this.id,
    });
  }

  disposeComponents() {
    const reg = new RegExp(this.id);
    for (const id of Object.keys(this.world.componentInstances)) {
      if (reg.test(id)) {
        this.world.removeComponentFromEntity({
          componentId: id,
          entityId: this.id,
        });
      }
    }
  }

  addTag(tag: string) {
    const tags = new Set(this.opt.tags);
    if (tags.has(tag)) {
      return;
    }
    tags.add(tag);
    this.opt.tags = [...tags];
    this.world.emit('entity:tag:add', {
      id: this.id,
      tag,
    });
  }

  removeTag(tag: string) {
    const tags = new Set(this.opt.tags);
    if (tags.has(tag)) {
      return;
    }
    tags.delete(tag);
    this.opt.tags = [...tags];
    this.world.emit('entity:tag:remove', {
      id: this.id,
      tag,
    });
  }

  dispose() {
    this.children().forEach(entity => entity.dispose());
    this.disposeComponents();
    this.world.removeEntityById(this.id);
  }

  toJSON() {
    return this.world.exportEntity(this);
  }
}
