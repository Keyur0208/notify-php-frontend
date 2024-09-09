import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { enqueueSnackbar } from 'notistack';
import axios from "axios";
import { getToken, setToken } from "../../../common/token";

interface iApiResponse {
    loading: boolean,
    data: any,
    error: any
}

interface iLoginData {
    roles: string,
    sid?: string,
    email?: string,
    password: string,
    secret_key?: string;
}

interface iRegisterData {
    roles: string;
    first_name: string;
    last_name: string;
    dob: string | null;
    department: string;
    email: string;
    password: string;
    secret_key?: string;
}


interface iSecretKeyData {
    secret_key: string,
}

interface StateType {
    RegisterData: iApiResponse;
    loginData: iApiResponse;
    userData: iApiResponse;
    userAlldata: iApiResponse;
}

const initialState: StateType = {
    RegisterData: {
        loading: false,
        data: {},
        error: null,
    },
    loginData: {
        loading: false,
        data: {},
        error: null,
    },
    userData: {
        loading: false,
        data: {},
        error: null,
    },
    userAlldata: {
        loading: false,
        data: {},
        error: null,
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        RegisterLoading: (state) => {
            state.RegisterData.loading = true;
        },
        RegisterSuccess: (state, action) => {
            state.RegisterData.loading = false;
            state.RegisterData.data = action.payload;
        },
        RegisterFailed: (state, action) => {
            state.RegisterData.loading = false;
            state.RegisterData.error = action.payload;
        },
        loginLoading: (state) => {
            state.loginData.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loginData.loading = false;
            state.loginData.data = action.payload;
        },
        loginFailed: (state, action) => {
            state.loginData.loading = false;
            state.loginData.error = action.payload;
        },
        userLoading: (state) => {
            state.userData.loading = true;
        },
        userSuccess: (state, action: PayloadAction<any>) => {
            state.userData.loading = false;
            state.userData.data = action.payload;
        },
        userFailed: (state, action: PayloadAction<any>) => {
            state.userData.loading = false;
            state.userData.error = action.payload;
        },
        userAlldataLoading: (state) => {
            state.userAlldata.loading = true;
        },
        userAlldataSuccess: (state, action: PayloadAction<any>) => {
            state.userAlldata.loading = false;
            state.userAlldata.data = action.payload;
        },
        userAlldataFailed: (state, action: PayloadAction<any>) => {
            state.userAlldata.loading = false;
            state.userAlldata.error = action.payload;
        },
    }
});

export const { RegisterLoading, RegisterSuccess, RegisterFailed, loginLoading, loginSuccess, loginFailed, userLoading, userSuccess, userFailed, userAlldataLoading, userAlldataSuccess, userAlldataFailed } = authSlice.actions;

export const Register = (data: iRegisterData) => async (dispatch: AppDispatch) => {
    dispatch(RegisterLoading());
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, data, {
            headers: {
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        const token = response.data.token;
        setToken(token)
        await dispatch(getUserData(token));
        dispatch(RegisterSuccess(response.data?.message));
        enqueueSnackbar("Successfully Created", { variant: 'success' });
    }
    catch (error: any) {
        const errorMessage = error.response?.data;
        dispatch(RegisterFailed(errorMessage));
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}

export const login = (data: iLoginData) => async (dispatch: AppDispatch) => {

    dispatch(loginLoading());
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, data);
        dispatch(loginSuccess(response.data));
        const token = response.data.token;
        setToken(token)
        await dispatch(getUserData(token));
        enqueueSnackbar("Successfully Login", { variant: 'success' });

    } catch (error: any) {
        const errorMessage = error.response?.data?.message;
        dispatch(loginFailed(errorMessage));
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
};

export const getUserData = (token: string) => async (dispatch: AppDispatch) => {
    dispatch(userLoading());
    try {
        const profileResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/get`, {
            headers: {
                'Authorization': token as string,
            }
        });
        dispatch(userSuccess(profileResponse.data?.data));
    } catch (error: any) {
        dispatch(userFailed(error.message));
        // enqueueSnackbar("Failed to fetch user data", { variant: 'error' });
    }
};

export const getuserAllData = () => async (dispatch: AppDispatch) => {
    dispatch(userAlldataLoading());
    try {
        const token = getToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getAll`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': token as string,
                "platform": "web",
                "app-user": "admin"
            }
        });
        dispatch(userAlldataSuccess(response?.data?.data));
    }
    catch (error: any) {
        const errorMessage = error.response?.data?.result;
        dispatch(userAlldataFailed(errorMessage));
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}

export const UpdateUserData = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const token = getToken();
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/get/edit/${data?.id}`, data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': token as string,
                "platform": "web",
                "app-user": "admin"
            }
        });
        enqueueSnackbar(response.data?.result, { variant: "success" });
        return response;

    } catch (error: any) {
        const errorMessage = error.response?.data?.result;
        enqueueSnackbar(errorMessage, { variant: 'error' });

    }
};

export const deleteUserData = (data: any) => async () => {
    try {
        const token = getToken();
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/get/delete/${data}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': token as string,
                "platform": "web",
                "app-user": "admin"
            }
        })
        enqueueSnackbar(response.data?.message, { variant: "success" });
        return response;
    } catch (error: any) {
        // const errorMessage = error.response?.data;
        // enqueueSnackbar(errorMessage, { variant: 'error' });
    }
};

export const UpdateProfile = (data: FormData) => async (dispatch: AppDispatch) => {
    try {
        const token = getToken();
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile/edit`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token as string,
                'platform': 'web',
            }
        });
        enqueueSnackbar(response.data?.message, { variant: "success" });

        return response;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}


export const UpdateSecretkey = (data:iSecretKeyData) => async (dispatch: AppDispatch) => {
    try {
        const token = getToken();
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/secreatKey/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token as string,
                'platform': 'web',
            }
        });
        enqueueSnackbar(response.data?.message, { variant: "success" });

        return response;
    } catch (error: any) {
        const errorMessage = error.response?.data?.result;
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}


export default authSlice.reducer;


