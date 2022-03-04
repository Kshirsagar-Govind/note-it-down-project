export function isUserValid(data) {

    return {
        type: 'USER_AUTHENTICATION',
        payload: data,
    }
}

export function changeMode(mode) {

    return {
        type: 'CHANGE_MODE',
        payload: mode,
    }
}