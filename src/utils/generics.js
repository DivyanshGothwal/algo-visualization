import { Application } from "../configurations";
// import { Generics } from '../../utils';

export const getValidationRules = (isRequired = false) => ({
    inputArraySize: [
        { required: isRequired, message: "Please input" },
        { min: Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE },
        { max: Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE },
        {
            type: "number",
            message: "must be a number"
        }
    ]
})


export const generateRandomArray = (maxArraySize) => {
    let newArray = [];
    for (let i = 0; i < maxArraySize; i++) {
        newArray.push(Math.ceil(100 / ((Math.random() * maxArraySize) + 1)) * 10);
    }
    return newArray;
}
export const generate2DArray = () => {
    let browserWidth = window.innerWidth;
    console.log(browserWidth);
    let extraSmallMediaQueries = getDefaultMediaQueries().extraSmallDevice;
    if (!extraSmallMediaQueries.matches) {
        browserWidth -= 168;
    }
    else {
        browserWidth -= 28;
    }
    let sizeOfSquare = Application.ALGORITHMS.GRAPH.SIZE_OF_GRID_SQUARES;
    let noOfSquaresHorizontally = Math.floor(browserWidth / sizeOfSquare);
    let noOfSquaresVertically = Application.ALGORITHMS.GRAPH.NUMBER_OF_SQUARES_VERTICALLY;
    let newGraph = [];
    for (let j = 0; j < noOfSquaresVertically; j++) {
        let innerGraph = [];
        for (let i = 0; i < noOfSquaresHorizontally; i++) {
            innerGraph.push(0);
        }
        newGraph.push(innerGraph);
    }
    return newGraph;
}
export const getWidth = () => {
    let browserWidth = window.innerWidth;
    console.log(browserWidth);
    let extraSmallMediaQueries = getDefaultMediaQueries().extraSmallDevice;
    if (!extraSmallMediaQueries.matches) {
        browserWidth -= 168;
    }
    else {
        browserWidth -= 28;
    }
    let sizeOfSquare = Application.ALGORITHMS.GRAPH.SIZE_OF_GRID_SQUARES;
    console.log("after:- " + browserWidth);
    console.log((sizeOfSquare / browserWidth) * 100);
    console.log(Math.floor((sizeOfSquare / browserWidth) * 100));
    let noOfSquaresHorizontally = Math.floor(browserWidth / sizeOfSquare);
    console.log(noOfSquaresHorizontally," end");
    return (1/noOfSquaresHorizontally)*100;
}
export const getDefaultMediaQueries = () => {
    // media query for extra large devices
    let extraLargeDeviceMedia = window.matchMedia("(min-width: 1199px)");

    // media query for large devices
    let largeDeviceMedia = window.matchMedia("(min-width: 991px)");

    // media query for medium devices
    let mediumDeviceMedia = window.matchMedia("(min-width: 767px)");

    // media query for small devices
    let smallDeviceMedia = window.matchMedia("(min-width: 575px)");

    // media query for extra small devices
    let extraSmallDeviceMedia = window.matchMedia("(max-width: 574px)");
    return {
        extraLarge: extraLargeDeviceMedia,
        largeDevice: largeDeviceMedia,
        mediumDevice: mediumDeviceMedia,
        smallDevice: smallDeviceMedia,
        extraSmallDevice: extraSmallDeviceMedia
    }
}