import React from 'react';
import {useRouter} from "next/router";

const BackButton = () => {
    const {back: goBack} = useRouter()

    return (
        <div className="d-flex mb-30 cup" onClick={() => goBack()}>
            <img src="/static/back-arrow.svg" alt="Back" className="mr-10" />
            <h3>Back</h3>
        </div>
    )
}

export default BackButton