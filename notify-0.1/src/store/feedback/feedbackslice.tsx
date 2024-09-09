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

interface iFeedbackData {
    feedback_rating: string;
    feedback_category: string[];
    feedback_des: string;
}


interface StateType {
    FeedbackData: iApiResponse;
    FeedbackuserData: iApiResponse;
}

const initialState: StateType = {
    FeedbackData: {
        loading: false,
        data: {},
        error: null,
    },
    FeedbackuserData: {
        loading: false,
        data: {},
        error: null,
    }
};

const FeedbackSlice = createSlice({
    name: 'Feedback',
    initialState,
    reducers: {
        FeedbackLoading: (state) => {
            state.FeedbackData.loading = true;
        },
        FeedbackSuccess: (state, action) => {
            state.FeedbackData.loading = false;
            state.FeedbackData.data = action.payload;
        },
        FeedbackFailed: (state, action) => {
            state.FeedbackData.loading = false;
            state.FeedbackData.error = action.payload;
        },
        FeedbackuserLoading: (state) => {
            state.FeedbackuserData.loading = true;
        },
        FeedbackuserSuccess: (state, action: PayloadAction<any>) => {
            state.FeedbackuserData.loading = false;
            state.FeedbackuserData.data = action.payload;
        },
        FeedbackuserFailed: (state, action: PayloadAction<any>) => {
            state.FeedbackuserData.loading = false;
            state.FeedbackuserData.error = action.payload;
        },
    }
});

export const { FeedbackLoading, FeedbackSuccess, FeedbackFailed, FeedbackuserLoading, FeedbackuserSuccess, FeedbackuserFailed, } = FeedbackSlice.actions;

export const FeedbackAdd = (data: iFeedbackData) => async (dispatch: AppDispatch) => {
    dispatch(FeedbackLoading());
    try {
        const token = getToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/add`, data, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(FeedbackSuccess(response.data));
        enqueueSnackbar("Contact added Succesfully", { variant: 'success' });
    }
    catch (error: any) {
        const errorcontact_desc = error.response?.data.result;
        dispatch(FeedbackFailed(errorcontact_desc.data));
        enqueueSnackbar(errorcontact_desc, { variant: 'error' });
    }
}

export const getFeedbackuserData = () => async (dispatch: AppDispatch) => {
    dispatch(FeedbackuserLoading());
    try {
        const token = getToken();
        const FeedbackResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/get`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(FeedbackuserSuccess(FeedbackResponse?.data?.feedback));
    } catch (error: any) {
        dispatch(FeedbackuserFailed(error.contact_desc));
        enqueueSnackbar("Failed to fetch Feedbackuser data", { variant: 'error' });
    }
};


export default FeedbackSlice.reducer;


