export class ImmutableMap<Map extends Record<string, T> = {}, T = unknown> {
  data: Map;

  constructor(data?: Map) {
    this.data = data || ({} as Map);
  }

  get size() {
    return this.keys().length;
  }

  [Symbol.iterator]() {
    let count = 0;
    const entries = Object.values(this.data);
    const len = entries.length;
    return {
      next: () => {
        const value = entries[count];
        if (++count <= len) {
          return {
            value,
            done: false,
          };
        }
        return {
          done: true,
        };
      },
    };
  }

  keys() {
    return Object.keys(this.data) as (keyof Map)[];
  }

  values() {
    return Object.values(this.data);
  }

  has(key: string) {
    return key in this.data;
  }

  set<Key extends string, Value>(
    key: Exclude<Key, keyof Map>,
    value: Value
  ): ImmutableMap<Map & { [k in Key]: Value }, T> {
    return new ImmutableMap({
      ...this.data,
      [key]: value,
    });
  }

  get<Key extends keyof Map>(key: Key): Map[Key] {
    return this.data[key];
  }

  delete<Key extends string>(
    key: Key
  ): ImmutableMap<{ [K in Exclude<keyof Map, Key>]: Map[K] }, T> {
    const data = {
      ...this.data,
    };
    delete data[key];
    return new ImmutableMap(data as { [K in Exclude<keyof Map, Key>]: Map[K] });
  }

  clear(): ImmutableMap<{}, T> {
    return new ImmutableMap({});
  }
}
