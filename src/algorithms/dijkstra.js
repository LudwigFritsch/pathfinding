export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  let unvisitedNodes = getGrid(grid);
  startNode.distance = 0;

  while (!!unvisitedNodes.length) {
    unvisitedNodes = sortNodesByDistance(unvisitedNodes);
    const curNode = unvisitedNodes.shift();
    if (curNode.isWall && curNode !== startNode && curNode !== endNode)
      continue;
    if (curNode.distance === "Infinity") return visitedNodesInOrder;
    curNode.isVisited = true;
    visitedNodesInOrder.push(curNode);
    if (curNode === endNode) {
      return visitedNodesInOrder;
    }
    updateNeighbors(curNode, grid);
  }
}

export function sortNodesByDistance(unvisitedNodes) {
  const toCompare = [];
  const notCompare = [];
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (unvisitedNodes[i].distance !== "Infinity") {
      toCompare.push(unvisitedNodes[i]);
    } else {
      notCompare.push(unvisitedNodes[i]);
    }
  }
  toCompare.sort((a, b) => a.distance - b.distance);
  const result = toCompare.concat(notCompare);
  return result;
}

export function updateNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    unvisitedNeighbors[i].distance = node.distance + 1;
    unvisitedNeighbors[i].prevNode = node;
  }
}

export function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getGrid(grid) {
  let nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}
