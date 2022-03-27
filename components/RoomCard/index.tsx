import React from "react";
import {RoomCardInterface, ListenerInterface} from "./RoomCardTypes";
import styles from './RoomCard.module.sass'

const RoomCard = (props: RoomCardInterface) => {
    const {title, avatars, listeners,} = props

    return (
        <div className={styles.conversation}>
            <h2 className={styles.conversation__title}>{title}</h2>

            <div className={styles.conversation__wrapper}>
                <div className={styles.conversation__avatar__wrapper}>
                    <img src={avatars[0]} className={`${styles.conversation__avatar__first}`} alt="First user avatar"/>
                    <img src={avatars[1]} className={`${styles.conversation__avatar__second}`} alt="Second user avatar"/>
                </div>

                <div className={styles.conversation__listeners__wrapper}>
                    {listeners.map((listener: ListenerInterface) => {
                        return <p key={listener.id} className={styles.listeners__paragraph}>{listener.name}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default RoomCard
