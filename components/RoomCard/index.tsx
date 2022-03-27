import React from "react";
import {RoomCardInterface, ListenerInterface} from "./RoomCardTypes";
import styles from './RoomCard.module.sass'
import {v1} from "uuid";

const RoomCard = (props: RoomCardInterface) => {
    const {title, avatars, listeners,} = props

    return (
        <div className={styles.conversation}>
            <h2 className={styles.conversation__title}>{title}</h2>

            <div className={styles.conversation__wrapper}>
                <div className={styles.conversation__avatar__wrapper}>
                    <img key={v1()} src={avatars[0]} className={`${styles.conversation__avatar__first}`} alt="First user avatar"/>
                    <img key={v1()}
                         src={avatars[1] ? avatars[1] : 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}
                         className={`${styles.conversation__avatar__second}`} alt="Second user avatar"/>
                </div>

                <div className={styles.conversation__listeners__wrapper}>
                    {listeners.map((listener: ListenerInterface) => {
                        return <p key={v1()} className={styles.listeners__paragraph}>{listener.name}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default RoomCard
