import { get, set } from 'lodash-es';

export type Subscriber<T> = (newState: T, oldState: T) => void;
export interface Subscribers<T> {
  key: keyof T;
  callback: Subscriber<T>;
}
export function state<T extends object = any>(initialState?: Partial<T>) {
  const subs: Subscribers<T>[] = [];
  const store = new Proxy(initialState || ({} as Partial<T>), {
    set(stateVal: T, key: string, value: any) {
      const oldState = { ...stateVal };
      set(stateVal, key, value);
      subs.forEach(sub => {
        if (get(stateVal, sub.key) !== get(oldState, sub.key)) {
          sub.callback(stateVal, oldState);
        }
      });
      return true;
    },
  });
  return {
    get(key: keyof T) {
      return store[key];
    },
    set<K extends keyof T>(key: K, val: T[K]) {
      store[key] = val;
    },
    subscribe(key: keyof T, callback: Subscriber<T>) {
      const obj = {
        key,
        callback,
      };
      subs.push(obj);
      return {
        unsubscribe: () => {
          const idx = subs.indexOf(obj);
          if (idx > -1) {
            subs.splice(idx, 1);
          }
        },
      };
    },
  };
}
