import React from 'react'

import { displayIcon, iconClass } from '../../utils/RegisterStepUtils';
import './RegisterStepCounter.css';

interface RegistrationStepConterProps {
    step: number
    changeStep():void
}

const RegistrationStepConter:React.FC<RegistrationStepConterProps> = ({step,changeStep}) => {
  return (
    <div className='reg-step-counter-container'>
        <div className={iconClass(step)} onClick={changeStep}>
            {displayIcon(step)}
        </div>
        <span className='reg-step-number'>Step {step} of 6</span>
    </div>
  )
}

export default RegistrationStepConter