

const initialState = {
    loggedIn: false,
    name: 'user',
    email: 'email',
    user_id: 'id'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_AUTHENTICATION':
            return Object.assign(state, action.payload);

        default:
            return state;
    }
}
export default authReducer;