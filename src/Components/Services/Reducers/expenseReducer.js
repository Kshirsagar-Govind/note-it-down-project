const initialCategory = '';
const initialExpense = '';

export const CategoryReducer = (state = initialCategory, action) => {

    switch (action.type) {

        case 'ADD_CATEGORY':
            const arr = state;
            const new_category = action.payload;
            arr.push(new_category);
            console.log(arr, "----------ADD_CATEGORY");
            return arr;

        case 'GET_ALL_CATEGORIES':
            return action.payload;

        default:
            return state;
    }
}

export const ExpenseReducer = (state = initialExpense, action) => {

    switch (action.type) {

        case 'ADD_EXPENSE':
            const arr = state;
            const new_expense = action.payload;
            arr.push(new_expense);
            return arr;

        case 'GET_ALL_EXPENSES':
            return action.payload;

        default:
            return state;
    }

}