import React from 'react';
import Link from 'next/link'
import Axios from '../core/axios'

import {Header} from '../components/Header';
import RoomCard from "../components/RoomCard";
import {RoomCardInterface} from "../components/RoomCard/RoomCardTypes";
import {useSelector} from "react-redux";
import roomsActions from "../redux/rooms/roomsActions";
import {DefaultRootState} from "../redux/storeTypes";
import {wrapper} from '../redux/store';

export default function RoomsPage() {
  //@ts-ignore
  const {rooms} = useSelector((state: DefaultRootState) => state.roomsReducer)

  return (
    <>
      <Header/>
      <div className="container">
        <h1>All rooms</h1>

        <div className="rooms__wrapper">
          {rooms?.map((card:RoomCardInterface, idx: number) => {
            return (
              <Link href={`rooms/${card.id}`}>
                <a className="room-card">
                  <RoomCard
                    key={card.id + idx}
                    title={card.title}
                    avatars={[card.avatars[0], card.avatars[1]]}
                    listeners={card.listeners}
                  />
                </a>
              </Link>
            )})}
        </div>
      </div>
    </>
  );
}

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(  (store) => async () =>  {
  const {data} = await Axios.get('/RoomsCard.json')
  store.dispatch(roomsActions.setUser(data))
});

