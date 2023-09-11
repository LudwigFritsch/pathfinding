export function getNodesPathBomb(endNode, startNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== startNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.prevNode;
  }
  return nodesInShortestPathOrder;
}
