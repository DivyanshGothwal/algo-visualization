import React, { Component } from 'react';
import { Button, Slider, Row, Col, Select, Form, } from 'antd';
import { Application } from '../../configurations';
import { Generics } from '../../utils';

import { Towers } from '../../components'
import SearchingStyle from './searching.module.less';

class Searching extends Component {
    constructor(props){
        super(props);
        this.divRef = React.createRef();
    }
    state = {
        array: Generics.generateRandomArray(Application.ALGORITHMS.SORTING.DEFAULT_SORTING_ALGORITHM_SIZE),
        comparedIndex: [],
        sortingSpeed: Application.ALGORITHMS.SEARCHING.DEFAULT_SEARCHING_SPEED,
        arraySizeToShow: Application.ALGORITHMS.SEARCHING.DEFAULT_SEARCHING_ALGORITHM_TYPE,
        searchAlgorithmSelected: Application.ALGORITHMS.SEARCHING.DEFAULT_SEARCHING_ALGORITHM_TYPE,
        isDisabled: false,
        linearSearchInfo: {
            currentIndex: 0,
        },
        searchElementIndex: 0,
        foundIndex: undefined
    }

    onArraySizeChange = (value) => {
        if (value >= Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE && value <= Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE) {
            let array = [];
            for (let i = 0; i < value; i++) {
                array.push(Math.ceil(100 / ((Math.random() * value) + 1)) * 10);
            }
            this.setState({ array: array, sortingSpeed: this.state.sortingSpeed, foundIndex: undefined, comparedIndex: [] });
        }
    }
    onSpeedChange = (value) => {
        this.setState({ sortingSpeed: value });
    }
    onSortAlgorithmSelect = (value) => {
        this.setState({ searchAlgorithmSelected: value })
    }
    onSearchElementSelect = (value) => {
        this.setState({ searchElementIndex: value })
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
    linearSearch = () => {
        const { array, linearSearchInfo, sortingSpeed, searchElementIndex } = this.state;
        if (linearSearchInfo.currentIndex < array.length) {
            this.sleep(sortingSpeed).then(e => {
                if (array[linearSearchInfo.currentIndex] !== array[searchElementIndex]) {
                    this.setState({
                        comparedIndex: [searchElementIndex, linearSearchInfo.currentIndex],
                        linearSearchInfo: {
                            ...linearSearchInfo,
                            currentIndex: linearSearchInfo.currentIndex + 1
                        }
                    })
                }
                else {
                    this.setState({
                        comparedIndex: [searchElementIndex, linearSearchInfo.currentIndex],
                        linearSearchInfo: {
                            ...linearSearchInfo,
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
    componentDidMount(){
        // let test = this.divRef.current.attachShadow({mode:"open"});
    }
    render() {
        const { array, searchAlgorithmSelected, searchElementIndex, foundIndex, comparedIndex, isDisabled, sortingSpeed } = this.state;
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
                <div style={{ height: "100%", width: "100%", padding: "10px" }}>
                    <Towers array={array} sortedIndexes={[]} foundIndex={foundIndex} comparedIndex={comparedIndex} />
                </div>
            </div>)
    }
}

export default Searching;