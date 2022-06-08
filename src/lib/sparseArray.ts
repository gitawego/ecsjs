export function findIndex<T>(
  items: T[],
  fnc: (data: T, i: number) => boolean | undefined
) {
  const indexes = Object.keys(items);
  for (const key of indexes) {
    const idx = Number(key);
    const res = fnc(items[idx], idx);
    if (res) {
      return Number(key);
    }
  }
  return -1;
}

export function find<T>(
  items: T[],
  fnc: (data: T, i: number) => boolean | undefined
) {
  const indexes = Object.keys(items);
  for (const key of indexes) {
    const idx = Number(key);
    const res = fnc(items[idx], idx);
    if (res) {
      return items[idx];
    }
  }
  return undefined;
}

export function forEach<T>(
  items: T[],
  fnc: (data: T, i: number) => boolean | undefined
) {
  const indexes = Object.keys(items);
  for (const key of indexes) {
    const idx = Number(key);
    fnc(items[idx], idx);
  }
}

export function* cursor<T>(items: T[]) {
  const indexes = Object.keys(items);
  for (const key of indexes) {
    const idx = Number(key);
    yield items[idx];
  }
}
