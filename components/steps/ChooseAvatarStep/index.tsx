import React from 'react';
import clsx from 'clsx';
import {WhiteBlock} from '../../WhiteBlock';
import {Button} from '../../Buttons/Button';
import {StepInfo} from '../../StepInfo';
import {Avatar} from '../../Avatar';
import styles from './ChooseAvatarStep.module.scss';
import {MainContext} from '../../../pages';
import {Axios} from "../../../core/axios";

export const ChooseAvatarStep: React.FC = () => {

    const {onNextStep, userData, setFieldValue} = React.useContext(MainContext);
    console.log(userData)
    const [avatarUrl, setAvatarUrl] = React.useState<string>(userData.avatarURL);
    const inputFileRef = React.useRef<HTMLInputElement>(null);

    const upLoadFile = async (file: File): Promise<{ url: string }> => {
        const formData = new FormData()
        formData.append('photo', file)

        const {data} = await Axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })

        //or
        // const {data} = await Axios({
        //     method: 'POST',
        //     url: '/upload',
        //     data: formData,
        //     headers: {'Content-Type': 'multipart/form-data'}
        // })
        return data
    }

    const handleChangeImage = async (event: Event) => {
        const target = (event.target as HTMLInputElement)
        const file = (event.target as any).files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
            const data = await upLoadFile(file)
            target.value = '';
            setAvatarUrl(data.url)
            setFieldValue('avatarURL', data.url)
        }
    };

    React.useEffect(() => {
        if (inputFileRef.current) {
            inputFileRef.current.addEventListener<any>('change', handleChangeImage);
        }
    }, []);


    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/celebration.png"
                title={`Okay, ${userData.username}!`}
                description="How???s this photo?"
            />
            <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
                <div className={styles.avatar}>
                    <Avatar width="120px" height="120px" src={avatarUrl}/>
                </div>
                <div className="mb-30">
                    <label htmlFor="image" className="link cup">
                        Choose a different photo
                    </label>
                </div>
                <input id="image" ref={inputFileRef} type="file" hidden/>
                <Button color={'green'} onClick={onNextStep}>
                    Next
                    <img className="d-ib ml-10" src="/static/arrow.svg"/>
                </Button>
            </WhiteBlock>
        </div>
    );
};
