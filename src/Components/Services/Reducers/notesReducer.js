

const initialState = '';

const noteReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ADD_NOTES':
            const arr = state;
            const new_note = action.payload;
            arr.push(new_note);
            return arr;

        case 'GET_ALL_NOTES':
            const data = action.payload;
            return data;

        case 'DELETE_NOTE':
            const filtered = state.filter(item => item.note_id !== action.payload);
            console.log(filtered);
            return filtered;

        default:
            return state;
    }
}
export default noteReducer;