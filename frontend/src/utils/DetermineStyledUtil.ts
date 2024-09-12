import { StyledInputProps } from "./GlobalInterfaces";

export const determineStyledInputBorder = (props: StyledInputProps) => {
    let {active, valid, theme} = props;

    if(!active && valid){
        return `1px solid ${theme.colors.lightgrey}`;
    }else if(!active && !valid){
        return `1px solid ${theme.colors.error}`;
    }else if(active && valid){
        return `2px solid ${theme.colors.blue}`;
    }else if(active && !valid){
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
    return theme.colors.darkgrey;
}