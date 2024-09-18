import React,{useState,useEffect}from "react";
import { ValidatedDateSelector } from "../../../../components/ValidatedInput/ValidatedDateSelector";
import { getMonths,getDays,getYears } from "../../../../utils/DateUtils";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { validDob } from "../../../../services/Validator";

export const RegisterDateInput:React.FC = () => {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const [valid,setValid] = useState<boolean>(true);

    const updateState = (name:string,value:string|number|boolean):void => {
        dispatch(updateRegister({name,value}));
    }

    useEffect(()=>{
        let {day,month,year} = state.dob;
        if(day && month && year){
            setValid(validDob({day,month,year}));
        }
        dispatch(updateRegister({name:"dobValid",value:valid}));
    },[state.dob.day,state.dob.month,state.dob.year,state.dobValid,valid]);

    return (
        <div className="register-date">
            <ValidatedDateSelector style="validated-month" valid={valid} name="Month" dropdown={getMonths} dispatcher={updateState}/>
            <ValidatedDateSelector style="validated-day" valid={valid} name="Day" dropdown={getDays} dispatcher={updateState}/>
            <ValidatedDateSelector style="validated-year" valid={valid} name="Year" dropdown={getYears} dispatcher={updateState}/>
        </div>
    )
}