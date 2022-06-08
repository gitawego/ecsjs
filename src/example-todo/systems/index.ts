import { InitStorageSystem } from '../../ecs/systems/InitStorageSystem';
import { StorageSystem } from '../../ecs/systems/StorageSystem';
import { CreationSystem } from './CreationSystem';
import { RemoveSystem } from './RemoveSystem';
import { ToDoListSystem } from './ToDoListSystem';

export const systems = {
  creation: CreationSystem,
  toDoList: ToDoListSystem,
  initStorage: InitStorageSystem,
  storage: StorageSystem,
  remove: RemoveSystem,
} as const;
