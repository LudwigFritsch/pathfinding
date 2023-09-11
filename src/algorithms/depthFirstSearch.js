export function depthFirstSearch(grid, startNode, endNode) {
  const stack = [];
  const visitedNodesInOrder = [];
  visitedNodesInOrder.push(startNode);

  stack.push(startNode);
  while (stack.length > 0) {
    const curNode = stack[0];
    curNode.isVisited = true;
    if (curNode === endNode) {
      visitedNodesInOrder.push(curNode);
      return visitedNodesInOrder;
    }
    const neighbor = getUnvisitedNeighbor(curNode, grid, endNode);
    if (neighbor === 0) {
      stack.shift();
    } else {
      stack.unshift(neighbor);
      visitedNodesInOrder.push(neighbor);
      neighbor.prevNode = curNode;
    }
  }
  return visitedNodesInOrder;
}

export function getUnvisitedNeighbor(node, grid, endNode) {
  let neighbor = 0;
  const { col, row } = node;
  if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall) {
    neighbor = grid[row - 1][col];
  } else if (
    col < grid[0].length - 1 &&
    !grid[row][col + 1].isVisited &&
    !grid[row][col + 1].isWall
  ) {
    neighbor = grid[row][col + 1];
  } else if (
    row < grid.length - 1 &&
    !grid[row + 1][col].isVisited &&
    !grid[row + 1][col].isWall
  ) {
    neighbor = grid[row + 1][col];
  } else if (
    col > 0 &&
    !grid[row][col - 1].isVisited &&
    !grid[row][col - 1].isWall
  ) {
    neighbor = grid[row][col - 1];
  }
  return neighbor;
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
