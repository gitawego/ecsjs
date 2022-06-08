import EventEmitter from 'eventemitter3';
import { ECSStorage, ECSStorageEventName } from '../model';

export class LocalStorage<T = any>
  extends EventEmitter<ECSStorageEventName>
  implements ECSStorage<T>
{
  storage = localStorage;

  prefix: string;

  constructor(readonly collectionName: string) {
    super();
    this.prefix = `ecs.${this.collectionName}`;
  }

  getId(key: string) {
    return `${this.prefix}.${key}`;
  }

  async get(id: string) {
    const val = this.storage.getItem(this.getId(id));
    return val && JSON.parse(val);
  }

  async set(id: string, val: T) {
    this.storage.setItem(this.getId(id), JSON.stringify(val));
    this.emit('add', {
      id,
      val,
    });
  }

  async remove(id: string) {
    this.storage.removeItem(this.getId(id));
    this.emit('remove', {
      id,
    });
    return true;
  }

  async query(selector: Partial<T> = {}) {
    const reg = new RegExp(this.prefix);
    return Object.keys(this.storage).reduce((arr: T[], itemKey) => {
      if (!reg.test(itemKey)) {
        return arr;
      }
      const item: T = JSON.parse(this.storage.getItem(itemKey)!);
      if (
        Object.keys(selector).length === 0 ||
        this.matchValues(selector, item)
      ) {
        arr.push(item);
      }
      return arr;
    }, []);
  }

  matchValues(selector: Partial<T> = {}, item: T) {
    return Object.keys(selector).every(
      key => selector[key as keyof T] === item[key as keyof T]
    );
  }
}
