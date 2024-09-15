import React,{useState,useEffect} from 'react'

import { TextInput } from '../../../../components/TextInput/TextInput';
import { ValidatedInput } from '../../../../components/ValidatedInput/ValidatedInput';
import './RegisterFormOne.css';
import { validateName } from '../../../../services/Validator';
import { RegisterDateInput } from '../RegisterDateInput/RegisterDateInput';

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
                <ValidatedInput name='firstName' label='First' errorMessage={'Whats your name'} changeValue={updateUser} validator={validateName}></ValidatedInput>
                <ValidatedInput name='lastName' label='Last' errorMessage={'Whats your name'} changeValue={updateUser} validator={validateName}></ValidatedInput>
                <ValidatedInput name='email' label='Email' errorMessage={'Please enter a valid email'} changeValue={updateUser} validator={()=>true}></ValidatedInput>
                <RegisterDateInput/>
            </div>
        </div>
    )
}

function setStepOneState(arg0: any) {
    throw new Error('Function not implemented.');
}
