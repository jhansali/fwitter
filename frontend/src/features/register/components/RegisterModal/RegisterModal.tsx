import React,{useState} from 'react'
import { Modal } from '../../../../components/modal/Modal'
import RegisterStepConter from '../RegistrationsStepCounter/RegistrationStepConter';
import { determineModalContent } from '../../utils/RegisterModelUtils';
import './RegisterModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { decremenmtStep } from '../../../../redux/Slices/RegisterSlice';

const RegisterModal: React.FC = () => {

  const state = useSelector((state:RootState) => state.register);
  const dispatch:AppDispatch = useDispatch();

  const setpButtonHandler = () => {
    dispatch(decremenmtStep());
  }

  return (
    <Modal>
      <div className='register-container'>
        <RegisterStepConter step={state.step} changeStep={setpButtonHandler}/>
        <div className="register-modal-content">
          {determineModalContent(state.step)}
        </div>
      </div>
    </Modal>
  )
}

export default RegisterModal