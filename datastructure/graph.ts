const airports: string[] = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(
  " "
);

const routes = [
  ["PHX", "LAX"],
  ["PHX", "JFK"],
  ["JFK", "OKC"],
  ["JFK", "HEL"],
  ["MEX", "LAX"],
  ["MEX", "BKK"],
  ["MEX", "LIM"],
  ["MEX", "EZE"],
  ["LIM", "BKK"],
];
interface connection {
  [key: string]: string[];
}

const adjacencylistRepresentation = (
  nodes: string[],
  connections: Array<Array<string>>,
  memo?: Map<string, Array<string>>
) => {
  memo = memo || new Map();
  nodes.map((val: string) => {
    memo?.set(
      val,
      connections
        .filter(([key, direction], connectionInx) => key == val && direction)
        .map(([_, b]) => b)
    );
  });

  return memo;
};

const bfshashconnection = (
  list: Map<string, Array<string>>,
  start: string,
  target: string
) => {
  let queue: string[] = [start];
  let visited = new Set();

  while (queue.length > 0) {
    let node = queue.shift()!;
    let destinations = list.get(node)!;

    for (let destination of destinations) {
      if (destination == target) {
        console.log(destination, "connection");
      }

      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
      }
    }
  }
};

let graph = adjacencylistRepresentation(airports, routes);



bfshashconnection(graph, "MEX", "LIM");
