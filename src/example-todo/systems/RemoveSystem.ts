import { System } from '../../ecs/System';
import { RemoveComponent } from '../components/RemoveComponent';
import { ToDoItemComponent } from '../components/ToDoItemComponent';
import { Systems, ToDoWorld } from '../todo.model';

export class RemoveSystem extends System<ToDoWorld, Systems> {
  constructor(override readonly world: ToDoWorld) {
    super(world, {
      componentNames: ['toDoItem', 'remove'],
      name: 'remove',
      afterAll: true,
    });
  }

  container(selector: string) {
    return this.world.options?.screen?.querySelector<HTMLDivElement>(selector);
  }

  async update([todoItemComp, removeComp]: [
    ToDoItemComponent,
    RemoveComponent
  ]) {
    const entity = this.world.findEntityById(removeComp.entityId);
    if (!entity) {
      return;
    }
    entity.dispose();
    await this.world.tick();
  }
}