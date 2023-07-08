const defaultState = {
    events: []
}

export const eventReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EVENTS_ARRAY:
            return {...state, events: action.value}

        case SET_VISIBLE_EVENTS_ARRAY:
            return {...state, visibleEvents: action.value}

        default:
            return state
    }
}

const SET_EVENTS_ARRAY = "SET_EVENTS_ARRAY"
export const setEventsArray = (val) => {
    return {
        type: SET_EVENTS_ARRAY,
        value: val
    }
}
const SET_VISIBLE_EVENTS_ARRAY = "SET_VISIBLE_EVENTS_ARRAY"
export const setVisibleEventsArray = (val) => {
    return {
        type: SET_VISIBLE_EVENTS_ARRAY,
        value: val
    }
}