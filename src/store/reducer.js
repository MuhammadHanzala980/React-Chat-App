export default (state = {}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'a':
            return {
                result: action.payload
            }
        case 'selecUser':
            return {
                result: action.payload
            }
        default:
            return state
    }
}