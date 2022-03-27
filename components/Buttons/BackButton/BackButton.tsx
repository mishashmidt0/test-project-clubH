import React from 'react';
import {useRouter} from "next/router";

type BackButtonType = {
    title?: string
}

const BackButton: React.FC<BackButtonType> = ({title = 'Back'}) => {
    const {back: goBack} = useRouter()

    return (
        <div className="d-flex mb-30 cup" onClick={() => goBack()}>
            <img src="/static/back-arrow.svg" alt="Back" className="mr-10"/>
            <h3>{title}</h3>
        </div>
    )
}

export default BackButton
