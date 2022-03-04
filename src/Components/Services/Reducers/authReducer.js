

const initialState = {
    loggedIn: false,
    name: 'user',
    email: 'email',
    user_id: 'id',
    reg_on: 'DD/MM/YYYY',
    app_mode: 'light-mode'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CHANGE_MODE':
            state.app_mode = action.payload;
            return state;

        case 'USER_AUTHENTICATION':
            return Object.assign(state, action.payload);

        default:
            return state;
    }
}
export default authReducer;