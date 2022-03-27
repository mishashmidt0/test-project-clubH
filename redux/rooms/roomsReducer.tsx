import actionTypes from "./roomsTypes";

export const initialState = {
  rooms: []
}

const roomsReducer = (state = initialState, action: actionTypes): => {
  switch(action.type) {
    case actionTypes.SET_ROOMS:
      return {
        ...state, rooms: action.payload
      }
    default:
      return state
  }
}

export default roomsReducer
