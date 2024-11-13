import React,{useState,useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/Store';

import { incrementStep } from '../../../../redux/Slices/RegisterSlice';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { ValidatedInput } from '../../../../components/ValidatedInput/ValidatedInput';
import './RegisterFormOne.css';
import { validateName } from '../../../../services/Validator';
import { RegisterDateInput } from '../RegisterDateInput/RegisterDateInput';
import { RegisterNameInputs } from '../RegisterNameInputs/RegisterNameInputs';
import { RegisterEmailInput } from '../RegisterEmailInput/RegisterEmailInput';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';

interface FormOneState {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
}

export const RegisterFormOne:React.FC = () => {

    const registerState = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const [buttonActive, setButtonActive] = useState<boolean>(false);
    const nextPage = () => {
        dispatch(incrementStep());
    }

    useEffect(() => {

        if(registerState.dobValid && registerState.emailValid && registerState.firstNameValid && registerState.lastNameValid){

            console.log("all fields are valid");
            setButtonActive(true);
        }
        else{
            console.log("not all fields are valid ", registerState.emailValid);
            setButtonActive(false);
        }
        
    },[registerState]);

    return (
        <div className='reg-step-one-container'>
            <div className="reg-step-one-content">
                <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName}/>
                <RegisterEmailInput email={registerState.email}/>
                <RegisterDateInput date={registerState.dob}/>
            </div>
            <StyledNextButton 
                color={buttonActive ? "blue" : "black"}
                active={buttonActive}
                onClick={nextPage} >
                Next
            </StyledNextButton>
        </div>
    )
}

function setStepOneState(arg0: any) {
    throw new Error('Function not implemented.');
}
