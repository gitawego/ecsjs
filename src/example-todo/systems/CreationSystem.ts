import { System } from '../../ecs/System';
import { CreateComponent } from '../components/CreateComponent';
import { Systems, ToDoWorld } from '../todo.model';

export class CreationSystem extends System<ToDoWorld, Systems> {
  constructor(override readonly world: ToDoWorld) {
    super(world, {
      componentNames: ['create'],
      name: 'creation',
    });
  }

  async update([createComp]: [CreateComponent]) {
    createComp.data.node =
      createComp.data.node ||
      this.world.options?.screen?.querySelector(createComp.data.nodeSelector);
    if (
      createComp.data.node &&
      !createComp.data.node?.classList.contains('initialized')
    ) {
      createComp.data.node.innerHTML = `
      <div class="input-group">
        <input type="text" class="form-control creation-input" placeholder="to do content" aria-label="to do content">
        <button class="btn btn-outline-secondary submit-btn" type="button" id="button-addon2">Add</button>
      </div>`;
      createComp.data.node.classList.add('initialized');
      createComp.data.node
        .querySelector('.submit-btn')!
        .addEventListener('click', evt => {
          console.log(evt);
          const val =
            createComp.data.node?.querySelector<HTMLInputElement>(
              '.creation-input'
            )!.value;
          console.log('val', val);
          if (val) {
            this.world.addEntity({
              components: [
                {
                  componentName: 'toDoItem',
                  data: {
                    content: val,
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
            void this.world.tick();
          }
        });
    }
  }
}
