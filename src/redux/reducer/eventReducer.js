import Dayz from "dayz";
import {ADD_VISIBLE_EVENT_TO_ARRAY, CHANGE_EVENT_STATUS, SET_EVENTS_ARRAY, SET_VISIBLE_EVENTS_ARRAY} from "../actions";

const defaultState = {
    events: new Dayz.EventsCollection([]),

    visibleEvents: []
}

export const eventReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EVENTS_ARRAY:
            return {...state, events: action.value}

        case SET_VISIBLE_EVENTS_ARRAY:
            return {...state, visibleEvents: action.value}

        case ADD_VISIBLE_EVENT_TO_ARRAY: {
            const evs = state.visibleEvents.add(action.value)
            return {...state, visibleEvents: evs}
        }

        default:
            return state
    }
}