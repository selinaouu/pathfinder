export function astar(grid, startNode, finishNode){
    const visitedNodesInOrder=[];
    startNode.distance=0;
    const univisitedNodes=getAllNodes(grid);
    while(univisitedNodes.length){
        sortNodesByDistance(univisitedNodes);
        const closestNode = univisitedNodes.shift();
        if(!closestNode.isWall){
            if(closestNode.distance===Infinity) return visitedNodesInOrder;
            closestNode.isVisited=true;
            visitedNodesInOrder.push(closestNode);
            if(closestNode===finishNode) return visitedNodesInOrder;
            updateUnvisitedNeighbours(closestNode,grid);
        }
    }
}
function updateUnvisitedNeighbours(node,grid){
    const unvisitedNeighbours=getUnvisitedNeighbours(node,grid);
    for(const neighbour of unvisitedNeighbours){
        neighbour.distance=node.distance+1+neighbour.distanceToFinishNode;
        neighbour.previousNode=node;
    }
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
function sortNodesByDistance(univisitedNodes){
    univisitedNodes.sort((nodeA,nodeB)=> nodeA.distance-nodeB.distance);
}
function getUnvisitedNeighbours(node,grid){
    const neighbours=[];
    const {col,row} =node;
    if(row>0) neighbours.push(grid[row-1][col]);
    if(col>0) neighbours.push(grid[row][col-1]);
    if(row<grid.length-1)neighbours.push(grid[row+1][col]);
    if(col<grid[0].length-1) neighbours.push(grid[row][col+1]);
    return neighbours.filter(neighbour=>!neighbour.isVisited);

}