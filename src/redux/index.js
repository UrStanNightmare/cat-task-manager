import {applyMiddleware, combineReducers, createStore} from "redux";
import {eventReducer} from "./reducer/eventReducer";
import {composeWithDevToolsDevelopmentOnly} from "@redux-devtools/extension";
import {serverReducer} from "./reducer/serverReducer";
import {modalReducer} from "./reducer/modalReducer";
import {dateReducer} from "./reducer/dateReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    evRed: eventReducer,
    serRed: serverReducer,
    modalRed: modalReducer,
    dateRed: dateReducer
})
export const store = createStore(rootReducer,
    composeWithDevToolsDevelopmentOnly(
        applyMiddleware(thunk)
    )
)