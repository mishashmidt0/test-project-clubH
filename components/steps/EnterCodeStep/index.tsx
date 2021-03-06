import React from 'react';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {WhiteBlock} from '../../WhiteBlock';
import {Button} from '../../Buttons/Button';
import {StepInfo} from '../../StepInfo';
import Axios from '../../../core/axios';

import styles from './EnterPhoneStep.module.scss';

export const EnterCodeStep = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [codes, setCodes] = React.useState(['', '', '', '']);
    const nextDisabled = codes.some((v) => !v);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(event.target.getAttribute('id'));
        const value = event.target.value;
        setCodes((prev) => {
            const newArr = [...prev];
            newArr[index] = value;
            return newArr;
        });
        if (event.target.nextSibling) {
            (event.target.nextSibling as HTMLInputElement).focus();
        }

    };


    const onSubmitHandler = async () => {
        try {
            setIsLoading(true)
            await Axios.get('/RoomsCard.json')
            router.push('/rooms');
        } catch (error) {
            setIsLoading(false)
            alert('Ошибка при активации')
        }

    };

    return (
        <div className={styles.block}>
            {!isLoading ? (
                <>
                    <StepInfo icon="/static/numbers.png" title="Enter your activate code"/>
                    <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
                        <div className={clsx('mb-30', styles.codeInput)}>
                            {codes.map((code, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    placeholder="x"
                                    maxLength={1}
                                    id={String(index)}
                                    onChange={handleChangeInput}
                                    value={code}
                                />
                            ))}
                        </div>
                        <Button color={'green'} onClick={onSubmitHandler} disabled={nextDisabled}>
                            Next
                            <img className="d-ib ml-10" src="/static/arrow.svg"/>
                        </Button>
                    </WhiteBlock>
                </>
            ) : (
                <div className="text-center">
                    <div className="loader"/>
                    <h3 className="mt-5">Activation in progress ...</h3>
                </div>
            )}
        </div>
    );
};
