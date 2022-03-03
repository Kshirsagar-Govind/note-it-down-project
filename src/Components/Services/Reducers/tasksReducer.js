const initial_state = [];
export const tasksReducer = (state = initial_state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const arr = state;
            const new_tasks = action.payload;
            arr.push(new_tasks);
            return arr;

        case 'GET_ALL_TASKS':
            return action.payload;

        default: return state;
    }
}