export function isUserValid(data) {

    return {
        type: 'USER_AUTHENTICATION',
        payload: data,
    }
}