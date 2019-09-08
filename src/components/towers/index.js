import React, { Component } from 'react';




class Towers extends Component {
    render() {
        const { array, sortedIndexes, comparedIndex, foundIndex } = this.props;
        let eachEleWidth = (100 / array.length) - 0.2;

        return array.map((eachElement, i) => (<div
            key={i}
            style={{
                width: eachEleWidth + "%",
                height: eachElement,
                backgroundColor: (sortedIndexes.includes(i) || foundIndex === i) ? "green" : comparedIndex.includes(i) ? "red" : "blue",
                display: "inline-block",
                verticalAlign: "top",
                marginRight: "0.2%"
            }}
        ></div>));
    }
}

export default Towers;