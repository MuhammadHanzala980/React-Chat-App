// export const simpleAction = (id) => dispatch => {
//     console.log(id)
//     dispatch({
//         type: 'SIMPLE_ACTION',
//         payload: 'result_of_simple_action'
//     })
// }


export const simpleAction = (a) => {
    console.log(a)
    return {
        type: 'a',
        payload: a
    }
}

export const selectUser = (data) => {
    return {
        type:'selecUser',
        payload: data,
    }
}