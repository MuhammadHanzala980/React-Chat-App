export const isLogedin = (data) => ({
    type: 'isLogedin',
    payload: data
})

export const authChack = (data) => ({
    type: 'authChack',
    payload: data
})
export const selectUser = (data) => ({
    type: 'selecUser',
    payload: data,
})