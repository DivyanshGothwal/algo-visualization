import { Generics } from '../../src/utils';

export const ALGORITHMS = {
    SORTING: {
        TYPES: {
            MERGE_SORT: "Merge Sort",
            QUICK_SORT: "Quick Start",
            BUBBLE_SORT: "Bubble Sort",
            SELECTION_SORT: "Selection Sort"
        },
        NAME: "Sorting",
        PATH: "/sorting",
        MAX_ARRAY_SIZE: Generics.getDefaultMediaQueries().extraSmallDevice.matches ? 30 : 250,
        MIN_ARRAY_SIZE: Generics.getDefaultMediaQueries().extraSmallDevice.matches ? 10 : 25,
        MAX_SORTING_SPEED: 10,
        MIN_SORTING_SPEED: 1,
        DEFAULT_SORTING_ALGORITHM_TYPE: "Quick Start",
        DEFAULT_SORTING_ALGORITHM_SIZE: Generics.getDefaultMediaQueries().extraSmallDevice.matches ? 30 : 100,
        DEFAULT_SORTING_SPEED: 10
    },
    SEARCHING: {
        TYPES: {
            BINARY_SEARCH: "Binary Search",
            LINEAR_SEARCH: "Linear Search"
        },
        NAME: "Searching",
        PATH: "/searching",
        MAX_ARRAY_SIZE: 250,
        MIN_ARRAY_SIZE: 25,
        MAX_SORTING_SPEED: 10,
        MIN_SORTING_SPEED: 1,
        DEFAULT_SEARCHING_ALGORITHM_TYPE: "Linear Search",
        DEFAULT_SEARCHING_ALGORITHM_SIZE: 50,
        DEFAULT_SEARCHING_SPEED: 10
    }
}