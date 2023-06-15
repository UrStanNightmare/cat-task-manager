import {applyMiddleware, combineReducers, createStore} from "redux";
import {customerReducer} from "./reducer/customerReducer";
import promiseMiddleware from 'redux-promise';
import {dateReducer} from "./reducer/dateReducer";
import {modalReducer} from "./reducer/modalReducer";
import {eventReducer} from "./reducer/eventReducer";
import {composeWithDevToolsDevelopmentOnly} from "@redux-devtools/extension";

const rootReducer = combineReducers({
    evRed: eventReducer,
    custRed: customerReducer,
    dateRed: dateReducer,
    modalRed: modalReducer

})
export const store = createStore(rootReducer,
    composeWithDevToolsDevelopmentOnly(
        applyMiddleware(promiseMiddleware)
    )
)