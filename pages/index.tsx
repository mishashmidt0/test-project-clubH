import type {NextPage} from 'next'
import React, {FunctionComponent} from 'react';
import {WelcomeStep} from "../components/steps/WelcomeStep";
import {EnterNameStep} from "../components/steps/EnterNameStep";
import {TwitterStep} from "../components/steps/TwitterStep";
import {ChooseAvatarStep} from "../components/steps/ChooseAvatarStep";
import {EnterPhoneStep} from "../components/steps/EnterPhoneStep";
import {EnterCodeStep} from "../components/steps/EnterCodeStep";


type stepsComponentsType = { [key: number]: FunctionComponent }

const stepsComponents: stepsComponentsType = {
    0: WelcomeStep,
    1: EnterNameStep,
    2: TwitterStep,
    3: ChooseAvatarStep,
    4: EnterPhoneStep,
    5: EnterCodeStep,
}

type MainContaxtPropsType = {
    onNextStep: () => void
    step: number
}

export const MainContext = React.createContext<MainContaxtPropsType>({} as MainContaxtPropsType);

const Home: NextPage = () => {
    const [step, setStep] = React.useState<number>(0);
    const Step = stepsComponents[step]
    const onNextStep = () => {
        setStep((prev) => prev + 1)
    }

    return (
        <MainContext.Provider value={{step, onNextStep}}>
            <Step/>
        </MainContext.Provider>
    )
}
export default Home
