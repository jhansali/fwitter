import React, { useEffect, useState } from 'react';

import { StyledInputBox, StyledInputLabel } from './StyledInput';
import './ValidatedInput.css';
import { ValidatedInputState } from '../../utils/GlobalInterfaces';
import { determineValidatedStyles } from '../../utils/DetermineStyledUtil';

interface ValidatedUserInputProps {
    name: string;
    label: string;
    errorMessage: string;
    validator(value: string): boolean;
    changeValue(e: React.ChangeEvent<HTMLInputElement>): void;
    attibutes?: Record<string, string | number | boolean>;
}

export const ValidatedInput: React.FC<ValidatedUserInputProps> = ({
    name,
    label,
    errorMessage,
    validator,
    changeValue,
    attibutes,
}) => {
    const [validatedState, setValidatedState] = useState<ValidatedInputState>({
        active: false,
        valid: true,
        typedIn: false,
        labelActive: false,
        labelColor: 'gray',
        value: ''
    });

    useEffect(() => {
        setValidatedState(determineValidatedStyles(validatedState, validator));
    },[validatedState.active, validatedState.typedIn, validatedState.value, validatedState.labelActive, validatedState.labelColor]);

    const focus = (e: React.FocusEvent<HTMLInputElement>) => {
        setValidatedState({
            ...validatedState,
            active: !validatedState?.active,
            labelActive: true,
        });
    };

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidatedState({
            ...validatedState,
            typedIn: true,
            value: e.target.value
        });
        changeValue(e);
    }

    return (
        <div className="validated-input">
            <StyledInputBox active={validatedState.active} valid={validatedState.valid}>
                <StyledInputLabel color={validatedState.labelColor} active={validatedState.labelActive} valid={validatedState.valid}>
                    {label}
                </StyledInputLabel>
                <input
                    className="validated-input-value"
                    onFocus={focus}
                    onBlur={focus}
                    onChange={updateValue}
                    {...attibutes}
                />
            </StyledInputBox>
            {validatedState.valid ? <></>:<span>{errorMessage}</span>}
        </div>
    );
};

