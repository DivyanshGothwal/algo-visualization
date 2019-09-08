import { Application } from "../configurations";

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