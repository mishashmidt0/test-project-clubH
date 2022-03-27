import { createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import roomsReducer from "./rooms/roomsReducer";
import {createWrapper, HYDRATE} from "next-redux-wrapper";

const middleware = [thunkMiddleware];

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
  roomsReducer
})

const reducer = (state, action) => {
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

export const wrapper = createWrapper(initStore)
