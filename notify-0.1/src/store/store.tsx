import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/Authslice";
import emailReducer from "./auth/Emailslice";
import ContactUsReducer from "./contactus/contausctslice";
import CategoryReducer from "./category/categoryslice";
import FeedbackReducer from "./feedback/feedbackslice";
import NoticeReducer from "./notice/noticeslice";
import ChartaiReducer from "./chartAi/chartaislice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        emailCheck:emailReducer,
        category:CategoryReducer,
        contactUs:ContactUsReducer,
        feedback:FeedbackReducer,
        notice:NoticeReducer,
        chartai:ChartaiReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;