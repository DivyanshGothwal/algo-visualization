import React, { PureComponent } from 'react';
import { Icon } from 'antd';

import { Generics } from '../../utils';
import GridStyles from './grids.module.less';
import { Application } from '../../configurations';
import { CommonStyles } from '../../style'

class Grids extends PureComponent {
    state = {
        prevDragOverIndex: {
            i: undefined,
            j: undefined
        }
    }
    onDragStartDestination = (e) => {
        e.dataTransfer.setData("destination", true);
    }
    onDragStartSource = (e) => {
        e.dataTransfer.setData("source", true);
    }
    onClickSquareHandler = (i, j, e) => {
        const { notifyParentForSourceChange, notifyParentForDestinationChange, graph, notifyParentForGraphChange } = this.props;
        const { prevDragOverIndex } = this.state;
        let isDestination = e && e.dataTransfer && e.dataTransfer.types[0] === "destination";
        let isSource = e && e.dataTransfer && e.dataTransfer.types[0] === "source";
        let newGraph = [];
        e && e.stopPropagation();
        e && e.preventDefault();
        if (i !== prevDragOverIndex.i || j !== prevDragOverIndex.j) {
            for (let k = 0; k < graph.length; k++) {
                let newInnerGraph = [...graph[k]];
                newGraph.push(newInnerGraph);
            }
            if (newGraph[i][j] === 1) {
                newGraph[i][j] = 0;
            }
            else if (!isSource && !isDestination && newGraph[i][j] === 0) {
                newGraph[i][j] = 1;
            }

            if (isSource) {
                notifyParentForSourceChange(i, j, newGraph);
            }
            else if (isDestination) {
                notifyParentForDestinationChange(i, j, newGraph);
            }
            else {
                notifyParentForGraphChange(newGraph)
            }
            this.setState({ prevDragOverIndex: { i: i, j: j } });
        }

    }
    onDragStart = (e) => {
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        img.style.opacity = 0;
        e.dataTransfer.setDragImage(img, window.outerWidth, window.outerHeight);
    }
    render() {
        const { graph, sourceNode, destinationNode } = this.props;
        let style = {};
        let array = [];
        let key = 0;

        for (let i = 0; i < graph.length; i++) {
            style = {};
            for (let j = 0; j < graph[i].length; j++) {
                let isSourceNode = i === sourceNode.i && j === sourceNode.j;
                let isDestinationNode = i === destinationNode.i && j === destinationNode.j;
                if (i === graph.length - 1 && j === graph[i].length - 1) {
                    style = {
                        border: borderStyle
                    }
                }
                else if (i === graph.length - 1) {
                    style = {
                        borderBottom: borderStyle,
                    }
                }
                else if (j === graph[i].length - 1) {
                    style = {
                        borderRight: borderStyle
                    }
                }
                style = {
                    ...gridStyles,
                    ...style,
                }
                let squareClass = "";
                if (graph && graph[i][j] === 1) {
                    squareClass = [GridStyles.filledSquare, CommonStyles.animateFast].join(' ');
                }
                array.push(<div
                    key={key}
                    style={style}
                    className={squareClass}
                    draggable={isSourceNode || isDestinationNode ? false : true}
                    {...(!isSourceNode && !isDestinationNode) && { onClick: () => this.onClickSquareHandler(i, j) }}
                    {...(!isSourceNode && !isDestinationNode) && { onDragEnter: (e) => { this.onClickSquareHandler(i, j, e) } }}
                    onDragStart={this.onDragStart}
                >
                    {
                        i === sourceNode.i && j === sourceNode.j && <Icon draggable className={[GridStyles.icons, CommonStyles.animateSlow].join(' ')} onDragStart={this.onDragStartSource} title="Source" type="user" />
                    }
                    {
                        i === destinationNode.i && j === destinationNode.j && <Icon draggable className={[GridStyles.icons, CommonStyles.animateSlow].join(' ')} onDragStart={this.onDragStartDestination} title="Destination" type="environment" />
                    }
                </div >);
                key++;
            }
            array.push(<br key={key++} />)
        }
        return (
            <React.Fragment>{array} </React.Fragment>
        )
    }
}

export default Grids;
let borderStyle = "1px solid #32B3BA"
let gridStyles = {
    width: Generics.getWidth() + "%",
    height: Application.ALGORITHMS.GRAPH.SIZE_OF_GRID_SQUARES,
    display: "inline-block",
    verticalAlign: "top",
    borderTop: borderStyle,
    borderLeft: borderStyle,
    outline: "none"
}