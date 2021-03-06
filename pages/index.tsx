import type {NextPage} from 'next'
import React, {FunctionComponent} from 'react';
import {WelcomeStep} from "../components/steps/WelcomeStep";
import {EnterNameStep} from "../components/steps/EnterNameStep";
import {GithubStep} from "../components/steps/GitHubStep";
import {ChooseAvatarStep} from "../components/steps/ChooseAvatarStep";
import {EnterPhoneStep} from "../components/steps/EnterPhoneStep";
import {EnterCodeStep} from "../components/steps/EnterCodeStep";


type stepsComponentsType = { [key: number]: FunctionComponent }

const stepsComponents: stepsComponentsType = {
    0: WelcomeStep,
    1: GithubStep,
    2: EnterNameStep,
    3: ChooseAvatarStep,
    4: EnterPhoneStep,
    5: EnterCodeStep,
}

type MainContaxtPropsType = {
    onNextStep: () => void
    setUserData: React.Dispatch<React.SetStateAction<UserDate>>
    setFieldValue: (field: keyof UserDate, value: string) => void
    userData: UserDate
    step: number
}
export type UserDate = {
    id: number,
    fullname: string,
    avatarURL: string,
    isActive: number,
    username: string,
    phone: string,
}
const userInitialState = {
    id: 1,
    fullname: '',
    avatarURL: '',
    isActive: 0,
    username: '',
    phone: '',
}

export const MainContext = React.createContext<MainContaxtPropsType>({} as MainContaxtPropsType);
const Home: NextPage = () => {

    const [userData, setUserData] = React.useState<UserDate>(userInitialState)
    const [step, setStep] = React.useState<number>(4);
    const Step = stepsComponents[step]
    const onNextStep = () => {
        setStep((prev) => prev + 1)
    }
    const setFieldValue = (field: string, value: string) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));

    }

    return (
        <MainContext.Provider value={{step, onNextStep, setUserData, userData, setFieldValue}}>
            <Step/>
        </MainContext.Provider>
    )
}
export default Home
