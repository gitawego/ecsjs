import type EventEmitter from 'eventemitter3';
import type { Component } from './Component';
import type { Entity } from './Entity';
import type { LocalStorage } from './storage/LocalStorage';
import type { MemoryStorage } from './storage/MemoryStorage';
import type { SessionStorage } from './storage/SessionStorage';
import type { System } from './System';
import type { World } from './World';

export interface EntityOptions<T = any, N = any> {
  id?: string;
  tags?: string[];
  components?: Omit<AddComponentOptions<T, N>, 'entityId'>[];
  importData?: boolean;
}

export interface AddComponentOptions<T = any, N = any> {
  componentName: N;
  entityId: string;
  data: T;
  importData?: boolean;
}

export interface ComponentOptions<Comp extends string = any> {
  componentName: Comp;
  entityId: string;
}

export interface RemoveComponentOptions {
  componentName?: string;
  componentId?: string;
  entityId: string;
}

export interface SystemOptions<
  C extends Record<ComponentSubClass['componentName'], ComponentSubClass>,
  S extends RegisteredSystems<World> = any
> extends SystemOrder<S> {
  name: string;
  componentNames: (keyof C)[];
}

export interface SystemOrder<S extends RegisteredSystems<World> = any> {
  /**
   * run before other systems
   */
  beforeAll?: boolean;
  /**
   * run after other systems
   */
  afterAll?: boolean;
  /**
   * update before specified system
   */
  updateBefore?: keyof S;
  /**
   * update after specified system
   */
  updateAfter?: keyof S;
}

export interface SystemGroup<S extends RegisteredSystems<World> = any>
  extends SystemOrder<S> {
  name: string;
  systems: string[];
  children: string[];
}

export interface TickEvent {
  tickId: string;
  timestamp: number;
}

export type TickError = TickEvent & {
  error: Error;
  systemName: string;
};

export interface ECSStorageEvent {
  add: {
    id: string;
    val: any;
  };
  remove: {
    id: string;
  };
}

export type ECSStorageEventName = keyof ECSStorageEvent;

export interface ECSEvents<W extends World = any> {
  'tick:error': TickError;
  'tick:before': TickEvent;
  'tick:after': TickEvent;
  'entity:add': AddEntityEvent<W>;
  'entity:remove': RemoveEntityEvent;
  'entity:tag:add': {
    id: string;
    tag: string;
  };
  'entity:tag:remove': {
    id: string;
    tag: string;
  };
  'entity:parent:change': {
    id: string;
    fromParent: string;
    toParent: string;
  };
  'component:remove': RemoveComponentOptions;
  'component:add': AddComponentOptions;
  'system:error': {
    systemName: string;
    components: Component[];
  };
}

export interface RemoveEntityEvent {
  id: string;
  tags?: string[];
}

export interface AddEntityEvent<W extends World = any> {
  entity: Entity<W>;
}

export type ECSEventName = keyof ECSEvents;

export interface ECSStorage<T = any> extends EventEmitter<ECSStorageEventName> {
  get(id: string): Promise<T>;
  set(id: string, val: T): Promise<any>;
  remove(id: string): Promise<boolean>;
  query(selector: any): Promise<T[]>;
}

export interface WorldOptions {
  storage?: WorldStorage;
}

export interface WorldStorage {
  entity?: ECSStorage<Required<EntityOptions>>;
  component?: ECSStorage<ComponentStorageData>;
}

export interface WorldEvents {
  emit<T extends ECSEventName>(type: T, data: ECSEvents[T]): boolean;

  on<T extends ECSEventName>(type: T, fnc: (data: ECSEvents[T]) => void): this;

  once<T extends ECSEventName>(
    type: T,
    fnc: (data: ECSEvents[T]) => void
  ): this;

  off<T extends ECSEventName>(type: T, fnc: (data: ECSEvents[T]) => void): this;
}

export interface ComponentStorageData<T = any> {
  id: string;
  entityId: string;
  componentName: string;
  data: T;
}

export interface StorageComponentOptions {
  type: keyof Storages;
  /**
   * first call, it will restore entities from storage
   */
  initialized?: boolean;
  toBeRemoved?: boolean;
}

export interface Storages {
  memory: MemoryStorage;
  local: LocalStorage;
  session: SessionStorage;
}

export type ComponentSubClass = (new (...args: any[]) => Component) & {
  // a concrete constructor of Component<any>
  [K in keyof typeof Component]: typeof Component[K];
};

export type SystemSubClass<W extends World> = (new (
  ...args: any[]
) => System<W>) & {
  // a concrete constructor of System<any>
  [K in keyof typeof System]: typeof System[K];
};

export type RegisteredSystems<W extends World> = Record<
  InstanceType<SystemSubClass<W>>['opt']['name'],
  SystemSubClass<W>
>;

export type RegisteredComponents = Record<
  ComponentSubClass['componentName'],
  ComponentSubClass
>;

export type ValueOf<T> = T[keyof T];

export interface WorldOptions {
  /**
   * for UI
   */
  screen?: HTMLElement;
}
