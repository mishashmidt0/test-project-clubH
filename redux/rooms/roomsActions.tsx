import actionTypes from "./roomsTypes";
import {RoomCardInterface} from "../../../../../../New folder/clubhouse/components/RoomCard/RoomCardTypes";

const roomsActions = {
  setUser(payload: RoomCardInterface[]) {
    return {
      type: actionTypes.SET_ROOMS,
      payload
    }
  }
}

export default roomsActions
