import React, { PureComponent } from 'react';

import { Button } from 'antd';
import { Application } from '../../configurations';


class PathFinder extends PureComponent {
    onButtonClick = () => {
        this.props.history.push(Application.ALGORITHMS.SORTING.PATH);
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    We are currently working on this section, please visit after some time
                </div>
                <Button type="primary" onClick={this.onButtonClick}>
                    Back
                </Button>
            </React.Fragment>
        )
    }
}

export default PathFinder;