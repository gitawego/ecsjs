import type { ArcheType } from '../../ecs/ArcheType';
import { System } from '../../ecs/System';
import type { ToDoItemComponent } from '../components/ToDoItemComponent';
import { ToDoListComponent } from '../components/ToDoListComponent';
import { live } from '../domHelper';
import { RenderType, ToDoWorld } from '../todo.model';

export class ToDoListSystem extends System<ToDoWorld> {
  toDoItemsArchType: ArcheType<ToDoWorld>;

  constructor(override readonly world: ToDoWorld) {
    super(world, {
      componentNames: ['toDoList'],
      name: 'toDoList',
      updateBefore: 'storage',
    });
    this.toDoItemsArchType = this.world.archetype(['toDoItem']);
  }

  container(selector: string) {
    return this.world.options?.screen?.querySelector<HTMLDivElement>(selector);
  }

  async update([todoListComp]: [ToDoListComponent]) {
    const entity = this.world.findEntityById(todoListComp.entityId);
    if (!entity) {
      return;
    }
    const container = this.container(todoListComp.data.container);
    if (!container) {
      console.warn('toDoListSystem: container not found');
      return;
    }
    this.renderContainer(todoListComp);
    this.renderToDoItems(todoListComp);
  }

  getItemsNode(selector: string) {
    const container = this.container(selector);
    return container?.querySelector<HTMLDivElement>('.to-do-list-items');
  }

  renderContainer(todoListComp: ToDoListComponent) {
    const container = this.container(todoListComp.data.container);
    if (!container) {
      console.warn('toDoListSystem: container not found');
      return;
    }
    let actionNode = container.querySelector<HTMLElement>('.to-do-list-action');
    const renderType = todoListComp.data.renderType;
    if (actionNode) {
      actionNode.setAttribute('data-type', renderType);
    } else {
      container.innerHTML = `
        <div class="to-do-list-action btn-group" data-type="${renderType}">

        </div>
        <ul class="to-do-list-items list-group"></ul>
      `;
      const itemsNode =
        container.querySelector<HTMLDivElement>('.to-do-list-items')!;
      actionNode = container.querySelector('.to-do-list-action');
      live('click', '.btn', actionNode!, node => {
        console.log('node', node);
        const dataType = node.getAttribute('data-type') as RenderType;
        todoListComp.setData({
          renderType: dataType,
        });
        void this.world.tick();
      });
      live<HTMLInputElement>(
        'click',
        'input[type="checkbox"]',
        itemsNode!,
        input => {
          console.log('node', input, input.checked);
          const id: string = input.parentElement!.getAttribute('data-id')!;
          const entity = this.world.findEntityById(id);
          const comps = entity.findComponents(['toDoItem']);
          const toDoItem: ToDoItemComponent = comps[0];
          toDoItem.setData({
            status: !input.checked ? 'pending' : 'completed',
          });
          void this.world.tick();
        }
      );
      live<HTMLButtonElement>(
        'click',
        'button.btn-remove-item',
        itemsNode!,
        input => {
          const id: string = input.parentElement!.getAttribute('data-id')!;
          const entity = this.world.findEntityById(id);
          entity.addComponent({
            componentName: 'remove',
          });
          const [storageComp] = entity.findComponents(['storage']);
          storageComp.setData({
            toBeRemoved: true,
          });
          void this.world.tick();
        }
      );
    }
    const allClass = renderType === 'all' ? 'active' : '';
    const pendingClass = renderType === 'pending' ? 'active' : '';
    const completedClass = renderType === 'completed' ? 'active' : '';
    actionNode!.innerHTML = `<button type="button" class="btn btn-outline-secondary all-btn ${allClass}" type="submit" data-type="all">All</button>
    <button type="button" class="btn btn-outline-secondary pending-btn ${pendingClass}" type="submit" data-type="pending">Pending</button>
    <button type="button" class="btn btn-outline-secondary completed-btn ${completedClass}" type="submit" data-type="completed">Completed</button>`;
  }

  sortEntities() {
    return [...this.toDoItemsArchType.entityIds].sort((a, b) => {
      const entityA = this.world.findEntityById(a);
      const entityB = this.world.findEntityById(b);
      const [toDoCompA]: [ToDoItemComponent] = entityA.findComponents([
        'toDoItem',
      ]) as any;
      const [toDoCompB]: [ToDoItemComponent] = entityB.findComponents([
        'toDoItem',
      ]) as any;
      return new Date(toDoCompA.data.createdAt!) >
        new Date(toDoCompB.data.createdAt!)
        ? 1
        : -1;
    });
  }

  renderToDoItems(todoListComp: ToDoListComponent) {
    const itemsNode = this.getItemsNode(todoListComp.data.container!)!;
    for (const entityId of this.sortEntities()) {
      const ent = this.world.findEntityById(entityId);
      if (!ent) {
        continue;
      }

      const comps = ent.findComponents(['toDoItem']);
      const toDoComp: ToDoItemComponent = comps[0];
      const renderType = todoListComp.data.renderType;

      const node = this.findNodeById(entityId, itemsNode);
      if (renderType !== 'all' && toDoComp.data.status !== renderType) {
        node?.remove();
        continue;
      }
      this.renderItem(toDoComp, node, itemsNode, entityId);
    }
    const itemNodes = this.findNodes(itemsNode);
    itemNodes.forEach(item => {
      const id = item.getAttribute('data-id');
      if (id && !this.toDoItemsArchType.entityIds.has(id)) {
        item.remove();
      }
    });
  }

  renderItem(
    toDoComp: ToDoItemComponent,
    node: HTMLElement | undefined | null,
    itemsNode: HTMLElement,
    entityId: string
  ) {
    const checked = toDoComp.data.status === 'completed' ? 'checked' : '';
    if (!node) {
      itemsNode?.insertAdjacentHTML(
        'beforeend',
        `<li class="list-group-item d-flex to-do-list-item ${checked}" data-id=${entityId}>
            <input class="form-check-input me-2" type="checkbox" ${checked}>
            <span class="to-do-list-content">${toDoComp.data.content}</span>
            <button type="button" class="btn btn-outline-danger btn-remove-item">Remove</button>
          </li>`
      );
      node = this.findNodeById(entityId, itemsNode);
    } else {
      node.classList[checked ? 'add' : 'remove']('checked');
      node
        .querySelector('input')!
        [checked ? 'setAttribute' : 'removeAttribute'](checked, '');
    }
  }

  findNodeById(entityId: string, node?: HTMLElement) {
    return node?.querySelector<HTMLElement>(
      `.to-do-list-item[data-id="${entityId}"]`
    );
  }

  findNodes(node?: HTMLElement) {
    return node
      ? Array.from(node.querySelectorAll(`.to-do-list-item[data-id]`) || [])
      : [];
  }
}
