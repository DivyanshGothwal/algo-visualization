import React, { PureComponent } from 'react';
import { Button, Slider, Row, Col, Select, Form, } from 'antd';
import { Application } from '../../configurations';
import { Generics } from '../../utils';

import { Towers } from '../../components'
import SearchingStyle from './searching.module.less';


let initialState = {
    array: Generics.generateRandomArray(Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE),
    comparedIndex: [],
    sortingSpeed: Application.ALGORITHMS.SEARCHING.DEFAULT_SEARCHING_SPEED,
    searchAlgorithmSelected: Application.ALGORITHMS.SEARCHING.DEFAULT_SEARCHING_ALGORITHM_TYPE,
    isDisabled: false,
    linearSearchInfo: {
        currentIndex: 0,
    },
    binarySearchInfo: {
        left: 0,
        right: Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE - 1,
        mid: undefined
    },
    searchElementIndex: 0,
    foundIndex: undefined
}

class Searching extends PureComponent {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }
    state = {
        ...initialState
    }

    onArraySizeChange = (value) => {
        if (value >= Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE && value <= Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE) {
            let array = [];
            for (let i = 0; i < value; i++) {
                array.push(Math.ceil(100 / ((Math.random() * value) + 1)) * 10);
            }
            if (Application.ALGORITHMS.SEARCHING.TYPES.BINARY_SEARCH === this.state.searchAlgorithmSelected) {
                array.sort((a, b) => b - a);
            }
            this.setState({ array: array, sortingSpeed: this.state.sortingSpeed, foundIndex: undefined, comparedIndex: [] });
        }
    }
    onSpeedChange = (value) => {
        this.setState({ sortingSpeed: value });
    }
    onSortAlgorithmSelect = (value) => {
        let newArray = [...this.state.array];
        if (Application.ALGORITHMS.SEARCHING.TYPES.BINARY_SEARCH === value) {
            newArray.sort((a, b) => b - a);
        }
        else {
            newArray = initialState.array;
        }
        this.setState({ ...initialState, array: newArray, searchAlgorithmSelected: value })
    }
    onSearchElementSelect = (value) => {
        this.setState({ searchElementIndex: parseInt(value) });
    }
    callAlgorithmMethod = () => {
        const { searchAlgorithmSelected } = this.state;
        switch (searchAlgorithmSelected) {
            case Application.ALGORITHMS.SEARCHING.TYPES.BINARY_SEARCH: {
                this.binarySearch();
                break;
            }
            case Application.ALGORITHMS.SEARCHING.TYPES.LINEAR_SEARCH: {
                this.linearSearch();
                break;
            }
            default:
                this.binarySearch();
        }
    }
    sleep = async (msec) => {
        return new Promise(resolve => setTimeout(resolve, msec));
    }


    binarySearch = () => {
        const { array, binarySearchInfo, sortingSpeed, searchElementIndex } = this.state;
        this.sleep(sortingSpeed * 10).then(e => {
            const { left, right } = binarySearchInfo;
            let mid = Math.floor(left + (right - left) / 2);
            if (array[mid] < array[searchElementIndex]) {
                this.setState({
                    comparedIndex: [searchElementIndex, mid],
                    binarySearchInfo: {
                        left: left,
                        right: mid - 1,
                        mid: mid
                    }
                });
            }
            else if (array[mid] > array[searchElementIndex]) {
                this.setState({
                    comparedIndex: [searchElementIndex, mid],
                    binarySearchInfo: {
                        left: mid + 1,
                        right: right,
                        mid: mid
                    }
                });
            }
            else {
                this.setState({
                    comparedIndex: [undefined, undefined],
                    binarySearchInfo: {
                        left: 0,
                        right: Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE - 1
                    },
                    isDisabled: false,
                    foundIndex: mid
                });
            }
        });
    }

    linearSearch = () => {
        const { array, linearSearchInfo, sortingSpeed, searchElementIndex } = this.state;
        if (linearSearchInfo.currentIndex < array.length) {
            this.sleep(sortingSpeed * 10).then(e => {
                if (array[linearSearchInfo.currentIndex] !== array[searchElementIndex]) {
                    this.setState({
                        comparedIndex: [searchElementIndex, linearSearchInfo.currentIndex],
                        linearSearchInfo: {
                            currentIndex: linearSearchInfo.currentIndex + 1
                        }
                    });
                }
                else {
                    this.setState({
                        comparedIndex: [searchElementIndex, linearSearchInfo.currentIndex],
                        linearSearchInfo: {
                            currentIndex: 0
                        },
                        foundIndex: linearSearchInfo.currentIndex,
                        isDisabled: false
                    })
                }
            });
        }
    }
    handleSubmit = () => {
        this.setState({ isDisabled: true, comparedIndex: [], foundIndex: undefined });
        this.callAlgorithmMethod();
    }
    componentDidUpdate() {
        const { isDisabled } = this.state;
        if (isDisabled) {
            this.callAlgorithmMethod();
        }
    }
    componentDidMount() {
        // let test = this.divRef.current.attachShadow({mode:"open"});
    }


    createColorInformation = () => {
        const { searchAlgorithmSelected } = this.state;
        let colorInformation = [];
        colorInformation.push(
            <Col xs={24} sm={12} lg={8} key={1}>
                <div className={[SearchingStyle.red, SearchingStyle.common].join(" ")}></div>
                <div className={SearchingStyle.commonText}>ELements being compared</div>
            </Col>
        )
        colorInformation.push(
            <Col xs={24} sm={12} lg={8} key={2}>
                <div className={[SearchingStyle.green, SearchingStyle.common].join(" ")}></div>
                <div className={SearchingStyle.commonText}>Found Element</div>
            </Col>
        );
        switch (searchAlgorithmSelected) {
            case Application.ALGORITHMS.SEARCHING.TYPES.BINARY_SEARCH: {
                colorInformation.push(
                    <Col xs={24} sm={12} lg={8} key={3}>
                        <div className={[SearchingStyle.yellow, SearchingStyle.common].join(" ")}></div>
                        <div className={SearchingStyle.commonText}>Pivot</div>
                    </Col>
                );
                break;
            }
            default:
                break;
        }
        return colorInformation;
    }

    render() {
        const { array, searchAlgorithmSelected, searchElementIndex, binarySearchInfo, foundIndex, comparedIndex, isDisabled, sortingSpeed } = this.state;
        let ColorInformation = this.createColorInformation();
        return (
            <div ref={this.divRef}>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={24} sm={10} lg={5} >
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
                        <Col xs={24} sm={10} lg={5} className={SearchingStyle.columnStyle}>
                            <Form.Item label="Select speed(in ms) higher is slower">
                                <Slider
                                    min={Application.ALGORITHMS.SORTING.MIN_SORTING_SPEED}
                                    max={Application.ALGORITHMS.SORTING.MAX_SORTING_SPEED}
                                    onChange={this.onSpeedChange}
                                    disabled={isDisabled}
                                    value={sortingSpeed}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={10} lg={6} className={SearchingStyle.extraMargin}>
                            <Form.Item label="Select Algorithm type">
                                <Select defaultValue={searchAlgorithmSelected} disabled={isDisabled} onChange={this.onSortAlgorithmSelect}>
                                    {
                                        Object.entries(Application.ALGORITHMS.SEARCHING.TYPES).map(([key, value]) => {
                                            return <Select.Option key={key} value={value}>{value}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={10} lg={5} className={SearchingStyle.columnStyle}>
                            <Form.Item label="Select element to search">
                                <Select defaultValue={array[searchElementIndex]} disabled={isDisabled} onChange={this.onSearchElementSelect}>
                                    {
                                        array.map((eachElement, index) => {
                                            return <Select.Option key={index}>{eachElement}</Select.Option>
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
                    <Towers pivot={binarySearchInfo.mid} array={array} sortedIndexes={[]} foundIndex={foundIndex} comparedIndex={comparedIndex} />
                </div>
            </div>)
    }
}

export default Searching;