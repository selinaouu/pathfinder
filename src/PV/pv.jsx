import React, {Component} from 'react';
import Node from './Node/Node';
import './pv.css';
import {dijkstra,getNodesInShortestPathOrder} from '../algorithms/dijkstras';
import {bfs} from '../algorithms/bfs';
import {dfs} from '../algorithms/dfs';
import { astar } from '../algorithms/astar';

const START_NODE_ROW=13;
const START_NODE_COL=7;
const FINISH_NODE_ROW=13;
const FINISH_ROW_COL=50;


export default class PV extends Component{
    constructor(){
        super();
        this.state={
            grid:[],
            mouseIsPressed:false,
        };
    }
    
    handleMouseDown(row,col){
        const newGrid=getNewGridWIthWallToggled(this.state.grid,row,col);
        this.setState({grid:newGrid,mouseIsPressed:true});
    }

    handleMouseEnter(row,col){
        if(!this.state.mouseIsPressed) return;
        const newGrid=getNewGridWIthWallToggled(this.state.grid,row,col);
        this.setState({grid:newGrid});
    }

    handleMouseUp(){
        this.setState({mouseIsPressed:false});
    }
    
    componentDidMount(){
        const grid=getInitialGrid();
        this.setState({grid});
    }

    animateShortestPath(nodesInShortestPathOrder){
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
              const node = nodesInShortestPathOrder[i];
              document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 50 * i);
          }
    }


    animate(visitedNodesInOrder, nodesInShortestPathOrder){
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
              setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
              }, 10 * i);
              return;
            }
            setTimeout(() => {
              const node = visitedNodesInOrder[i];
              document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            }, 10 * i);
          }
    }

    visualizeDijkstra(){
        const{grid}=this.state;
        const startNode=grid[START_NODE_ROW][START_NODE_COL];
        const finishNode=grid[FINISH_NODE_ROW][FINISH_ROW_COL];
        const visitedNodesInOrder=dijkstra(grid,startNode,finishNode);
        const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode);
        this.animate(visitedNodesInOrder,nodesInShortestPathOrder);
    }

    visualizeBFS(){
        const{grid}=this.state;
        const startNode=grid[START_NODE_ROW][START_NODE_COL];
        const finishNode=grid[FINISH_NODE_ROW][FINISH_ROW_COL];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode);
        this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDFS(){
        const{grid}=this.state;
        const startNode=grid[START_NODE_ROW][START_NODE_COL];
        const finishNode=grid[FINISH_NODE_ROW][FINISH_ROW_COL];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode);
        this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    
    visualizeAStar(){
        const{grid}=this.state;
        const startNode=grid[START_NODE_ROW][START_NODE_COL];
        const finishNode=grid[FINISH_NODE_ROW][FINISH_ROW_COL];
        const visitedNodesInOrder = astar(grid, startNode, finishNode);
        const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode);
        this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    reset(){//resetting the walls
        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                if ((document.getElementById(`node-${row}-${col}`).className === "node node-shortest-path") || document.getElementById(`node-${row}-${col}`).className === "node node-visited") {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }
            }
        }
        const newGrid = getInitialGrid();
        this.setState({ grid: newGrid});
    }

    render(){
        const {grid,mouseIsPressed}=this.state;     

        return(
            <>
            <div class='topNav'></div>
            <div class="border"></div>
            <button className='dijkstraButton' onClick={()=> this.visualizeDijkstra()}> Visualize Dijkstra's Algo</button>
            <button className='astarButton' onClick={()=> this.visualizeAStar()}> Visualize AStar Algo</button>
            <button className='dfsButton' onClick={()=> this.visualizeDFS()}> Depth-first Search</button>
            <button className='bfsButton' onClick={()=> this.visualizeBFS()}> Breadth-first Search</button>
            <button className='resetButton' onClick={()=> this.reset()}> Reset Grid/Walls</button>
            
            <div className='grid'>
                {grid.map((row,rowIdx)=>{
                    return(
                        <div key={rowIdx}>
                            {row.map((node,nodeIdx)=> {
                                const {row,col,isFinish,isStart,isVisited,isWall}=node;
                                return(
                                    <Node 
                                        key={nodeIdx}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                                        onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
                                        onMouseUp={()=>this.handleMouseUp()}
                                        row={row}
                                        >
                                    </Node>
                                );
                        })}
                    </div>
                    );
                })}
            </div>
            </>
        );
    }
}
const getInitialGrid=()=>{
        const grid=[];
        for(let row=0;row<28;row++){
            const currentRow=[];
            for(let col=0;col<58;col++){
                currentRow.push(createNode(col,row));
            }
            grid.push(currentRow);
        }
        return grid;
};
const createNode=(col,row)=>{
    return{
        col,
        row,
        isStart:row===START_NODE_ROW && col===START_NODE_COL,
        isFinish:row===FINISH_NODE_ROW && col===FINISH_ROW_COL,
        distance:Infinity,
        isVisited:false,
        isWall:false,
        previousNode:null,
        distanceToFinishNode: Math.abs(FINISH_NODE_ROW - row) + Math.abs(FINISH_ROW_COL - col),
    };
};
const getNewGridWIthWallToggled=(grid,row,col)=>{
    const newGrid=grid.slice();
    const node=newGrid[row][col];
    const newNode={
        ...node,
        isWall:!node.isWall,
    };
    newGrid[row][col]=newNode;
    return newGrid;
};


