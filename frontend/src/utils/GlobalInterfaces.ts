interface ThemeColors{
    gray: any;
    blue: string;
    black: string;
    darkgrey: string;
    lightgrey: string;
    offwhite: string;
    white: string;
    error: string;
}

export interface Theme{
    colors: ThemeColors;
}

export interface StyledInputProps{
    active: boolean;
    valid: boolean;
    theme: Theme;
    color?: string;
}

export interface ValidatedInputState{
    active: boolean;
    valid: boolean;
    typedIn: boolean;
    labelActive: boolean;
    labelColor: string;
    value: string;
}