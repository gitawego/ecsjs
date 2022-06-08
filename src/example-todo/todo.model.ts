import type { World } from '../ecs/World';
import type { components } from './components';
import type { systems } from './systems';

export interface ToDoItem {
  content: string;
  /**
   * iso date string
   */
  createdAt?: string;
  /**
   * iso date string
   */
  updatedAt?: string;
  status: ToDoStatus;
}

export type ToDoStatus = 'pending' | 'completed';

export type RenderType = 'all' | ToDoStatus;

export interface ToDoListOptions {
  renderType: RenderType;
  container: string;
}

export interface CreateAction {
  content?: string;
  nodeSelector: string;
  node?: HTMLElement | null;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Components = typeof components;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Systems = typeof systems;
export type ToDoWorld = World<Components, Systems>;
