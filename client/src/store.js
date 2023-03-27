import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import { tasksReducer, authReducer } from "./reducers";

export default createStore(
    combineReducers({
        tasks: tasksReducer,
        login: authReducer
    }),
    compose(
        applyMiddleware(
            thunk,
            logger
        )
    )
);

