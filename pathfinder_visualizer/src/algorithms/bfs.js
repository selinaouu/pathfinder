export function bfs(grid, startNode, finishNode){
    const visitedNodesInOrder = [];
    if(!startNode||!finishNode||startNode===finishNode){
        return false;
    }
    let queue = [];
    queue.push(startNode);
    while(queue.length){
        const currNode = queue.shift();
        if (currNode === finishNode)
            return visitedNodesInOrder;

        if (!currNode.isWall && (currNode.isStart || !currNode.isVisited)) {
            currNode.isVisited = true;
            visitedNodesInOrder.push(currNode);
            const { row, col } = currNode;
            updateUnvisitedNeighbours(row, col, queue, grid,currNode);
    }
  }
    
}

function  updateUnvisitedNeighbours(row, col, stack, grid,currNode) {
    let next;
    if (row > 0) {
      next = grid[row - 1][col];
      if (!next.isVisited) {
        next.previousNode = currNode;
        stack.push(next);
      }
    }
    if (row < grid.length - 1) {
      next = grid[row + 1][col];
      if (!next.isVisited) {
        next.previousNode = currNode;
        stack.push(next);
      }
    }
    if (col < grid[0].length - 1) {
      next = grid[row][col + 1];
      if (!next.isVisited) {
        next.previousNode = currNode;
        stack.push(next);
      }
    }
    if (col > 0) {
      next = grid[row][col - 1];
      if (!next.isVisited) {
        next.previousNode = currNode;
        stack.push(next);
      }
    }
}