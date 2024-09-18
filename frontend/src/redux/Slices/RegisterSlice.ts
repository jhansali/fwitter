import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Dob } from "../../utils/GlobalInterfaces";

interface RegisterSliceState {
    loading: boolean;
    error:boolean;
    firstName: string;
    firsrNameValid: boolean;
    lastName: string;
    lastNameValid: boolean;
    email: string;
    emailValid: boolean;
    dob: Dob;
    dobValid: boolean;
}

interface UpdatePayload {
    name: string;
    value: string |  number | boolean;
}

const initialState: RegisterSliceState = {
    loading: false,
    error: false,
    firstName: "",
    firsrNameValid: false,
    lastName: "",
    lastNameValid: false,
    email: "",
    emailValid: false,
    dob: {
        day: 0,
        month: 0,
        year: 0,
    },
    dobValid: false,
};

export const RegisterSlice = createSlice({
    name:"register",
    initialState,
    reducers: {
        updateRegister(state, action: PayloadAction<UpdatePayload>) {
            const { name, value } = action.payload;
            if(name==="month" || name==="day" || name==="year") {
                let dob = state.dob;
                dob= {...dob, [name]: value};
                state = {...state, dob};
            }else {
                state = {...state, [name]: value};
            }
            console.log("updating the global state", state);
            return state;
        }
    }
});

export const { updateRegister } = RegisterSlice.actions;

export default RegisterSlice.reducer;