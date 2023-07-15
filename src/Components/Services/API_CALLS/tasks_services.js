export const getAllTasks =async() => {

        try {
            const data = await fetch(`${process.env.REACT_APP_HOST}/get-all-tasks/${localStorage.UserId}`);
            const tasks = await data.json();
            return tasks.tasks;
        } catch (error) {
            console.log(error);
            return [];
        }

}

export function addTask(data) {

    return {
        type: 'ADD_TASK',
        payload: data,
    }
}

export function updatetTaskStatus(data) {

    return {
        type: 'UPDATE_TASK_STATUS',
        payload: data,
    }
}

