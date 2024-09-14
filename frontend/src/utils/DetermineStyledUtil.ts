import { StyledInputProps, ValidatedInputState } from "./GlobalInterfaces";

export const determineStyledInputBorder = (props: StyledInputProps) => {
    let {active, valid, theme} = props;

    if(!active && valid){
        return `1px solid ${theme.colors.lightgrey}`;
    }
    if(!active && !valid){
        return `1px solid ${theme.colors.error}`;
    }
    if(active && valid){
        return `2px solid ${theme.colors.blue}`;
    }
    if(active && !valid){
        return `2px solid ${theme.colors.error}`;
    }
}

export const determineStyledLabelColor = (props: StyledInputProps) => {
    let {active, valid, theme, color} = props;

    if(color && color === 'error'){
        return theme.colors.error;
    }
    if(color && color === 'blue'){
        return theme.colors.blue;
    }
    return theme.colors.gray;
}

export const determineValidatedStyles = (
    state: ValidatedInputState,
    validator: (value: string) => boolean
): ValidatedInputState => {
    let { active, valid, typedIn, labelActive, labelColor, value } = state;

    if (typedIn) {
        valid = validator(value);

        if (active && valid) {
            labelActive = true;
            labelColor = 'blue';
        }

        if (active && !valid) {
            labelActive = true;
            labelColor = 'error';
        }

        if (!active && valid) {
            labelActive = true;
            labelColor = 'gray';
        }

        if (!active && !valid) {
            labelActive = false;
            labelColor = 'gray';
        }
    } else {
        if (active) {
            labelActive = true;
            labelColor = 'blue';
        } else {
            labelActive = false;
            labelColor = 'gray';
        }
    }
    return {
        ...state,
        valid,
        labelActive,
        labelColor
    };
};