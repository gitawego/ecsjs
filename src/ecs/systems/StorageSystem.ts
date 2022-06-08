import type { StorageComponent } from '../components/StorageComponent';
import { Storages } from '../model';
import { LocalStorage } from '../storage/LocalStorage';
import { MemoryStorage } from '../storage/MemoryStorage';
import { SessionStorage } from '../storage/SessionStorage';
import { System } from '../System';
import { World } from '../World';

export class StorageSystem<W extends World = any> extends System<W> {
  storage: Storages = {
    memory: new MemoryStorage('entity'),
    session: new SessionStorage('entity'),
    local: new LocalStorage('entity'),
  };

  constructor(world: W) {
    super(world, {
      componentNames: ['storage'],
      name: 'storage',
    });
  }

  override async update([storageComp]: [StorageComponent]) {
    if (!storageComp) {
      return;
    }
    const entity = this.world.findEntityById(storageComp.entityId);
    const storageInstance = this.storage[storageComp.data.type];
    if (storageInstance) {
      if (storageComp.data.toBeRemoved) {
        await storageInstance.remove(entity.id);
        return;
      }
      if (entity?.updated) {
        await storageInstance.set(entity.id, this.world.exportEntity(entity));
        entity.updated = false;
      }
    }
  }
}
