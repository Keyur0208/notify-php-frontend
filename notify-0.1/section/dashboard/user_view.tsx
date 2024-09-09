"use client"
import React from "react";
import { Button, Spinner } from "@nextui-org/react";
import { Heading } from "../../common/heading";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { AppDispatch } from "../../src/store/store";
import { useDispatch } from "react-redux";
import { DownloadPdfNotice, getNoticeGetData } from "../../src/store/notice/noticeslice";
import { getCategoryDate } from "../../src/store/category/categoryslice";
import { debounce } from 'lodash';
import Loader from "../../common/loader";

export default function UserDashboardView() {

    const dispatch: AppDispatch = useDispatch();
    const [loading2, setLoading2] = React.useState(false);

    React.useEffect(() => {
        dispatch(getNoticeGetData())
        dispatch(getCategoryDate())
    }, [dispatch])

    const { noticedata, loading } = useSelector((state: RootState) => state.notice.NoticeGetData);
    const { data } = useSelector((state: RootState) => state.category.CategoryDispalyDate);

    const [selectedCategory, setSelectedCategory] = React.useState<string | null>("All");

    const sortedNoticeData = Array.isArray(noticedata) && noticedata.length > 0
        ? [...noticedata]
            // .filter(item => item.is_hidded === true)
            .sort((a: any, b: any) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            })
        : [];

    const filteredNoticeData = selectedCategory && selectedCategory !== "All"
        ? sortedNoticeData.filter((notice: any) => notice.category_slug === selectedCategory)
        : sortedNoticeData;


    function formatDateString(isoString: string) {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const hasData = Array.isArray(data) && data.length > 0;

    const debouncedDownloadeNotice = debounce(async (dispatch: any, DownloadeValue: string, setLoading2: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            await dispatch(DownloadPdfNotice(DownloadeValue));
        } finally {
            setLoading2(false);
        }
    }, 300);

    const DowlonadPdf = (id: string) => {
        setLoading2(true);
        debouncedDownloadeNotice(dispatch, id, setLoading2);
    };


    return (
        <>

            {loading2 ?
                <Loader />
                : ''}

            <div>
                <Heading title="Recent Notice" />
            </div>

            <div className="flex justify-center items-center flex-wrap gap-2">
                <Button
                    radius="full"
                    className={selectedCategory === "All" ? "text-white" : ""}
                    color={selectedCategory === "All" ? "primary" : "default"}
                    onPress={() => setSelectedCategory("All")}
                >
                    All
                </Button>
                <div className="flex flex-wrap gap-2">
                    <div className="flex flex-wrap gap-2">
                        {hasData ? (
                            data.map((item, index) => (
                                <Button
                                    key={index}
                                    radius="full"
                                    className={selectedCategory === item.category_slug ? "text-white" : ""}
                                    color={selectedCategory === item.category_slug ? "primary" : "default"}
                                    onPress={() => setSelectedCategory(item.category_slug)}
                                >
                                    {item.category_name}
                                </Button>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            {

                Array.isArray(filteredNoticeData) && filteredNoticeData.length > 0
                    ? filteredNoticeData.map((item, index) => (
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
                                        onClick={(key: any) => DowlonadPdf(item._id)}>
                                        Download PDF
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
    );
}

