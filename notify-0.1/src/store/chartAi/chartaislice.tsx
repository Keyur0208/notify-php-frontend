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

interface iChartAiData {
    message: string;
}

interface StateType {
    ChartAiData: iApiResponse;
}

const initialState: StateType = {
    ChartAiData: {
        loading: false,
        data: {},
        error: null,
    },
};

const ChartAiSlice = createSlice({
    name: 'chartai',
    initialState,
    reducers: {
        ChartAiLoading: (state) => {
            state.ChartAiData.loading = true;
        },
        ChartAiSuccess: (state, action) => {
            state.ChartAiData.loading = false;
            state.ChartAiData.data = action.payload;
        },
        ChartAiFailed: (state, action) => {
            state.ChartAiData.loading = false;
            state.ChartAiData.error = action.payload;
        },
    }
});

export const { ChartAiLoading, ChartAiSuccess, ChartAiFailed, } = ChartAiSlice.actions;

export const ChartAiAdd = (data: iChartAiData) => async (dispatch: AppDispatch) => {
    dispatch(ChartAiLoading());
    try {
        const token = getToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chartai/generate-content`, data, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });   
        dispatch(ChartAiSuccess(response.data?.response?.candidates[0]?.content?.parts[0]?.text));
    }
    catch (error: any) {
        const errorcontact_desc = error.response?.data.result;
        dispatch(ChartAiFailed(errorcontact_desc.data));
        enqueueSnackbar(errorcontact_desc, { variant: 'error' });
    }
}


export default ChartAiSlice.reducer;


