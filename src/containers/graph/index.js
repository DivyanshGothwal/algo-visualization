import React, { PureComponent } from 'react';

import { Grids } from '../../components';
// import { Application } from '../../configurations';
import { Generics } from '../../utils';

class Graph extends PureComponent {
    state = {
        graph: Generics.generate2DArray(),
        prevGraph: Generics.generate2DArray(),
        sourceNode: {
            i: 0,
            j: 0
        },
        destinationNode: {
            i: 5,
            j: 5
        }
    }
    notifyParentForSourceChange = (i, j) => {
        this.setState({ sourceNode: { i: i, j: j } });
    }
    notifyParentForDestinationChange = (i, j) => {
        this.setState({ destinationNode: { i: i, j: j } });
    }
    notifyParentForGraphChange = (graph) => {
        this.setState({ graph: graph });
    }
    render() {
        const { graph, sourceNode, prevGraph, destinationNode } = this.state;
        return (
            <Grids
                graph={graph}
                sourceNode={sourceNode}
                destinationNode={destinationNode}
                notifyParentForSourceChange={this.notifyParentForSourceChange}
                notifyParentForDestinationChange={this.notifyParentForDestinationChange}
                notifyParentForGraphChange={this.notifyParentForGraphChange}
                prevGraph={prevGraph}
            />
        )
    }
}

export default Graph;
