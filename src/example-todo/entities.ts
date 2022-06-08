import { ToDoWorld } from './todo.model';

export const toDoItemEntity = (content: string, world: ToDoWorld) => {
  world.addEntity({
    components: [
      {
        componentName: 'toDoItem',
        data: {
          content,
          createdAt: new Date().toISOString(),
          status: 'pending',
        },
      },
      {
        componentName: 'storage',
        data: {
          type: 'local',
        },
      },
    ],
  });
};

export const initStorageEntity = (world: ToDoWorld) => {
  world.addEntity({
    id: 'initStorage',
    components: [
      {
        componentName: 'initStorage',
        data: {
          type: 'local',
        },
      },
    ],
  });
};

export const searchFieldEntity = (world: ToDoWorld) => {
  world.addEntity({
    id: 'search-field',
    components: [
      {
        componentName: 'create',
        data: {
          nodeSelector: '.create-container',
        },
      },
    ],
  });
};

export const toDoListEntity = (world: ToDoWorld) => {
  world.addEntity({
    id: 'todo-list',
    components: [
      {
        componentName: 'toDoList',
        data: {
          renderType: 'all',
          container: '.todo-list-items',
        },
      },
      {
        componentName: 'storage',
        data: {
          type: 'local',
        },
      },
    ],
  });
};
