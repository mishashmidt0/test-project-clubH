import type {NextPage} from 'next'
import Link from 'next/link'
import Head from "next/head";
import {WelcomeStep} from "../components/steps/WelcomeStep";
import {EnterPhoneStep} from "../components/steps/EnterPhoneStep";
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (

        <div>
            <WelcomeStep/>
        </div>
    )
}

export default Home
