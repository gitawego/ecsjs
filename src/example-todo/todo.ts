import { World } from '../ecs/World';
import { components } from './components';
import {
  initStorageEntity,
  searchFieldEntity,
  toDoListEntity,
} from './entities';
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
    initStorageEntity(this.world);
    searchFieldEntity(this.world);
    toDoListEntity(this.world);
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
