import React, { Component } from 'react';
import { Button, Slider, Row, Col, Select, Form, } from 'antd';
import { Application } from '../../configurations';
import { Generics } from '../../utils';
import { Towers } from '../../components'

let initialState = {
    array: Generics.generateRandomArray(Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE),
    comparedIndex: [],
    bubbleSortInfo: {
        currentStartIndex: 0,
        nextStartIndex: 1,
        sortedIndexes: []
    },
    mergeSortInfo: {
        stack: [],
        sortingFrom: {
            startIndex: undefined,
            endIndex: undefined
        },
        shortArray: []
    },
    quickstartInfo: {
        stack: [],
        sortingFrom: {
            startIndex: undefined,
            endIndex: undefined
        },
        isNewSortElement: true,
        recurringIndex: undefined,
        pivot: {
            element: undefined,
            index: undefined
        }
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

    onArraySizeChange = (value) => {
        const { quickstartInfo } = this.state;
        if (value >= Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE && value <= Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE) {
            let array = [];
            for (let i = 0; i < value; i++) {
                array.push(Math.ceil(100 / ((Math.random() * value) + 1)) * 10);
            }
            this.setState({
                ...initialState,
                array: array,
                sortingSpeed: this.state.sortingSpeed,
                quickstartInfo: {
                    ...quickstartInfo,
                    // sortingFrom: {
                    //     startIndex: 0,
                    //     endIndex: array.length - 1
                    // }
                }
            });
        }
    }
    onSpeedChange = (value) => {
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
        const { sortAlgorithmSelected, mergeSortInfo, quickstartInfo } = this.state;
        switch (sortAlgorithmSelected) {
            case Application.ALGORITHMS.SORTING.TYPES.MERGE_SORT: {
                if (mergeSortInfo.sortingFrom.startIndex !== undefined && mergeSortInfo.sortingFrom.endIndex !== undefined) {
                    this.mergeSortEle(mergeSortInfo.sortingFrom.startIndex, mergeSortInfo.sortingFrom.endIndex);
                }
                else {
                    this.mergeSort();
                }
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
                if (quickstartInfo.sortingFrom.startIndex !== undefined && quickstartInfo.sortingFrom.endIndex !== undefined) {
                    this.quickSortEle(quickstartInfo.sortingFrom.startIndex, quickstartInfo.sortingFrom.endIndex);
                }
                else {
                    this.quickSort();
                }
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
        const { mergeSortInfo, array, sortingSpeed } = this.state;
        let newStack = [...mergeSortInfo.stack];
        let length = newStack.length;
        let stackObject = {
            start: 0,
            mid: Math.floor((array.length - 1) / 2),
            end: array.length - 1,
            completedIndexes: []
        }
        let sortingFrom = {
            startIndex: undefined,
            endIndex: undefined
        }
        this.sleep(sortingSpeed).then(e => {
            if (length === 0) {
                newStack.push(stackObject)
            }
            else {
                let newObj = { ...newStack[length - 1] };
                if (newObj.start >= newObj.end) {
                    if (length - 2 >= 0) {
                        let informNextObj = newStack[length - 2];
                        informNextObj.completedIndexes = [...informNextObj.completedIndexes, newObj.start];
                    }
                    newStack.pop();
                }
                else {
                    let mid = newObj.start + Math.floor((newObj.end - newObj.start) / 2);
                    if (!newObj.completedIndexes.includes(newObj.start)) {
                        stackObject = { ...newObj, end: mid, completedIndexes: [] }
                        newStack.push(stackObject);
                    }
                    else if (!newObj.completedIndexes.includes(newObj.end)) {
                        stackObject = { ...newObj, start: mid + 1, completedIndexes: [] }
                        newStack.push(stackObject);
                    }
                    if (newObj.completedIndexes.includes(newObj.start) && newObj.completedIndexes.includes(newObj.end)) {
                        sortingFrom = {
                            startIndex: newObj.start,
                            endIndex: newObj.end
                        }
                        if (length - 2 >= 0) {
                            let informNextObj = newStack[length - 2];
                            if (informNextObj.completedIndexes.length === 0) {
                                informNextObj.completedIndexes = [...informNextObj.completedIndexes, newObj.start];
                            }
                            else if (informNextObj.completedIndexes.length === 1) {
                                informNextObj.completedIndexes = [...informNextObj.completedIndexes, newObj.end];
                            }
                        }

                        newStack.pop();
                    }
                }
            }
            this.setState({ mergeSortInfo: { ...mergeSortInfo, stack: newStack, sortingFrom: sortingFrom } });
        });
    }

    mergeSortEle = (start, end) => {
        const { array, mergeSortInfo, sortingSpeed } = this.state;
        let { sortingFrom, shortArray } = mergeSortInfo;
        let { currentStartIndex, currentEndIndex } = sortingFrom;
        let cStartIndex = currentStartIndex ? currentStartIndex : start;
        let mid = start + Math.floor((end - start) / 2);
        let cEndIndex = currentEndIndex ? currentEndIndex : mid + 1;
        let i = cStartIndex;
        let j = cEndIndex;
        let newShortArray = [...shortArray];
        this.sleep(sortingSpeed).then(e => {
            if (i <= mid && j <= end) {
                if (array[i] <= array[j]) {
                    newShortArray.push(array[j]);
                    j++;
                }
                else {
                    newShortArray.push(array[i]);
                    i++;
                }
            }
            else {
                let newArray = [...shortArray];
                let ar = [...array];
                for (let l = i; l <= mid; l++) {
                    newArray.push(ar[l]);
                }
                for (let k = j; k <= end; k++) {
                    newArray.push(ar[k]);
                }
                i = start;
                for (let l = 0; l < newArray.length; l++) {
                    ar[i] = newArray[l];
                    i++;
                }
                if (start === 0 && end === array.length - 1) {
                    this.setState({ isDisabled: false })
                }
                this.setState({
                    mergeSortInfo: {
                        ...mergeSortInfo,
                        sortingFrom: {
                            startIndex: undefined,
                            endIndex: undefined,
                            currentStartIndex: i,
                            currentEndIndex: j
                        },
                        shortArray: []
                    },
                    array: ar,
                    comparedIndex: []
                });
                return;
            }

            this.setState({

                mergeSortInfo: {
                    ...mergeSortInfo,
                    sortingFrom: {
                        startIndex: start,
                        endIndex: end,
                        currentStartIndex: i,
                        currentEndIndex: j
                    },
                    shortArray: newShortArray
                },
                comparedIndex: [--i, --j]
            });
        });
    }

    quickSort = () => {
        const { quickstartInfo, array, sortingSpeed } = this.state;
        let newStack = [...quickstartInfo.stack];
        let length = newStack.length;
        let stackObject = {
            start: 0,
            end: array.length - 1,
            completedIndexes: []
        }
        this.sleep(sortingSpeed).then(e => {
            if (length == 0) {

                newStack.push(stackObject);
                this.setState({
                    quickstartInfo: {
                        ...quickstartInfo,
                        sortingFrom: {
                            startIndex: stackObject.start,
                            endIndex: stackObject.end
                        }
                    },
                    stack: newStack
                });
            }
            else {
                let newObj = { ...newStack[length - 1] };
                if (newObj.start >= newObj.end) {
                    if (length - 2 >= 0) {
                        let informNextObj = newStack[length - 2];
                        informNextObj.completedIndexes = [...informNextObj.completedIndexes, newObj.start];
                    }
                    newStack.pop();
                }
                else {

                    if (!newObj.completedIndexes.includes(newObj.start)) {
                        stackObject = { ...newObj, end: quickstartInfo.recurringIndex - 1, completedIndexes: [] }
                        newStack.push(stackObject);
                        this.setState({
                            quickstartInfo: {
                                ...quickstartInfo,
                                sortingFrom: {
                                    startIndex: stackObject.start,
                                    endIndex: stackObject.end
                                }
                            }
                        });
                    }
                    else if (!newObj.completedIndexes.includes(newObj.end)) {
                        stackObject = { ...newObj, start: quickstartInfo.recurringIndex + 1, completedIndexes: [] }
                        newStack.push(stackObject);
                        this.setState({
                            quickstartInfo: {
                                ...quickstartInfo,
                                sortingFrom: {
                                    startIndex: stackObject.start,
                                    endIndex: stackObject.end
                                }
                            }
                        });
                    }
                    if (newObj.completedIndexes.includes(newObj.start) && newObj.completedIndexes.includes(newObj.end)) {
                        // sortingFrom = {
                        //     startIndex: newObj.start,
                        //     endIndex: newObj.end
                        // }
                        if (length - 2 >= 0) {
                            let informNextObj = newStack[length - 2];
                            if (informNextObj.completedIndexes.length === 0) {
                                informNextObj.completedIndexes = [...informNextObj.completedIndexes, newObj.start];
                            }
                            else if (informNextObj.completedIndexes.length === 1) {
                                informNextObj.completedIndexes = [...informNextObj.completedIndexes, newObj.end];
                            }
                        }
                        newStack.pop();
                    }
                }
            }
            this.setState({ quickstartInfo: { ...quickstartInfo, stack: newStack } });
        })
    }
    quickSortEle = (startIndex, endIndex) => {
        const { array, quickstartInfo, sortingSpeed } = this.state;
        let newArray = [...array];
        let start = startIndex;
        let end = null;
        let ele = null;
        if (quickstartInfo.isNewSortElement) {
            end = endIndex - 1;
            this.setState({
                quickstartInfo: {
                    ...quickstartInfo,
                    pivot: {
                        element: array[endIndex],
                        index: endIndex
                    }
                }
            });
        }
        else end = endIndex;
        this.sleep(sortingSpeed * 10).then(e => {
            if (start < end) {
                let ele = quickstartInfo.pivot.element;
                if (ele) {
                    this.setState({ comparedIndex: [start, end] });
                    if (newArray[start] >= ele && newArray[end] > ele) {
                        start++;
                    } else if (newArray[start] >= ele && newArray[end] < ele) {
                        start++;
                        end--;
                    } else if (newArray[start] <= ele && newArray[end] < ele) {
                        end--;
                    } else {
                        let temp = newArray[start];
                        newArray[start] = newArray[end];
                        newArray[end] = temp;
                        start++;
                        end--;
                    }
                    this.setState({
                        array: newArray,
                        quickstartInfo: {
                            ...quickstartInfo,
                            isNewSortElement: false,
                            sortingFrom: {
                                startIndex: start,
                                endIndex: end
                            },

                        }
                    });
                }
            }
            else {
                if (start < newArray.length) {
                    if (newArray[start] < ele) {
                        let temp = newArray[start];
                        newArray[start] = newArray[quickstartInfo.pivot.index];
                        newArray[quickstartInfo.pivot.index] = temp;
                        this.setState({
                            array: newArray,
                            comparedIndex: [start, quickstartInfo.pivot.index],
                            quickstartInfo: {
                                ...quickstartInfo,
                                isNewSortElement: false,
                                recurringIndex: start,
                                sortingFrom: {
                                    startIndex: undefined,
                                    endIndex: undefined
                                }
                            }
                        })
                    }
                    else if (newArray[start] > ele) {
                        let temp = newArray[start];
                        newArray[start] = newArray[quickstartInfo.pivot.index];
                        newArray[quickstartInfo.pivot.index] = temp;
                        this.setState({
                            array: newArray,
                            comparedIndex: [start, quickstartInfo.pivot.index],
                            quickstartInfo: {
                                ...quickstartInfo,
                                isNewSortElement: false,
                                recurringIndex: start + 1,
                                sortingFrom: {
                                    startIndex: undefined,
                                    endIndex: undefined
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    bubbleSort = () => {
        const { array, comparedIndex, bubbleSortInfo, sortingSpeed } = this.state;
        const { currentStartIndex, nextStartIndex, sortedIndexes } = bubbleSortInfo;
        let newArray = [...array];
        let n = array.length;
        let i = currentStartIndex;
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
        const { array, isDisabled, comparedIndex, sortingSpeed, mergeSortInfo, quickstartInfo } = this.state;
        if (nextState.array.length !== array.length || nextState.isDisabled !== isDisabled || nextState.comparedIndex !== comparedIndex || nextState.sortingSpeed !== sortingSpeed || nextState.mergeSortInfo !== mergeSortInfo || nextState.quickstartInfo != quickstartInfo) {
            return true;
        }
        return false;
    }

    render() {
        const { array, sortAlgorithmSelected, comparedIndex, isDisabled, bubbleSortInfo, sortingSpeed } = this.state;
        const { sortedIndexes } = bubbleSortInfo;
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
                    <Towers array={array} sortedIndexes={sortedIndexes} comparedIndex={comparedIndex} />
                </div>
            </React.Fragment>)
    }
}

export default Sorting;