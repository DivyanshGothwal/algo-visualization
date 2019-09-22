import React, { Component } from 'react';

import { Generics } from '../../utils';


class Towers extends Component {
    render() {
        const { array, sortedIndexes, comparedIndex, foundIndex, pivot } = this.props;
        let eachEleWidth = (100 / array.length) - 0.2;
        let eachEleWidthFinal = Generics.getDefaultMediaQueries().extraSmallDevice.matches ? eachEleWidth - 0.2 : eachEleWidth;
        return array.map((eachElement, i) => (<div
            key={i}
            style={{
                width: eachEleWidthFinal + "%",
                height: eachElement,
                backgroundColor: pivot === i ? "yellow" : (sortedIndexes.includes(i) || foundIndex === i) ? "green" : comparedIndex.includes(i) ? "red" : "blue",
                display: "inline-block",
                verticalAlign: "top",
                marginRight: Generics.getDefaultMediaQueries().extraSmallDevice.matches ? "0.4%" : "0.2%"
            }}
        ></div>));
    }
}

export default Towers;