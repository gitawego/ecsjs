import { InitStorageComponent } from '../../ecs/components/InitStorageComponent';
import { StorageComponent } from '../../ecs/components/StorageComponent';
import { CreateComponent } from './CreateComponent';
import { RemoveComponent } from './RemoveComponent';
import { ToDoItemComponent } from './ToDoItemComponent';
import { ToDoListComponent } from './ToDoListComponent';

export const components = {
  create: CreateComponent,
  toDoItem: ToDoItemComponent,
  toDoList: ToDoListComponent,
  storage: StorageComponent,
  initStorage: InitStorageComponent,
  remove: RemoveComponent,
} as const;
