import React,{useState} from 'react'
import { Modal } from '../../../../components/modal/Modal'
import RegisterStepConter from '../RegistrationsStepCounter/RegistrationStepConter';
import './RegisterModal.css';

const RegisterModal: React.FC = () => {

  const [step, setStep] = useState<number>(1);

  const setpButtonHandler = () => {
    step===1 || step===4 || step===6 ? setStep(step) : setStep(step-1);
  }

  return (
    <Modal>
      <div className='register-container'>
        <RegisterStepConter step={step} changeStep={setpButtonHandler}/>
      </div>
    </Modal>
  )
}

export default RegisterModal
