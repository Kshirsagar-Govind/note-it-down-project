const initialCategory = '';
const initialExpense = '';

export const CategoryReducer = (state = initialCategory, action) => {

    switch (action.type) {
        case 'GET_ALL_CATEGORIES':
            return action.payload;

        default:
            return state;
    }

}

export const ExpenseReducer = (state = initialExpense, action) => {

    switch (action.type) {
        case 'GET_ALL_EXPENSES':
            return action.payload;

        default:
            return state;
    }

}