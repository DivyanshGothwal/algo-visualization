import { Application } from "../configurations";

export const getValidationRules = (isRequired = false) => ({
    inputArraySize: [
        { required: isRequired, message: "Please input" },
        { min: Application.ALGORITHMS.SORTING.MIN_ARRAY_SIZE},
        { max: Application.ALGORITHMS.SORTING.MAX_ARRAY_SIZE },
        {
            type: "number",
            message: "must be a number"
        }
    ]
})