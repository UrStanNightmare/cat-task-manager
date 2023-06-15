import moment from "moment";
import {CHANGE_DATE_MONTH, RESET_DATE} from "../actions";

const defaultState = {
    date: moment()
}

export const dateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_DATE_MONTH:
            return {...state, date: state.date.clone().add(action.value, 'month')}

        case RESET_DATE:
            return {...state, date: moment()}

        default:
            return state
    }
}
