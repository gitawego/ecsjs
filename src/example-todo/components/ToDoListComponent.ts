import { Component } from '../../ecs/Component';
import { ToDoListOptions } from '../todo.model';

export class ToDoListComponent extends Component<ToDoListOptions> {
  static override readonly componentName = 'toDoList';
}
