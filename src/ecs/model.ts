import type EventEmitter from 'eventemitter3';
import type { Component } from './Component';
import type { Entity } from './Entity';
import type { LocalStorage } from './storage/LocalStorage';
import type { MemoryStorage } from './storage/MemoryStorage';
import type { SessionStorage } from './storage/SessionStorage';
import type { System } from './System';
import type { World } from './World';

export interface EntityOptions<Data = any, ComponentName = any> {
  id?: string;
  tags?: string[];
  components?: Omit<AddComponentOptions<Data, ComponentName>, 'entityId'>[];
  importData?: boolean;
}

export interface AddComponentOptions<Data = any, ComponentName = any> {
  componentName: ComponentName;
  entityId: string;
  data: Data;
  importData?: boolean;
}

export interface ComponentOptions<Comp extends string = any> {
  componentName: Comp;
  entityId: string;
}

export interface RemoveComponentOptions<W extends World> {
  componentName?: keyof W['components'];
  componentId?: string;
  entityId: string;
}

export interface SystemOptions<W extends World = any> extends SystemOrder<W> {
  name: string;
  componentNames: (keyof W['components'])[];
}

export interface SystemOrder<W extends World = any> {
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
  updateBefore?: keyof Parameters<W['addSystems']>[0];
  /**
   * update after specified system
   */
  updateAfter?: keyof Parameters<W['addSystems']>[0];
}

export interface SystemGroup<W extends World = any> extends SystemOrder<W> {
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
  'component:remove': RemoveComponentOptions<W>;
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

export interface ECSStorage<T = any> extends EventEmitter<ECSStorageEventName> {
  get(id: string): Promise<T>;
  set(id: string, val: T): Promise<any>;
  remove(id: string): Promise<boolean>;
  query(selector: any): Promise<T[]>;
}

export interface WorldStorage {
  entity?: ECSStorage<Required<EntityOptions>>;
  component?: ECSStorage<ComponentStorageData>;
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

export type ComponentSubClass = (new (...args: any[]) => InstanceType<
  typeof Component
>) & {
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

export interface WorldOptions<State = any> {
  /**
   * for UI
   */
  screen?: HTMLElement;
  storage?: WorldStorage;
  state?: State;
}
