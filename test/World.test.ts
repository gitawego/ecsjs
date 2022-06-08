import { expect, test } from 'vitest';
import { World } from '../src/core/World';

test('world: order', () => {
  const world = new World();
  const systems: any = [
    {
      opt: {
        name: 'D',
        updateBefore: 'E',
        updateAfter: 'C',
      },
    },
    {
      opt: {
        name: 'C',
        updateBefore: 'E',
        updateAfter: 'B',
      },
    },
    {
      opt: {
        name: 'B',
        updateBefore: 'C',
        updateAfter: 'A',
      },
    },
    {
      opt: {
        name: 'E',
        updateBefore: 'F',
        updateAfter: 'D',
      },
    },
    {
      opt: {
        name: 'A',
        updateBefore: 'B',
      },
    },
  ];
  const result = world.sortSystems(systems);
  console.log('result', result);
  expect(result).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
});
