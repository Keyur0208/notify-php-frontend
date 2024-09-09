import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { enqueueSnackbar } from 'notistack';
import axios from "axios";
import { getToken } from "../../../common/token";

interface iApiResponse {
    loading: boolean,
    noticedata: any,
    error: any
}

interface StateType {
    NoticeData: iApiResponse;
    NoticeGetData: iApiResponse;
    NoticeGetCategoryData: iApiResponse;
    ExperiryNoticeGetData:iApiResponse;
}

const initialState: StateType = {
    NoticeData: {
        loading: false,
        noticedata: {},
        error: null,
    },
    NoticeGetData: {
        loading: false,
        noticedata: {},
        error: null,
    },
    NoticeGetCategoryData:{
        loading: false,
        noticedata: {},
        error: null,
    },
    ExperiryNoticeGetData:{
        loading: false,
        noticedata: {},
        error: null,
    }
};

const NoticeSlice = createSlice({
    name: 'Notice',
    initialState,
    reducers: {
        NoticeLoading: (state) => {
            state.NoticeData.loading = true;
        },
        NoticeSuccess: (state, action) => {
            state.NoticeData.loading = false;
            state.NoticeData.noticedata = action.payload;
        },
        NoticeFailed: (state, action) => {
            state.NoticeData.loading = false;
            state.NoticeData.error = action.payload;
        },
        NoticegetLoading: (state) => {
            state.NoticeGetData.loading = true;
        },
        NoticegetSuccess: (state, action: PayloadAction<any>) => {
            state.NoticeGetData.loading = false;
            state.NoticeGetData.noticedata = action.payload;
        },
        NoticegetFailed: (state, action: PayloadAction<any>) => {
            state.NoticeGetData.loading = false;
            state.NoticeGetData.error = action.payload;
        },
        NoticegetCategoryLoading: (state) => {
            state.NoticeGetCategoryData.loading = true;
        },
        NoticegetCategorySuccess: (state, action: PayloadAction<any>) => {
            state.NoticeGetCategoryData.loading = false;
            state.NoticeGetCategoryData.noticedata = action.payload;
        },
        NoticegetCategoryFailed: (state, action: PayloadAction<any>) => {
            state.NoticeGetCategoryData.loading = false;
            state.NoticeGetCategoryData.error = action.payload;
        },
        ExperiryNoticegetLoading: (state) => {
            state.ExperiryNoticeGetData.loading = true;
        },
        ExperiryNoticegetSuccess: (state, action: PayloadAction<any>) => {
            state.ExperiryNoticeGetData.loading = false;
            state.ExperiryNoticeGetData.noticedata = action.payload;
        },
        ExperiryNoticegetFailed: (state, action: PayloadAction<any>) => {
            state.ExperiryNoticeGetData.loading = false;
            state.ExperiryNoticeGetData.error = action.payload;
        },
    }
});

export const { NoticeLoading, NoticeSuccess, NoticeFailed, NoticegetLoading, NoticegetSuccess, NoticegetFailed,NoticegetCategoryLoading,NoticegetCategorySuccess,NoticegetCategoryFailed,ExperiryNoticegetLoading,ExperiryNoticegetSuccess,ExperiryNoticegetFailed} = NoticeSlice.actions;

export const NoticeAddSlice = (data: any) => async (dispatch: AppDispatch) => {
    dispatch(NoticeLoading());
    try {
        const token = getToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/add`, data, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "multipart/form-data",
                "platform": "web"
            }
        });
        dispatch(NoticeSuccess(response.data));
        enqueueSnackbar("Contact added Succesfully", { variant: 'success' });
    }
    catch (error: any) {
        const errorcontact_desc = error.response?.data?.result;
        dispatch(NoticeFailed(errorcontact_desc.data));
        enqueueSnackbar(errorcontact_desc, { variant: 'error' });
    }
}

export const getNoticeGetData = () => async (dispatch: AppDispatch) => {
    dispatch(NoticegetLoading());
    try {
        const token = getToken();
        const NoticeResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/getAll`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(NoticegetSuccess(NoticeResponse?.data?.data));
    } catch (error: any) {
        dispatch(NoticegetFailed(error.contact_desc));
        enqueueSnackbar("Failed to fetch Noticeget data", { variant: 'error' });
    }
};

export const getNoticeGetDataByCategory = (data: any) => async (dispatch: AppDispatch) => {
    dispatch(NoticegetCategoryLoading());
    try {
        const token = getToken();
        const NoticeResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/admin/get/${data}`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(NoticegetCategorySuccess(NoticeResponse?.data?.data));
    } catch (error: any) {
        dispatch(NoticegetCategoryFailed(error.contact_desc));
        enqueueSnackbar("Failed to fetch Noticeget data", { variant: 'error' });
    }
};

export const EditNotice = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const token = getToken();
        const NoticeResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/edit/${data?._id}`,data,{
            headers: {
                'Authorization': token as string,
                "Content-Type": "multipart/form-data",
                "platform": "web",
            }
        });
        enqueueSnackbar(NoticeResponse.data?.result, { variant: "success" });
    } catch (error: any) {
        enqueueSnackbar(error, { variant: 'error' });
    }
};

export const DeleteNotice = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const token = getToken();
        const NoticeResponse = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/delete/${data}`,{
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web",
            }
        });
        enqueueSnackbar(NoticeResponse.data?.result, { variant: "success" });
    } catch (error: any) {
        enqueueSnackbar(error, { variant: 'error' });
    }
};

export const ViewNotice = (data: any) => async ()=> {
    try {
        const token = getToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/get/pdf/${data}`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web",
            },
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error viewing the PDF', error);
    }
};


export const DownloadPdfNotice = (data: any) => async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/get/pdf/${data}`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web",
            },
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${data}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        enqueueSnackbar("Succefully Dowloand", { variant: "success" });

    } catch (error) {
        console.error('Error downloading the PDF', error);
    }
};


export const ExperiryNoticeGetData = () => async (dispatch: AppDispatch) => {
    dispatch(ExperiryNoticegetLoading());
    try {
        const token = getToken();
        const NoticeResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/expiry/getAll`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(ExperiryNoticegetSuccess(NoticeResponse?.data?.notice));
    } catch (error: any) {
        dispatch(ExperiryNoticegetFailed(error.contact_desc));
        enqueueSnackbar("Failed to fetch Noticeget data", { variant: 'error' });
    }
};


export default NoticeSlice.reducer;
