import React from 'react';
import Link from 'next/link'
import Axios from '../core/axios'
import {Header} from '../components/Header';
import RoomCard from "../components/RoomCard";
import {RoomCardInterface, RoomCardType} from "../components/RoomCard/RoomCardTypes";
import {useSelector} from "react-redux";
import roomsActions from "../redux/rooms/roomsActions";
import {DefaultRootState} from "../redux/storeTypes";
import {AppStateType, wrapper} from '../redux/store';
import {v1} from "uuid";
import {Button} from "../components/Buttons/Button";

export default function RoomsPage() {

    const [rooms, setRooms] = React.useState<RoomCardType>([])

    React.useEffect(() => {
        (async () => {
            const {data} = await Axios.get('/RoomsCard.json');
            setRooms(data)
        })();

    })
    // const {rooms} = useSelector((state: AppStateType) => state.roomsReducer)


    return (
        <>
            <Header/>
            <div className="container">
                <div className='d-flex  justify-content-between align-items-center '>
                    <h1>All rooms</h1>
                    <Button color={"green"}>+ Start room</Button>
                </div>

                <div className="rooms__wrapper">
                    {rooms?.map((card: RoomCardInterface, idx: number) => {
                        return (
                            <Link key={card.id} href={`rooms/${card.id}`}>
                                <a className="room-card">
                                    <RoomCard
                                        id={v1()}
                                        key={card.id + idx}
                                        title={card.title}
                                        avatars={[card.avatars[0], card.avatars[1]]}
                                        listeners={card.listeners}
                                    />
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </div>

        </>
    );
}


// // @ts-ignore
// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//     const {data} = await Axios.get('/RoomsCard.json')
//     store.dispatch(roomsActions.setUser(data))
// });

