import { Component } from './Component';
import { RegisteredSystems, SystemOptions } from './model';
import { World } from './World';

/**
 * extend this class to create a system
 */
export abstract class System<
  W extends World,
  S extends RegisteredSystems<World> = any
> {
  constructor(
    readonly world: W,
    readonly opt: SystemOptions<W['components'], S>
  ) {}

  abstract update(comps: Component[]): Promise<any>;
  async preUpdate?(): Promise<void>;

  async postUpdate?(): Promise<void>;
  async run() {
    await this.preUpdate?.();
    for (const comps of this.queryComponents()) {
      try {
        await this.update(comps);
      } catch (err) {
        console.error(err.message, err.stack);
        this.world.emit('system:error', {
          systemName: this.opt.name,
          components: comps,
        });
      }
    }
    await this.postUpdate?.();
  }

  queryComponents() {
    return this.world.queryComponents(this.opt.componentNames);
  }
}
