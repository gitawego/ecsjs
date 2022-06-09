import { merge } from 'lodash-es';
import { AddComponentOptions } from './model';
import { buildComponentId } from './utils';
import { World } from './World';

export class Component<T = any, W extends World = World> {
  static readonly componentName: string;

  readonly id: string;

  readonly componentName: string;

  data: T;

  entityId: string;

  constructor(opt: AddComponentOptions<T>, readonly world: W) {
    this.entityId = opt.entityId;
    this.componentName = (this.constructor as any).componentName;
    this.id = buildComponentId({
      componentName: this.componentName,
      entityId: this.entityId,
    });
    this.setData(opt.data, true);
    this.init?.();
  }

  /**
   * overwrite to modify how to import data
   * @param data
   */
  importData(data: any) {
    this.data = data;
  }

  /**
   * overwrite to modify how to export data
   * @returns
   */
  exportData() {
    return this.data;
  }

  init?(): any;

  setData(data: Partial<T>, replace = false) {
    if (replace) {
      this.data = data as T;
    } else {
      merge(this.data, data);
    }
    const entity = this.world.findEntityById(this.entityId);
    if (entity) {
      entity.updated = true;
    } else {
      console.warn(`entity ${this.entityId} not found`);
    }
  }

  dispose() {
    delete this.world.componentInstances[this.id];
  }
}
