export const getAllTasks = (user_id) => {
    return async dispatch => {
        let tasks = []

        try {

            const data = await fetch(`${process.env.REACT_APP_HOST}/get-all-tasks/${user_id}`);
            tasks = await data.json();
            console.log(tasks.tasks);
        } catch (error) {
            console.log(error);

        }
        dispatch({ type: 'GET_ALL_TASKS', payload: tasks.tasks })
    }
}

export function addTask(data) {

    return {
        type: 'ADD_TASK',
        payload: data,
    }
}
