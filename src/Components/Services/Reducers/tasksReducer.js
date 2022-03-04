const initial_state = [];
export const tasksReducer = (state = initial_state, action) => {
    switch (action.type) {
        case 'UPDATE_TASK_STATUS':
            const data = action.payload;
            for (const s in state) {
                if (state[s].tasks_id == data.tasks_id) {
                    for (const t in state[s].Tasks) {
                        if (state[s].Tasks[t].task_id == data.task_id) {
                            state[s].Tasks[t].status = data.status
                        }
                    }
                }
            }
            console.log(state, "-----------------TASK REDUCER-->>>")
            return state;


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