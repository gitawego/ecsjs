import { expect, test } from 'vitest';
import { GraphData, tsort } from '../src/lib/tsort';

test('dfs top sort: order', () => {
  const graph: GraphData = [
    ['C', 'D'],
    ['D', 'E'],
    ['B', 'C'],
    ['A', 'B'],
  ];
  const result = tsort(graph);
  expect(result).toEqual(['A', 'B', 'C', 'D', 'E']);
});

test('dfs top sort: a closed chain is found', () => {
  const graph: GraphData = [
    ['C', 'D'],
    ['D', 'E'],
    ['B', 'C'],
    ['A', 'B'],
    ['E', 'A'],
  ];
  try {
    const result = tsort(graph);
  } catch (err) {
    expect(err.message.includes('closed chain')).toBe(true);
  }
});
