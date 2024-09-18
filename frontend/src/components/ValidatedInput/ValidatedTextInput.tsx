import React,{useEffect,useState} from "react";
import { StyledInputBox, StyledInputLabel } from "./StyledInput";

export const ValidatedTextInput:React.FC =() =>{
    
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
    }

    useEffect(()=>{
        if(value && !labelActive){
            setLabelActive(true);
        }
    },[value,borderActive,labelActive,color])

    return (
        <div className="validated-text-input">
            <StyledInputBox active={borderActive} valid={true}>
                <StyledInputLabel active={labelActive} color={color} valid={true}>{'label'}</StyledInputLabel>
            </StyledInputBox>
            <input className="valided-input-value" name={"name"} onFocus={focus} onBlur={focus} onChange={update}/>
        </div>
    )
}