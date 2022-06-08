import { World } from '../ecs/World';
import { components } from './components';
import { systems } from './systems';
import { Components, Systems, ToDoWorld } from './todo.model';

export class ToDo extends HTMLElement {
  world: ToDoWorld;

  constructor() {
    super();
    this.world = new World<Components, Systems>({
      screen: this,
    });
    this.registerComponents();
    this.registerSystems();
  }

  connectedCallback() {
    this.innerHTML = `<div class="todo-list-container">
      <div class="create-container"></div>
      <div class="todo-list-items"></div>
    </div>`;
    this.world.addEntity({
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
    this.world.addEntity({
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
    this.world.addEntity({
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
    void this.world.tick();
  }

  registerComponents() {
    this.world.registerComponents(components);
  }

  registerSystems() {
    this.world.addSystems(systems);
  }
}

customElements.define('todo-list', ToDo);
