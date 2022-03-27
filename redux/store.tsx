import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import roomsReducer from "./rooms/roomsReducer";
import {createWrapper, HYDRATE} from "next-redux-wrapper";

const middleware = [thunkMiddleware];

type middlewareType = typeof middleware

const bindMiddleware = (middleware: middlewareType) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
    roomsReducer
})


const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }

        return nextState
    } else {
        return combinedReducer(state, action)
    }
}


const initStore = () => {
    return createStore(reducer, bindMiddleware(middleware))
}
export type AppStateType = ReturnType<typeof combinedReducer>

export const wrapper = createWrapper(initStore)
