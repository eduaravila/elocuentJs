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
  memo?: Map<string, object>
) => {
  memo = memo || new Map();
  nodes.map((val) => {
    memo.set(
      val,
      connections
        .filter(([key, direction], connectionInx) => key == val && direction)
        .map(([_, b]) => b)
    );
  });

  return memo;
};

let graph = adjacencylistRepresentation(airports, routes);
