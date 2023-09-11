export function aStarSearch(grid, startNode, endNode) {
  const closedSet = [];
  const openSet = getGrid(grid);
  startNode.gCost = 0;
  startNode.hCost = hCost(startNode, endNode);
  startNode.fCost = fCost(startNode);

  while (openSet.length > 0) {
    sortNodesByDistance(openSet);
    const curNode = openSet.shift();
    closedSet.push(curNode);
    curNode.isVisited = true;
    if (curNode === endNode) {
      return closedSet;
    }
    const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);

    if (curNode.gCost === 1000) {
      return closedSet;
    }
    updateNeighbors(curNode, unvisitedNeighbors, endNode, startNode);
  }
}

export function sortNodesByHCost(openSet) {
  openSet.sort((a, b) => a.hCost - b.hCost);
}

export function updateNeighbors(node, unvisitedNeighbors, endNode, startNode) {
  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    const neighbor = unvisitedNeighbors[i];
    if (neighbor.isWall && neighbor !== startNode && neighbor !== endNode)
      continue;
    const newMovementCost = node.gCost + 1;
    if (newMovementCost < neighbor.gCost) {
      neighbor.gCost = newMovementCost;
      neighbor.prevNode = node;
    }
    neighbor.hCost = hCost(neighbor, endNode);
    neighbor.fCost = fCost(neighbor);
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

export function getDistance(nodeA, nodeB) {
  const distaceX = Math.abs(nodeA.col - nodeB.col);
  const distanceY = Math.abs(nodeA.row - nodeB.row);
  const distaceTotal = distaceX + distanceY;
  return distaceTotal;
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

export function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort(function (nodeA, nodeB) {
    if (nodeA.fCost < nodeB.fCost) return -1;
    if (nodeA.fCost > nodeB.fCost) return 1;
    if (nodeA.hCost < nodeB.hCost) return -1;
    if (nodeA.hCost > nodeB.hCost) return 1;
  });
}

export function fCost(node) {
  const fCost = node.gCost + node.hCost;
  return fCost;
}

export function hCost(curNode, endNode) {
  const distanceX = Math.abs(curNode.col - endNode.col);
  const distanceY = Math.abs(curNode.row - endNode.row);
  return distanceX + distanceY;
}
