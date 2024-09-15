import React from "react";
import { ValidatedDateSelector } from "../../../../components/ValidatedInput/ValidatedDateSelector";
import { getMonths,getDays,getYears } from "../../../../utils/DateUtils";

export const RegisterDateInput:React.FC = () => {
    return (
        <div className="register-date">
            <ValidatedDateSelector style="validated-month" valid={true} name="Month" dropdown={getMonths}/>
            <ValidatedDateSelector style="validated-day" valid={true} name="Day" dropdown={getDays}/>
            <ValidatedDateSelector style="validated-year" valid={true} name="Year" dropdown={getYears}/>
        </div>
    )
}