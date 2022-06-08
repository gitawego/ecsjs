import { Component } from '../../ecs/Component';
import { CreateAction } from '../todo.model';

export class CreateComponent extends Component<CreateAction> {
  static override readonly componentName = 'create';
}
