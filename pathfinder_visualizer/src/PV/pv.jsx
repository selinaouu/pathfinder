import React, {Component} from 'react';
import Node from './Node/Node';
import './pv.css';
import {dijkstra} from '../algorithms/dijkstras';

const START_NODE_ROW=10;
const START_NODE_COL=15;
const FINISH_NODE_ROW=10;
const FINISH_ROW_COL=35;


export default class PV extends Component{
    constructor(props){
        super(props);
        this.state={
            grid:[]
        };
    }
    
    componentDidMount(){
        const grid=getInitialGrid();
        this.setState({grid});
    }

    visualizeDijkstra(){
        const{grid}=this.state;
        const startNode=grid[START_NODE_COL][START_NODE_ROW];
        const finishNode=grid[FINISH_ROW_COL][FINISH_NODE_ROW];
        const visitedNodesInOrder=dijkstra(grid,startNode,finishNode);
        this.animateDijkstra(visitedNodesInOrder)

    }
    render(){
        const {grid}=this.state;        
        return(
            <>
            <button onClick={()=> this.visualizeDijkstra()}> Visualize Dijkstra's Algo</button>
            <div className='grid'>
                {grid.map((row,rowIdx)=>{
                    return(
                        <div key={rowIdx}>
                            {row.map((node,nodeIdx)=> {
                            const{row,col,isStart,isFinish}=node;
                            return(
                                <Node 
                                key={nodeIdx}
                                isStart={isStart}
                                isFinish={isFinish}
                                test={'foo'}
                                col={col}
                                row={row}>
                                </Node>);
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
        for(let row=0;row<20;row++){
            const currentRow=[];
            for(let col=0;col<50;col++){
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

    };
};
