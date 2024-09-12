import React,{useState,useEffect} from 'react'

import { TextInput } from '../../../../components/TextInput/TextInput';

import './RegisterFormOne.css';

interface FormOneState {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
}

export const RegisterFormOne:React.FC = () => {

    const[stepOneState, setStepOneState] = useState<FormOneState>({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: ''
    });

    const updateUser = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setStepOneState({
            ...stepOneState,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        console.log("state change: ",stepOneState);
    },[stepOneState]);

    return (
        <div className='reg-step-one-container'>
            <div className="reg-step-one-content">
                <TextInput name={"firstName"} label={'First'} errorMessage={'Please enter your name '} onChange={updateUser} />
                <TextInput name={"lastName"} label={'Last'} errorMessage={'Please enter your name '} onChange={updateUser} />
                <TextInput name={"email"} label={'Email'} errorMessage={'Please enter your email '} onChange={updateUser} />
                <TextInput name={"dateOfBirth"} label={'Date of Birth'} errorMessage={'Please enter your date of birth '} onChange={updateUser} />
            </div>
        </div>
    )
}

function setStepOneState(arg0: any) {
    throw new Error('Function not implemented.');
}
