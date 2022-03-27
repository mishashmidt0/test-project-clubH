import clsx from 'clsx';
import {WhiteBlock} from '../../WhiteBlock';
import {Button} from '../../Buttons/Button';
import {StepInfo} from '../../StepInfo';
import styles from './EnterNameStep.module.scss';
import React from 'react';
import {MainContext} from "../../../pages";


export const EnterNameStep = () => {
    const [isDisable, setIsDisable] = React.useState<boolean>(true);
    const [inputValue, setInputValue] = React.useState<string>('');
    const {onNextStep} = React.useContext(MainContext);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value.trim() ? setIsDisable(false) : setIsDisable(true);
        setInputValue(event.target.value.trim());
    };

    const onClickNextStep = () => {
        onNextStep()
    }

    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/man.png"
                title="What’s your full name?"
                description="People use real names on Clubhouse :) Thnx!"
            />
            <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
                <div className="mb-30">
                    <input
                        onChange={handleChangeInput}
                        value={inputValue}
                        className="field"
                        placeholder="Enter fullname"
                    />
                </div>
                <Button disabled={isDisable} onClick={onClickNextStep} color={'green'}>
                    Next
                    <img className="d-ib ml-10" src="/static/arrow.svg"/>
                </Button>
            </WhiteBlock>
        </div>
    );
};
