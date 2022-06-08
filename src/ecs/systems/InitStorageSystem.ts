import type { StorageComponent } from '../components/StorageComponent';
import { Storages } from '../model';
import { LocalStorage } from '../storage/LocalStorage';
import { MemoryStorage } from '../storage/MemoryStorage';
import { SessionStorage } from '../storage/SessionStorage';
import { System } from '../System';
import { World } from '../World';

/**
 * create an one-time entity with `initStorage` as the only component.
 */
export class InitStorageSystem<W extends World = any> extends System<W> {
  storage: Storages = {
    memory: new MemoryStorage('entity'),
    session: new SessionStorage('entity'),
    local: new LocalStorage('entity'),
  };

  constructor(world: W) {
    super(world, {
      componentNames: ['initStorage'],
      name: 'initStorage',
      updateBefore: 'storage',
      beforeAll: true,
    });
  }

  override async update([storageComp]: [StorageComponent]) {
    if (!storageComp) {
      return;
    }
    const entity = this.world.findEntityById(storageComp.entityId);
    const storageInstance = this.storage[storageComp.data.type];
    if (!storageComp.data.initialized) {
      this.world.loadEntities(await storageInstance.query());
      storageComp.data.initialized = true;
      storageComp.setData({
        initialized: true,
      });
      entity.dispose();
      void this.world.tick();
    }
  }
}
