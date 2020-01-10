const initialState = {
    user: 'user',
    auth: 'null',
    isLogedin: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'authChack':
            return {
                ...state, auth: action.payload
            }
        case 'selecUser':
            return {
                ...state, user: action.payload
            };
        case 'isLogedin':
            return {
                ...state, isLogedin: action.payload
            };
        default:
            return state;
    }
}

export default reducer