export const getAllCategories = (user_id) => {
    return async dispatch => {
        const data = await fetch(`${process.env.REACT_APP_HOST}/get-all-categories/${user_id}`);
        const cats = await data.json();
        dispatch({
            type: 'GET_ALL_CATEGORIES',
            payload: cats.Categories,
        })
    }
}



export const getAllExpenses = (user_id) => {
    return async dispatch => {
        const data = await fetch(`${process.env.REACT_APP_HOST}/get-all-expenses/${user_id}`);

        const exp = await data.json();

        dispatch({
            type: 'GET_ALL_EXPENSES',
            payload: exp.Expenses,
        })

    }
}


export const addCategory = (data) => {
    console.log(data, "----------ADD_CATEGORY");

    return {
        type: 'ADD_CATEGORY',
        payload: data,

    }
}

export const addExpense = (data) => {
    return {
        type: 'ADD_EXPENSE',
        payload: data,

    }
}