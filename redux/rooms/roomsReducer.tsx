import actionTypes from "./roomsTypes";
import {RoomCardInterface} from "../../components/RoomCard/RoomCardTypes";
import {v1} from "uuid";

export type  actionType = {
    type: 'USER:SET_ROOMS'
    payload: RoomCardInterface[]
}
export const initialState: roomsReducerStateType = {
    rooms: [{
        id: v1(),
        title: "Test room",
        avatars: ['test'],
        listeners: [{name: 'Mikki', id: v1()}],
        guests: ['Maikle Luter', 'Amanda Born'],
        guestsCounte: 44,
        speakersCount: 2
    }]

}

type roomsReducerStateType = {
    rooms: RoomCardInterface[]
}


const roomsReducer = (state = initialState, action: actionType): roomsReducerStateType => {
    switch (action.type) {
        case actionTypes.SET_ROOMS:
            return {
                ...state, rooms: action.payload
            }
        default:
            return state
    }
}

export default roomsReducer
