import React from 'react';
import styles from './room.module.sass'
import {RoomInterface} from './RoomTypes';
import {Button} from "../Buttons/Button";
import Link from 'next/link';


function Room(props: RoomInterface) {
    const {title}: { title: string } = props

    return (
        <div className={styles.room}>
            <div className='d-flex align-items-center justify-content-between'>
                <h2>{title}</h2>
                <div>
                    <Link href={'../'}>
                        <a>
                            <Button color={'green'}>
                                <img width={18} height={18} src="/static/peace.png" alt="peace"/>
                                Leave quiletly
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Room;
