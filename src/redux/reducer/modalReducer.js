import moment from "moment";
import {SET_MODAL_WINDOW_DATE, SET_MODAL_WINDOW_VISIBLE} from "../actions";

const defaultState = {
    visible: false,
    date: moment()
}

export const modalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MODAL_WINDOW_VISIBLE:
            return {...state, visible: action.value}
        case SET_MODAL_WINDOW_DATE:
            return {...state, date: action.value}

        default:
            return state
    }
}