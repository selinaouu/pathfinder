export function dijkstra(grid, startNode, finishNode){
    const visitedNodesInOrder=[];
    if(!startNode||!finishNode||startNode===finishNode){
        return false;
    }
    startNode.distance=0;
    const univisitedNodes=getAllNodes(grid);
    while(!!univisitedNodes.length){
        sortNodesByDistance(univisitedNodes);
        const closestNode = univisitedNodes.shift();
        if(closestNode.isWall) continue;

        if(closestNode.distance===Infinity) return visitedNodesInOrder;

        visitedNodesInOrder.push(closestNode);
        if(closestNode===finishNode) return visitedNodesInOrder;
        updateNeighbours(closestNode,grid);
    }

}
function sortNodesByDistance(univisitedNodes){
    univisitedNodes.sort((nodeA,nodeB)=> nodeA.distance-nodeB.distance);
}
function updateNeighbours(node,grid){
    const neighbours=getNeighbours(node,grid);
    for(const neighbour of neighbours){
        neighbour.distance=node.distance+1;
    }
}
function getNeighbours(node,grid){
    const neighbours=[];
    const {col,row} =node;
    if(row>0) neighbours.push(grid[row-1][col]);
    if(col>0) neighbours.push(grid[row][col-1]);
    if(row<grid.length-1)neighbours.push(grid[row+1][col]);
    if(col<grid[0].length-1) neighbours.push(grid[row][col+1]);
    return neighbours;

}
function getAllNodes(grid){
    const nodes=[];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }