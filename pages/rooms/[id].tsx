import React, {useContext} from 'react';
import BackButton from "../../components/Buttons/BackButton/BackButton";
import {Header} from "../../components/Header";
import Room from '../../components/Room/Room';
import Axios from "../../core/axios";


const Conversation = ({room}: any) => {
    return (
        <div className={`container`}>
            <Header/>

            <BackButton title={'All rooms'}/>
            <Room
                title={`Название комнаты - ${room.title}`}
            />
        </div>
    )
}

export default Conversation

export async function getServerSideProps(cxt: any) {
    const {id: idRoom} = cxt.query
    try {
        const {data} = await Axios.get(`/RoomsCard.json`)
        const currentRoom = (data as Array<{ id: string }>).find(room => room.id === idRoom)
        return {
            props: {
                room: currentRoom
            }
        }
    } catch (err: any) {
        console.log('err', err.message)
        return []
    }
}
