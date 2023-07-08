const defaultState = {
    date: new Date()
}

export const dateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ACTIVE_DATE:
            return {...state, date: action.value}

        case RESET_DATE:
            return {...state, date: new Date()}

        default:
            return state
    }
}

const SET_ACTIVE_DATE = "SET_ACTIVE_DATE"
export const setActiveDate = (val) =>{
    return {
        type: SET_ACTIVE_DATE,
        value: val
    }
}

const RESET_DATE = "RESET_DATE"
export const resetDate = () => {
    return {
        type: RESET_DATE
    }
}
