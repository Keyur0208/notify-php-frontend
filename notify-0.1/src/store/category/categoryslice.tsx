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

interface iCategoryDate {
    category_name: string;
    department: string[];
    roles: string[];
}

interface StateType {
    CategoryDate: iApiResponse;
    CategoryDispalyDate: iApiResponse;
}

const initialState: StateType = {
    CategoryDate: {
        loading: false,
        data: {},
        error: null,
    },
    CategoryDispalyDate: {
        loading: false,
        data: {},
        error: null,
    }
};

const CategorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        CategoryLoading: (state) => {
            state.CategoryDate.loading = true;
        },
        CategorySuccess: (state, action) => {
            state.CategoryDate.loading = false;
            state.CategoryDate.data = action.payload;
        },
        CategoryFailed: (state, action) => {
            state.CategoryDate.loading = false;
            state.CategoryDate.error = action.payload;
        },
        CategoryDisplayLoading: (state) => {
            state.CategoryDispalyDate.loading = true;
        },
        CategoryDisplaySuccess: (state, action: PayloadAction<any>) => {
            state.CategoryDispalyDate.loading = false;
            state.CategoryDispalyDate.data = action.payload;
        },
        CategoryDisplayFailed: (state, action: PayloadAction<any>) => {
            state.CategoryDispalyDate.loading = false;
            state.CategoryDispalyDate.error = action.payload;
        },
    }
});

export const { CategoryLoading, CategorySuccess, CategoryFailed, CategoryDisplayLoading, CategoryDisplaySuccess, CategoryDisplayFailed, } = CategorySlice.actions;

export const CategoryAdd = (data: iCategoryDate) => async (dispatch: AppDispatch) => {
    dispatch(CategoryLoading());
    try {
        const token = getToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/category/add`, data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': token as string,
                "platform": "web"
            }
        });
        dispatch(CategorySuccess(response.data));
        enqueueSnackbar("Contact added Succesfully", { variant: 'success' });
    }
    catch (error: any) {
        const errorcontact_desc = error.response?.data.message;
        dispatch(CategoryFailed(errorcontact_desc.data));
        enqueueSnackbar(errorcontact_desc, { variant: 'error' });
    }
}

export const getCategoryDate = () => async (dispatch: AppDispatch) => {
    dispatch(CategoryDisplayLoading());
    try {
        const token = getToken();
        const CategoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/get`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web"
            }
        });
        dispatch(CategoryDisplaySuccess(CategoryResponse.data?.data));
    } catch (error: any) {
        dispatch(CategoryDisplayFailed(error.contact_desc));
        enqueueSnackbar("Failed to fetch CategoryDisplay data", { variant: 'error' });
    }
};

export const EditCategory = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const token = getToken();
        const CategoryResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/category/edit/${data?.id}`, data, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web",
            }
        });
        enqueueSnackbar(CategoryResponse.data?.message, { variant: "success" });
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            enqueueSnackbar(error.response.data?.message || 'Category name already exists.', { variant: 'error' });
        } else {
            enqueueSnackbar(error.response?.data?.message || 'An error occurred while updating the category.', { variant: 'error' });
        }
    }
};

export const DeleteCategory = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const token = getToken();
        const CategoryResponse = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/category/delete/${data}`, {
            headers: {
                'Authorization': token as string,
                "Content-Type": "application/json",
                "platform": "web",
            }
        });
        enqueueSnackbar(CategoryResponse.data?.message, { variant: "success" });
    } catch (error: any) {
        enqueueSnackbar(error, { variant: 'error' });
    }
};



export default CategorySlice.reducer;



