const initialState = [];

export const passwordReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ADD_PASSWORD':
            const arr = state;
            const new_pass = action.payload;
            arr.push(new_pass);
            return arr;

        case 'EDIT_PASSWORD':
            const newP = action.payload;
            const updatedList = state.map(item => item.label !== newP.label ? item : newP)
            return updatedList;

        case 'GET_ALL_PASSWORD':
            return action.payload;

        default:
            return state;

    }
}