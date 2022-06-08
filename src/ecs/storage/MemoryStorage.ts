import EventEmitter from 'eventemitter3';
import { ECSStorage, ECSStorageEventName } from '../model';

export class MemoryStorage<T = any>
  extends EventEmitter<ECSStorageEventName>
  implements ECSStorage<T>
{
  data: Record<string, T> = {};

  constructor(readonly collectionName: string) {
    super();
  }

  async get(id: string) {
    return this.data[id];
  }

  async set(id: string, val: T) {
    this.data[id] = val;
    this.emit('add', {
      id,
      val,
    });
  }

  async remove(id: string) {
    delete this.data[id];
    this.emit('remove', {
      id,
    });
    return true;
  }

  async query(selector: Partial<T> = {}) {
    return Object.keys(this.data).reduce((arr: T[], itemKey) => {
      const item = this.data[itemKey];
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
