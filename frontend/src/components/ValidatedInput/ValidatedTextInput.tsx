import React,{useEffect,useState} from "react";
import { StyledInputBox, StyledInputLabel } from "./StyledInput";
import { determineValidatedTextLabel } from "../../utils/DetermineStyledUtil";

interface ValidatedTextInputProps {
    valid: boolean;
    name: string;
    label: string;
    changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ValidatedTextInput:React.FC<ValidatedTextInputProps> =({valid,name,label,changeValue}) =>{
    
    const [value,setValue] = useState<string>("");
    const [borderActive,setBorderActive] = useState<boolean>(false);
    const [labelActive,setLabelActive] = useState<boolean>(false);
    const [color,setColor] = useState<string>("gray");

    const focus = ():void =>{
        setBorderActive(true);
        if(!value){
            setLabelActive(!labelActive);
        }
    }

    const update = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setValue(e.target.value);
        console.log("send value back to dispatcher");
        changeValue(e);
    }

    useEffect(()=>{
        if(value && !labelActive){
            setLabelActive(true);
        }
        setColor(determineValidatedTextLabel(borderActive,valid));
    },[valid,value,borderActive,labelActive,color])

    return (
        <div className="validated-text-input">
            <StyledInputBox active={borderActive} valid={valid}>
                <StyledInputLabel active={labelActive} color={color} valid={valid}>{label}</StyledInputLabel>
            </StyledInputBox>
            <input className="valided-input-value" name={name} onFocus={focus} onBlur={focus} onChange={update}/>
        </div>
    )
}