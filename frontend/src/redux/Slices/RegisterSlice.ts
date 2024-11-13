import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Dob } from "../../utils/GlobalInterfaces";

interface RegisterSliceState {
    loading: boolean;
    error:boolean;
    firstName: string;
    firstNameValid: boolean;
    lastName: string;
    lastNameValid: boolean;
    email: string;
    emailValid: boolean;
    dob: Dob;
    dobValid: boolean;
    step: number;
}

interface UpdatePayload {
    name: string;
    value: string |  number | boolean;
}

const initialState: RegisterSliceState = {
    loading: false,
    error: false,
    firstName: "",
    firstNameValid: false,
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
    step: 1
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
        },
        incrementStep(state) {
            state.step += 1;
            return state;
        },
        decremenmtStep(state) {
            if(state.step === 1 || state.step === 4 || state.step >= 6){
                return state;
            }else{
                state.step -= 1;
                return state;
            }
        }
    }
});

export const { updateRegister, incrementStep, decremenmtStep } = RegisterSlice.actions;

export default RegisterSlice.reducer;