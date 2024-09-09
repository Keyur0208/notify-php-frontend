"use client"
import React from "react";
import { Pagination, Button, } from "@nextui-org/react";
import { Heading } from "../../common/heading";
import { AppDispatch } from "../../src/store/store";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { useDispatch } from "react-redux";
import { ExperiryNoticeGetData, ViewNotice, DeleteNotice, EditNotice } from "../../src/store/notice/noticeslice";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ThreedotIocn } from "../../style/icon/categoryicon";
import { FormatDateString } from "../../componets/date";
import { debounce } from 'lodash';
import Loader from "../../common/loader";

export function AdminexpiryPage() {

    const dispatch: AppDispatch = useDispatch();
    const [loading2, setLoading2] = React.useState(false);
    const { noticedata, loading } = useSelector((state: RootState) => state.notice.ExperiryNoticeGetData);
    const experiryData = noticedata && Array.isArray(noticedata) && noticedata.length > 0 ? noticedata : [];

    React.useEffect(() => {
        dispatch(ExperiryNoticeGetData())
    }, [dispatch])

    const ITEMS_PER_PAGE = 5;

    const [currentPage, setCurrentPage] = React.useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentNotices = experiryData.slice(startIndex, endIndex);

    const debouncedViewNotice = debounce(async (dispatch: any, ViewValue: string, setLoading2: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            await dispatch(ViewNotice(ViewValue));
        } finally {
            setLoading2(false);
        }
    }, 300);


    const debouncedDeleteNotice = debounce((dispatch, DeleteValue) => {
        dispatch(DeleteNotice(DeleteValue));
        dispatch(ExperiryNoticeGetData());
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const ViewBtn = (id: string) => {
        setLoading2(true);
        debouncedViewNotice(dispatch, id, setLoading2);
    };

    const DeleteBtn = (id: string) => {
        const DeleteValue = id;
        debouncedDeleteNotice(dispatch, DeleteValue);
    }

    return (
        <>
            {loading2 ?
                <Loader />
                : ''}

            <div>
                <Heading title="Experiy Notice" />
            </div>
            {currentNotices.map((item, index) => (
                <div key={index} className="my-3">
                    <div className="flex justify-between items-center bg-bg-blue-dashboard rounded-xl p-5 cursor-pointer hover:shadow-lg duration-300">
                        <div>
                            <h1 className="font-semibold text-lg">{item.notice_title}</h1>
                            <p className="font-light text-xs">{item.notice_des}</p>
                            <p className="font-light text-xs">{FormatDateString(item.updated_at)}</p>
                        </div>
                        <Dropdown
                            size="sm"
                            className="min-w-32 w-fit"
                        >
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    radius="full"
                                    size="sm"
                                >
                                    <ThreedotIocn />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Categorical Action"
                            >
                                <DropdownItem
                                    key="view"
                                    onAction={(key: any) => ViewBtn(item._id)}
                                >
                                    View
                                </DropdownItem>

                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    onAction={(key: any) => DeleteBtn(item._id)}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            ))}
            <div className="flex justify-center my-5">
                <Pagination
                    total={Math.ceil(experiryData.length / ITEMS_PER_PAGE)}
                    initialPage={1}
                    onChange={handlePageChange}
                    page={currentPage}
                    className=" text-white"
                />
            </div>
        </>
    )
}