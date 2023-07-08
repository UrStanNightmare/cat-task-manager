const defaultState = {
    serverOnline: false
}

export const serverReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SERVER_ONLINE_STATE:
            return {...state, serverOnline: action.value}
        default:
            return state
    }
}

const SET_SERVER_ONLINE_STATE = "CHANGE_SERVER_ONLINE_STATE"
export const setServerOnlineState = (val) => {
    return {
        type: SET_SERVER_ONLINE_STATE,
        value: val
    }
}