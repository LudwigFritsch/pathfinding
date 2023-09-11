export function recursiveDivision(grid) {
  const openSet = getGrid(grid);
  let nodesToAnimate = [];
  let fityFity = Math.random();
  let rowCol;
  fityFity > 0.5 ? (rowCol = "row") : (rowCol = "col");
  console.log(rowCol);
  if (rowCol === "row") {
    let row = Math.floor(Math.random() * (grid.length - 0)) + 0;
    for (let i = 0; i < grid[row].length; i++) {
      nodesToAnimate.push(grid[row][i]);
    }
    return nodesToAnimate;
  }

  return nodesToAnimate;
}

export function getGrid(grid) {
  let nodes = [];
  for (let i = 0; i < grid.length - 1; i++) {
    for (let j = 0; j < grid[i].length - 1; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}
