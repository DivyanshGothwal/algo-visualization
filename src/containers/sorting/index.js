import React, { Component } from 'react';
import { Button, Slider, Row, Col, Select, Form, } from 'antd';


import { Application } from '../../configurations';
import { Generics } from '../../utils';
import { Towers } from '../../components'
import SortingStyles from './sorting.module.less';

let initialState = {
    array: Generics.generateRandomArray(Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE),
    comparedIndex: [],
    pivot: {
        element: undefined,
        index: undefined
    },
    bubbleSortInfo: {
        currentStartIndex: 0,
        nextStartIndex: 1
    },
    selectionSortInfo: {
        currentStartIndex: 0,
        nextStartIndex: 1,
        sortedIndexes: [],
        maxEleIndex: 0
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
            beforeStartIndex: undefined,
            startIndex: undefined,
            endIndex: undefined
        },
        isNewSortElement: true,
        recurringIndex: undefined,
    },
    sortedIndexes: [],
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
        if (value >= Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE && value <= Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE) {
            let array = [];
            for (let i = 0; i < value; i++) {
                array.push(Math.ceil(100 / ((Math.random() * value) + 1)) * 10);
            }
            this.setState({
                ...initialState,
                array: array,
                sortingSpeed: this.state.sortingSpeed
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

    selectionSort = () => {
        const { array, comparedIndex, selectionSortInfo, sortingSpeed, sortedIndexes } = this.state;
        const { currentStartIndex, nextStartIndex } = selectionSortInfo;
        let newArray = [...array];
        let n = array.length;
        let i = currentStartIndex;
        let j = comparedIndex[1] !== undefined ? comparedIndex[1] + 1 : nextStartIndex;
        if (currentStartIndex < n && nextStartIndex < n) {
            this.sleep(sortingSpeed).then(e => {
                let maxEle = selectionSortInfo.maxEleIndex;
                if (i < n && j < n) {
                    if (newArray[maxEle] < newArray[j]) {
                        maxEle = j;
                    }
                    this.setState({ comparedIndex: [i, j], selectionSortInfo: { ...selectionSortInfo, maxEleIndex: maxEle }, array: newArray });
                }
                else {
                    let temp = newArray[i];
                    newArray[i] = newArray[maxEle];
                    newArray[maxEle] = temp;
                    let newSortedIndexes = [...sortedIndexes, currentStartIndex];
                    this.setState({ array: newArray, comparedIndex: [], sortedIndexes: newSortedIndexes, selectionSortInfo: { ...selectionSortInfo, maxEleIndex: currentStartIndex + 1, currentStartIndex: currentStartIndex + 1, nextStartIndex: nextStartIndex + 1 } });
                }
            });
        }
        else {
            let newSortedIndexes = [...sortedIndexes, currentStartIndex];
            this.setState({ isDisabled: false, comparedIndex: [], sortedIndexes: newSortedIndexes, selectionSortInfo: { ...selectionSortInfo, maxEleIndex: 0, currentStartIndex: 0, nextStartIndex: 1 } });
        }
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
        this.sleep(sortingSpeed).then(e => {
            if (length === 0) {
                let stackObject = {
                    start: 0,
                    end: array.length - 1,
                    completedIndexes: []
                }
                newStack.push(stackObject);
                this.setState({
                    quickstartInfo: {
                        ...quickstartInfo,
                        sortingFrom: {
                            startIndex: stackObject.start,
                            endIndex: stackObject.end
                        },
                        stack: newStack
                    },
                    pivot: {
                        element: array[stackObject.end],
                        index: stackObject.end
                    }
                });
            }
            else {
                let newObj = newStack[length - 1]
                let topStackObj = { ...newObj };
                let startIndex = undefined;
                let endIndex = undefined;
                let recurrIndex = null;
                if (topStackObj.start >= topStackObj.end) {
                    if (length - 2 >= 0) {
                        let informNextObj = newStack[length - 2];
                        informNextObj.completedIndexes = [...informNextObj.completedIndexes, topStackObj.start];
                    }
                    newStack.pop();
                }

                else if (!topStackObj.completedIndexes.includes(topStackObj.start)) {
                    if (quickstartInfo.recurringIndex - 1 >= topStackObj.start) {
                        startIndex = topStackObj.start;
                        endIndex = quickstartInfo.recurringIndex - 1;
                        topStackObj.end = quickstartInfo.recurringIndex - 1;

                        topStackObj.completedIndexes = [];
                        newStack.push(topStackObj);
                    }
                    else if (length - 1 >= 0) {
                        let informNextObj = newStack[length - 1];
                        informNextObj.completedIndexes = [...informNextObj.completedIndexes, topStackObj.start];
                    }
                }
                else if (!topStackObj.completedIndexes.includes(topStackObj.end)) {
                    if (quickstartInfo.recurringIndex + 1 <= topStackObj.end) {
                        endIndex = topStackObj.end;
                        startIndex = quickstartInfo.recurringIndex + 1;
                        topStackObj.start = quickstartInfo.recurringIndex + 1;
                        topStackObj.completedIndexes = [];
                        newStack.push(topStackObj);
                    }
                    else if (length - 1 >= 0) {
                        let informNextObj = newStack[length - 1];
                        informNextObj.completedIndexes = [...informNextObj.completedIndexes, topStackObj.end];
                    }
                }
                else if (topStackObj.completedIndexes.includes(topStackObj.start) && topStackObj.completedIndexes.includes(topStackObj.end)) {
                    if (length - 2 >= 0) {
                        let informNextObj = newStack[length - 2];
                        if (informNextObj.completedIndexes.length === 0) {
                            informNextObj.completedIndexes = [...informNextObj.completedIndexes, topStackObj.start];
                        }
                        else if (informNextObj.completedIndexes.length === 1) {
                            informNextObj.completedIndexes = [...informNextObj.completedIndexes, topStackObj.end];
                        }
                    }
                    recurrIndex = topStackObj.end + 1;

                    newStack.pop();
                    if (newStack.length === 0) {
                        this.setState({
                            ...initialState,
                            array: array,
                            isDisabled: false
                        })
                        return;
                    }
                }
                this.setState({
                    quickstartInfo: {
                        ...quickstartInfo,
                        isNewSortElement: true,
                        recurringIndex: recurrIndex ? recurrIndex : quickstartInfo.recurringIndex,
                        sortingFrom: {
                            startIndex: startIndex,
                            endIndex: endIndex
                        },
                        stack: newStack
                    },
                    pivot: {
                        element: array[endIndex],
                        index: endIndex
                    }
                });
            }
        })
    }
    quickSortEle = (startIndex, endIndex) => {
        const { array, quickstartInfo, sortingSpeed, pivot } = this.state;
        let newArray = [...array];
        let start = startIndex;
        let beforeStart = startIndex;
        let end = null;
        if (quickstartInfo.isNewSortElement) {
            end = endIndex - 1;
            beforeStart = startIndex - 1;
        }
        else {
            end = endIndex;
            beforeStart = quickstartInfo.sortingFrom.beforeStart;
        }
        this.sleep(sortingSpeed).then(e => {
            if (start <= end) {
                let ele = pivot.element;
                if (ele) {
                    let initialBeforeStart = beforeStart;
                    let initialStart = start;
                    if (newArray[start] >= ele) {
                        beforeStart++;
                        let temp = newArray[start];
                        newArray[start] = newArray[beforeStart];
                        newArray[beforeStart] = temp;
                    }
                    start++;
                    this.setState({
                        array: newArray,
                        comparedIndex: [initialStart, initialBeforeStart],
                        quickstartInfo: {
                            ...quickstartInfo,
                            isNewSortElement: false,
                            sortingFrom: {
                                beforeStart: beforeStart,
                                startIndex: start,
                                endIndex: end
                            },
                        }
                    });
                }
            }
            else {

                if (start <= pivot.index) {
                    beforeStart++;
                    let temp = newArray[pivot.index];
                    newArray[start] = newArray[beforeStart];
                    newArray[beforeStart] = temp;
                    this.setState({
                        array: newArray,
                        comparedIndex: [start, beforeStart],
                        quickstartInfo: {
                            ...quickstartInfo,
                            isNewSortElement: false,
                            recurringIndex: beforeStart,
                            sortingFrom: {
                                startIndex: undefined,
                                endIndex: undefined
                            }
                        }
                    })
                }
            }
        });
    }

    bubbleSort = () => {
        const { array, comparedIndex, bubbleSortInfo, sortingSpeed, sortedIndexes } = this.state;
        const { currentStartIndex, nextStartIndex } = bubbleSortInfo;
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
                    this.setState({ comparedIndex: [], sortedIndexes: newSortedIndexes, bubbleSortInfo: { ...bubbleSortInfo, currentStartIndex: currentStartIndex + 1, nextStartIndex: nextStartIndex + 1 } });
                }
            });
        }
        else {
            let newSortedIndexes = [...sortedIndexes, currentStartIndex];
            this.setState({ isDisabled: false, comparedIndex: [], sortedIndexes: newSortedIndexes, bubbleSortInfo: { ...bubbleSortInfo, currentStartIndex: 0, nextStartIndex: 1, sortedIndexes: newSortedIndexes, } });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { isDisabled } = this.state;
        if (isDisabled) {
            this.callAlgorithmMethod();
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const { array, isDisabled, comparedIndex, sortingSpeed, mergeSortInfo, quickstartInfo } = this.state;
    //     if (nextState.array.length !== array.length || nextState.isDisabled !== isDisabled || nextState.comparedIndex !== comparedIndex || nextState.sortingSpeed !== sortingSpeed || nextState.mergeSortInfo !== mergeSortInfo || nextState.quickstartInfo != quickstartInfo) {
    //         return true;
    //     }
    //     return false;
    // }//
    createColorInformation = () => {
        const { sortAlgorithmSelected } = this.state;
        let colorInformation = [];
        colorInformation.push(
            <Col xs={24} sm={12} lg={8} key={1}>
                <div className={[SortingStyles.red, SortingStyles.common].join(" ")}></div>
                <div className={SortingStyles.commonText}>ELements being compared</div>
            </Col>
        )
        switch (sortAlgorithmSelected) {
            case Application.ALGORITHMS.SORTING.TYPES.MERGE_SORT: {
                colorInformation.push(
                    <Col xs={24} sm={12} lg={8} key={2}>
                        {/* <div className={[SortingStyles.yellow, SortingStyles.common].join(" ")}></div> */}
                        <div className={SortingStyles.commonText}>Pivot is always middle element</div>
                    </Col>
                );
                break;
            }
            case Application.ALGORITHMS.SORTING.TYPES.QUICK_SORT: {
                colorInformation.push(
                    <Col xs={24} sm={12} lg={8} key={2}>
                        <div className={[SortingStyles.yellow, SortingStyles.common].join(" ")}></div>
                        <div className={SortingStyles.commonText}>Pivot</div>
                    </Col>
                );
                break;
            }
            case Application.ALGORITHMS.SORTING.TYPES.BUBBLE_SORT: {
                colorInformation.push(
                    <Col xs={24} sm={12} lg={8}>
                        <div className={[SortingStyles.green, SortingStyles.common].join(" ")}></div>
                        <div className={SortingStyles.commonText}>Sorted elements</div>
                    </Col>
                )
                break;
            }
            case Application.ALGORITHMS.SORTING.TYPES.SELECTION_SORT: {
                colorInformation.push(
                    <Col xs={24} sm={12} lg={8}>
                        <div className={[SortingStyles.green, SortingStyles.common].join(" ")}></div>
                        <div className={SortingStyles.commonText}>Sorted elements</div>
                    </Col>
                )
                break;
            }
            default:
                break;
        }
        return colorInformation;
    }
    render() {
        const { array, sortAlgorithmSelected, comparedIndex, isDisabled, sortingSpeed, pivot, sortedIndexes } = this.state;
        let ColorInformation = this.createColorInformation();
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={24} sm={10} lg={6} className={SortingStyles.settings} >
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
                        <Col xs={24} sm={12} lg={8} className={SortingStyles.settings} >
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
                        <Col xs={24} sm={12} lg={8} className={SortingStyles.settings} >
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
                <Row>
                    {ColorInformation}
                </Row>
                <div style={{ height: "100%", width: "100%", padding: "10px" }}>
                    <Towers array={array} comparedIndex={comparedIndex} pivot={pivot.index} sortedIndexes={sortedIndexes} />
                </div>
            </React.Fragment>)
    }
}

export default Sorting;