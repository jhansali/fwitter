import React, { useState,useEffect } from "react";
import { StyledInputBox, StyledInputLabel } from "./StyledInput";
import { determineValidatedSelectorStyles } from "../../utils/DetermineStyledUtil";

interface ValidatedDateSelectorProps {
    style: string;
    valid: boolean;
    name: string;
    dropdown: () => JSX.Element[];
}

export const ValidatedDateSelector: React.FC<ValidatedDateSelectorProps> = ({ style, valid, name, dropdown }) => {
    const [active, setActive] = useState<boolean>(false);
    const [value, setValue] = useState<number | string>("");
    const [color, setColor] = useState<string>("gray");

    const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Dispatch this change to a reducer");
        console.log("value: ", e.target.value);
        setValue(e.target.value);
    };

    const toggleActive = (e: React.FocusEvent<HTMLSelectElement>) => {
        setActive(!active);
    };

    useEffect(() => {
        setColor(determineValidatedSelectorStyles(active, valid));
    }, [active,valid,value]);

    return (
        <div className={style}>
            <StyledInputBox active={active} valid={valid}>
                <StyledInputLabel color={color} active={true} valid={valid}>
                    {name}
                </StyledInputLabel>
                <select
                    value={value}
                    onChange={changeValue}
                    onFocus={toggleActive}
                    onBlur={toggleActive}
                >
                    {dropdown()}
                </select>
            </StyledInputBox>
        </div>
    );
};
