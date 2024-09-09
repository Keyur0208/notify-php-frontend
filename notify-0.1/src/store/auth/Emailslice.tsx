import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";

interface EmailCheckState {
    loading: boolean;
    emailExists: boolean;
    error: string | null;
}

const initialState: EmailCheckState = {
    loading: false,
    emailExists: false,
    error: null,
};

const emailSlice = createSlice({
    name: 'emailCheck',
    initialState,
    reducers: {
        emailCheckLoading: (state) => {
            state.loading = true;
            state.emailExists = false;
            state.error = null;
        },
        emailCheckSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.emailExists = action.payload;
        },
        emailCheckFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { emailCheckLoading, emailCheckSuccess, emailCheckFailed } = emailSlice.actions;

export const checkEmail = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(emailCheckLoading());
    try 
    {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check_email`, { email });
        const emailExists = response.data.emailExists;
        dispatch(emailCheckSuccess(emailExists));
    } 
    catch (error: any) 
    {
        dispatch(emailCheckFailed(error.response?.data.result|| error.message));
        throw error; 
    }

};

export default emailSlice.reducer;
