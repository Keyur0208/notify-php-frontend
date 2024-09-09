"use client"
import React from "react";
import { Pagination, Button, } from "@nextui-org/react";
import { Heading } from "../../common/heading";
import { AppDispatch } from "../../src/store/store";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { useDispatch } from "react-redux";
import { ExperiryNoticeGetData } from "../../src/store/notice/noticeslice";
import Loader from "../../common/loader";
import { DownloadPdfNotice } from "../../src/store/notice/noticeslice";
import { debounce } from 'lodash';

export function UserexpiryPage() {

    const dispatch: AppDispatch = useDispatch();
    const [loading2, setLoading2] = React.useState(false);

    const { noticedata, loading } = useSelector((state: RootState) => state.notice.ExperiryNoticeGetData);

    React.useEffect(() => {
        dispatch(ExperiryNoticeGetData())
    }, [dispatch])


    function formatDateString(isoString: string) {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }
    
    const debouncedDownloadeNotice = debounce(async (dispatch: any, DownloadeValue: string, setLoading2: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            await dispatch(DownloadPdfNotice(DownloadeValue));
        } finally {
            setLoading2(false);
        }
    }, 300);


    const DownloadBtn = (id: string) => {
        setLoading2(true);
        debouncedDownloadeNotice(dispatch, id, setLoading2);
    };


    return (
        <>
            {loading2 ?
                <Loader />
                : ''}

            <div>
                <Heading title="Experiy Notice" />
            </div>
            {
                noticedata && Array.isArray(noticedata) && noticedata.length > 0 ? noticedata.map((item, index) => (
                    <div key={index} className="my-3">
                        <div className="flex justify-between items-center bg-bg-blue-dashboard rounded-xl p-5 cursor-pointer hover:shadow-lg duration-300">
                            <div>
                                <h1 className="font-semibold text-lg">{item.notice_title}</h1>
                                <p className="font-light text-xs">{item.notice_des}</p>
                                <p className="font-light text-xs">{formatDateString(item.updated_at)}</p>
                            </div>
                            <div className="space-x-4">
                                <Button 
                                color="secondary" 
                                variant="bordered"
                                onClick={(key: any) => DownloadBtn(item._id)}
                                >
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                )) :
                    (
                        <div className="flex justify-center h-full">
                            <h1 className="text-gray-500 mt-52">No Data</h1>
                        </div>
                    )
            }
        </>
    )
}


