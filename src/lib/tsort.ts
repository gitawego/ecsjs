export type GraphData<A extends string = any, B extends string = any> = [
  A,
  B
][];

/**
 * general topological sort
 * @author SHIN Suzuki (shinout310@gmail.com)
 * @param Array<Array> edges : list of edges. each edge forms Array<ID,ID> e.g. [12 , 3]
 *
 * @returns Array : topological sorted list of IDs
 **/
class Node {
  afters: string[] = [];

  constructor(readonly id: string) {}
}
export function tsort(edges: GraphData) {
  const nodes: Record<string, Node> = {}; // hash: stringified id of the node => { id: id, afters: lisf of ids }
  const sorted: string[] = []; // sorted list of IDs ( returned value )
  const visited: Record<string, boolean> = {}; // hash: id of already visited node => true

  // 1. build data structures
  edges.forEach(v => {
    const from = v[0];
    const to = v[1];
    if (!nodes[from]) {
      nodes[from] = new Node(from);
    }
    if (!nodes[to]) {
      nodes[to] = new Node(to);
    }
    nodes[from].afters.push(to);
  });

  const visitFnc = (idstr: string, ancestors: string[] = []) => {
    const node = nodes[idstr];
    const id = node.id;
    // if already exists, do nothing
    if (visited[idstr]) {
      return;
    }

    if (!Array.isArray(ancestors)) {
      ancestors = [];
    }

    ancestors.push(id);
    visited[idstr] = true;

    node.afters.forEach(afterID => {
      if (ancestors.indexOf(afterID) >= 0) {
        // if already in ancestors, a closed chain exists.
        throw new Error(`closed chain : ${afterID} is in ${id}`);
      }
      visitFnc(afterID.toString(), ancestors.slice(0)); // recursive call
    });

    sorted.unshift(id);
  };

  // 2. topological sort
  Object.keys(nodes).forEach(idstr => {
    visitFnc(idstr);
  });

  return sorted;
}
