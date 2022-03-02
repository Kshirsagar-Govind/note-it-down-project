export function addPassword(data) {

    return {
        type: 'ADD_PASSWORD',
        payload: data,
    }
}

export function editPassword(data) {

    return {
        type: 'EDIT_PASSWORD',
        payload: data,
    }
}

export function getAllPassword(user_id) {

    return async dispatch => {
        const data = await fetch(`${process.env.REACT_APP_HOST}/get-all-passwords/${user_id}`);
        // console.log(await data.json());
        const pass = await data.json()

        dispatch({
            type: 'GET_ALL_PASSWORD',
            payload: pass,
        })
    }
}

