export const CHANGE_DATE_MONTH = "CHANGE_DATE_MONTH";
export const changeDateMonth = (val) =>{
    return {
        type: CHANGE_DATE_MONTH,
        value: val
    }
}
export const RESET_DATE = "RESET_DATE";
export const resetDate = () => {
    return {
        type: RESET_DATE
    }
}
export const SET_MODAL_WINDOW_VISIBLE = "SET_MODAL_WINDOW_VISIBLE";
export const setModalWindowVisible = (val) => {
    return {
        type: SET_MODAL_WINDOW_VISIBLE,
        value: val
    }
}
export const SET_MODAL_WINDOW_DATE = "SET_MODAL_WINDOW_DATE";
export const setModalWindowDate = (val) => {
    return {
        type: SET_MODAL_WINDOW_DATE,
        value: val
    }
}
export const SET_EVENTS_ARRAY = "SET_EVENTS_ARRAY";
export const setEventsArray = (val) => {
    return {
        type: SET_EVENTS_ARRAY,
        value: val
    }
}
export const SET_VISIBLE_EVENTS_ARRAY = "SET_VISIBLE_EVENTS_ARRAY";
export const setVisibleEventsArray = (val) => {
    return {
        type: SET_VISIBLE_EVENTS_ARRAY,
        value: val
    }
}
export const ADD_VISIBLE_EVENT_TO_ARRAY = "ADD_VISIBLE_EVENT_TO_ARRAY";
export const addVisibleEventToArray = (val) => {
    return {
        type: ADD_VISIBLE_EVENT_TO_ARRAY,
        value: val
    }
}