import React, {useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/Store";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { validateEmail } from "../../../../services/Validator";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";

interface RegisterEmailInputProps {
    email: string;
}

export const RegisterEmailInput:React.FC<RegisterEmailInputProps> = ({email}) =>{
    const [validEmail, setValidEmail] = useState<boolean>(true);

    const dispatch:AppDispatch = useDispatch();

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegister({
            name: "email",
            value: e.target.value
        }));

        let valid = validateEmail(e.target.value);
        setValidEmail(valid);

        dispatch(updateRegister({
            name: "emailValid",
            value: valid
        }));
    };

    return (
        <div className="register-email-input">
            <ValidatedTextInput data={email} valid={validEmail} name={"email"} label={"Email"} changeValue={updateEmail} />
        </div>
    )
}