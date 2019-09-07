import React, { Component } from 'react';
import { Button, Slider, Row, Col, Select, Form, } from 'antd';
import { Application } from '../../configurations';


let initialState = {
    array: [],
    comparedIndex: [],
    bubbleSortInfo: {
        currentStartIndex: 0,
        nextStartIndex: 1,
        sortedIndexes: []
    },
    sortingSpeed: Application.ALGORITHMS.SORTING.DEFAULT_SORTING_SPEED,
    arraySizeToShow: Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE,
    sortAlgorithmSelected: Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_TYPE,
    isDisabled: false
}
class Sorting extends Component {
    state = {
        ...initialState
    }
    componentWillMount() {
        let maxArraySize = Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE;
        let newArray = [];
        for (let i = 0; i < maxArraySize; i++) {
            newArray.push(Math.ceil(100 / ((Math.random() * maxArraySize) + 1)) * 10);
        }
        this.setState({ array: newArray });
    }
    onArraySizeChange = (value) => {
        if (value >= Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE && value <= Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE) {
            let array = [];
            for (let i = 0; i < value; i++) {
                array.push(Math.ceil(100 / ((Math.random() * value) + 1)) * 10);
            }
            this.setState({ ...initialState, array: array });
        }
    }
    onSpeedChange = (value) => {
        console.log(value);
        this.setState({ sortingSpeed: value });
    }
    onSortAlgorithmSelect = (value) => {
        this.setState({ sortAlgorithmSelected: value })
    }

    handleSubmit = () => {
        this.setState({ isDisabled: true, bubbleSortInfo: initialState.bubbleSortInfo, comparedIndex: [] });
        this.callAlgorithmMethod();
    }
    callAlgorithmMethod = () => {
        const { sortAlgorithmSelected } = this.state;
        switch (sortAlgorithmSelected) {
            case Application.ALGORITHMS.SORTING.TYPES.MERGE_SORT: {
                this.mergeSort();
                break;
            }
            case Application.ALGORITHMS.SORTING.TYPES.SELECTION_SORT: {
                this.selectionSort();
                break;
            }
            case Application.ALGORITHMS.SORTING.TYPES.BUBBLE_SORT: {
                this.bubbleSort();
                break;
            }
            case Application.ALGORITHMS.SORTING.TYPES.QUICK_SORT: {
                this.quickSort();
                break;
            }
            default:
                this.mergeSort();
        }
    }
    sleep = async (msec) => {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

    mergeSort = () => {

    }


    bubbleSort = () => {
        const { array, comparedIndex, bubbleSortInfo, sortingSpeed } = this.state;
        const { currentStartIndex, nextStartIndex, sortedIndexes } = bubbleSortInfo;
        let newArray = [...array];
        let n = array.length;
        let i = currentStartIndex;
        if (currentStartIndex % 2 !== 0) {
            console.log("Test");
        }
        let j = comparedIndex[1] !== undefined ? comparedIndex[1] + 1 : nextStartIndex;
        if (currentStartIndex < n && nextStartIndex < n) {
            this.sleep(sortingSpeed / 1000000).then(e => {
                if (i < n && j < n) {
                    if (newArray[i] < newArray[j]) {
                        let temp = newArray[i];
                        newArray[i] = newArray[j];
                        newArray[j] = temp;
                    }
                    this.setState({ comparedIndex: [i, j], array: newArray });
                }
                else {
                    let newSortedIndexes = [...sortedIndexes, currentStartIndex];
                    this.setState({ comparedIndex: [], bubbleSortInfo: { ...bubbleSortInfo, currentStartIndex: currentStartIndex + 1, nextStartIndex: nextStartIndex + 1, sortedIndexes: newSortedIndexes } });
                }
            });
        }
        else {
            let newSortedIndexes = [...sortedIndexes, currentStartIndex];
            this.setState({ isDisabled: false, comparedIndex: [], bubbleSortInfo: { ...bubbleSortInfo, currentStartIndex: 0, nextStartIndex: 1, sortedIndexes: newSortedIndexes, } });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { isDisabled } = this.state;
        if (isDisabled) {
            this.callAlgorithmMethod();
        }
    }
 
    shouldComponentUpdate(nextProps, nextState) {
        const { array, isDisabled, comparedIndex, sortingSpeed } = this.state;
        if (nextState.array.length !== array.length || nextState.isDisabled !== isDisabled || nextState.comparedIndex !== comparedIndex || nextState.sortingSpeed !== sortingSpeed) {
            return true;
        }
        return false;
    }

    render() {
        const { array, sortAlgorithmSelected, comparedIndex, isDisabled, bubbleSortInfo, sortingSpeed } = this.state;
        const { sortedIndexes } = bubbleSortInfo;
        let arrayView = [];
        // console.log(sortedIndexes);
        let eachEleWidth = (100 / array.length) - 0.2;
        for (let i = 0; i < array.length; i++) {
            arrayView.push(<div
                key={i}
                style={{
                    width: eachEleWidth + "%",
                    height: array[i],
                    backgroundColor: sortedIndexes.includes(i) ? "green" : comparedIndex.includes(i) ? "red" : "blue",
                    display: "inline-block",
                    verticalAlign: "top",
                    // borderRadius: "0px 0px 10px 10px",
                    marginRight: "0.2%"
                }}
            ></div>);
        }
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={6}>
                            <Form.Item label="Select size of array">
                                <Slider
                                    min={Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE}
                                    max={Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE}
                                    tooltipVisible={false}
                                    onChange={this.onArraySizeChange}
                                    disabled={isDisabled}
                                    value={array.length}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Select speed(in ms) higher is slower">
                                <Slider
                                    min={Application.ALGORITHMS.SORTING.MIN_SORTING_SPEED}
                                    max={Application.ALGORITHMS.SORTING.MAX_SORTING_SPEED}
                                    // tooltipVisible={false}
                                    onChange={this.onSpeedChange}
                                    disabled={isDisabled}
                                    value={sortingSpeed}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={1} span={5}>
                            <Form.Item label="Select Algorithm type">
                                <Select defaultValue={sortAlgorithmSelected} disabled={isDisabled} onChange={this.onSortAlgorithmSelect}>
                                    {
                                        Object.entries(Application.ALGORITHMS.SORTING.TYPES).map(([key, value]) => {
                                            return <Select.Option key={key} value={value}>{value}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit} disabled={isDisabled}>Start visualization</Button>
                    </Form.Item>
                </Form>
                <div style={{ height: "100%", width: "100%", padding: "10px" }}>
                    {arrayView}
                </div>
            </React.Fragment>)
    }
}

export default Sorting;