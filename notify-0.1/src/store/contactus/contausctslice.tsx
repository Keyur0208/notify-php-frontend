import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { enqueueSnackbar } from 'notistack';
import axios from "axios";
import { getToken } from "../../../common/token";

interface iApiResponse {
    loading: boolean,
    data: any,
    error: any
}

interface iContactUsData {
    fullname: string;
    email: string;
    des: string;
}


interface StateType {
    ContactUsData: iApiResponse;
    ContactuserData: iApiResponse;
}

const initialState: StateType = {
    ContactUsData: {
        loading: false,
        data: {},
        error: null,
    },
    ContactuserData: {
        loading: false,
        data: {},
        error: null,
    }
};

const ContactUsSlice = createSlice({
    name: 'ContactUs',
    initialState,
    reducers: {
        ContactUsLoading: (state) => {
            state.ContactUsData.loading = true;
        },
        ContactUsSuccess: (state, action) => {
            state.ContactUsData.loading = false;
            state.ContactUsData.data = action.payload;
        },
        ContactUsFailed: (state, action) => {
            state.ContactUsData.loading = false;
            state.ContactUsData.error = action.payload;
        },
        ContactuserLoading: (state) => {
            state.ContactuserData.loading = true;
        },
        ContactuserSuccess: (state, action: PayloadAction<any>) => {
            state.ContactuserData.loading = false;
            state.ContactuserData.data = action.payload;
        },
        ContactuserFailed: (state, action: PayloadAction<any>) => {
            state.ContactuserData.loading = false;
            state.ContactuserData.error = action.payload;
        },
    }
});

export const { ContactUsLoading, ContactUsSuccess, ContactUsFailed, ContactuserLoading, ContactuserSuccess, ContactuserFailed, } = ContactUsSlice.actions;

export const ContactUsAdd = (data: iContactUsData) => async (dispatch: AppDispatch) => {
    dispatch(ContactUsLoading());
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contactus/add`, data, {
            headers: {
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(ContactUsSuccess(response.data));
        enqueueSnackbar("Contact added Succesfully", { variant: 'success' });
    }
    catch (error: any) {
        const errorcontact_desc = error.response?.data.result;
        dispatch(ContactUsFailed(errorcontact_desc.data));
        enqueueSnackbar(errorcontact_desc, { variant: 'error' });
    }
}

export const getContactUsContactuserData = () => async (dispatch: AppDispatch) => {
    dispatch(ContactuserLoading());
    try {
        const token = getToken();
        const ContactUsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contactus/get`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(ContactuserSuccess(ContactUsResponse.data?.data));
    } catch (error: any) {
        dispatch(ContactuserFailed(error.contact_desc));
        enqueueSnackbar("Failed to fetch Contactuser data", { variant: 'error' });
    }
};


export default ContactUsSlice.reducer;


