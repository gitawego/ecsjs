import { Component } from '../../ecs/Component';
import { ToDoItem } from '../todo.model';

export class ToDoItemComponent extends Component<ToDoItem> {
  static override readonly componentName = 'toDoItem';
}
