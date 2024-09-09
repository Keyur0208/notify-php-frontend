"use client"
import { Heading } from "../../../../common/heading";
import { Pagination, Button, Skeleton, Spinner } from "@nextui-org/react";
import { AddNotice } from "../../../../componets/notice/add";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../src/store/store";
import { RootState } from "../../../../src/store/store";
import React from "react";
import { DeleteNotice, EditNotice, getNoticeGetDataByCategory, DownloadPdfNotice, ViewNotice } from "../../../../src/store/notice/noticeslice";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { FormatDateString } from "../../../../componets/date";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ThreedotIocn } from "../../../../style/icon/categoryicon";
import { debounce } from 'lodash';
import Loader from "../../../../common/loader";
import { ModalHeader, ModalBody, ModalFooter, } from '@nextui-org/modal';
import UpdateNoticeform from "../../../../componets/notice/update";

interface FormValues {
    formData: FormData;
}

export default function CategoryName({ params }: { params: { id: string } }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
    const dispatch: AppDispatch = useDispatch();
    const [loading2, setLoading2] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentPageHidden, setCurrentPageHidden] = React.useState(1);
    const itemsPerPage = 4;
    const { noticedata, loading } = useSelector((state: RootState) => state.notice.NoticeGetCategoryData);
    const { data } = useSelector((state: RootState) => state.category.CategoryDispalyDate);

    React.useEffect(() => {
        dispatch(getNoticeGetDataByCategory(params.id))
    }, [dispatch])

    const CategoryData = data && Array.isArray(data) && data.length > 0
        ? [...data]
            .filter(item => item.category_slug === params.id)
        : [];

    const CategoryDataName = CategoryData.length > 0 ? CategoryData[0]?.category_name : "";

    // Pagination Logic

    const NoticeCategorydata = noticedata && Array.isArray(noticedata) && noticedata.length > 0
        ? [...noticedata]
            .filter(item => item.is_hidded === 0)
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = NoticeCategorydata.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(NoticeCategorydata.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Pagination Logic for Hidden Categories

    const NoticeDataHidden = noticedata && Array.isArray(noticedata) && noticedata.length > 0
        ? [...noticedata]
            .filter(item => item.is_hidded === 1)
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        : [];

    const indexOfLastItemHidden = currentPageHidden * itemsPerPage;
    const indexOfFirstItemHidden = indexOfLastItemHidden - itemsPerPage;
    const currentItemsHidden = NoticeDataHidden.slice(indexOfFirstItemHidden, indexOfLastItemHidden);

    const totalPagesHidden = Math.ceil(NoticeDataHidden.length / itemsPerPage);

    const handlePageChangeHidden = (page: number) => {
        setCurrentPageHidden(page);
    };

    const debouncedEditNotice = debounce((dispatch, updatedValues) => {
        dispatch(EditNotice(updatedValues));
        dispatch(getNoticeGetDataByCategory(params.id));
    });

    const debouncedDeleteNotice = debounce((dispatch, DeleteValue) => {
        dispatch(DeleteNotice(DeleteValue));
        dispatch(getNoticeGetDataByCategory(params.id));
    });

    const debouncedDownloadeNotice = debounce(async (dispatch: any, DownloadeValue: string, setLoading2: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            await dispatch(DownloadPdfNotice(DownloadeValue));
        } finally {
            setLoading2(false);
        }
    }, 300);

    const debouncedViewNotice = debounce(async (dispatch: any, ViewValue: string, setLoading2: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            await dispatch(ViewNotice(ViewValue));
        } finally {
            setLoading2(false);
        }
    }, 300);

    const Hiddenbtn = (id: string) => {
        const updatedValues = {
            _id: id,
            is_hidded: true,
        };
        debouncedEditNotice(dispatch, updatedValues);
    }

    const UnHiddenbtn = (id: string) => {
        const updatedValues = {
            _id: id,
            is_hidded: false,
        };
        debouncedEditNotice(dispatch, updatedValues);
    }

    const DeleteBtn = (id: string) => {
        const DeleteValue = id;
        debouncedDeleteNotice(dispatch, DeleteValue);
    }

    const DownloadBtn = (id: string) => {
        setLoading2(true);
        debouncedDownloadeNotice(dispatch, id, setLoading2);
    };

    const ViewBtn = (id: string) => {
        setLoading2(true);
        debouncedViewNotice(dispatch, id, setLoading2);
    };

    // Update Button //

    const handleFormSubmit = (formData: FormData) => {
        const values = {
            notice_title: formData.get('notice_title') as string,
            notice_des: formData.get('notice_des') as string,
            department: formData.getAll('department[]') as string[],
            roles: formData.getAll('roles[]') as string[],
            expiry_date: formData.get('expiry_date') as string,
        };

        if (selectedCategory) {
            dispatch(EditNotice({ ...selectedCategory, ...values }));
            dispatch(getNoticeGetDataByCategory(params.id));
        } else {
            dispatch(EditNotice(values));
        }
        dispatch(getNoticeGetDataByCategory(params.id));
        onOpenChange();
    };


    const handleUpdateClick = (category: any) => {
        onOpen();
        setSelectedCategory(category);
    };


    return (
        <>
            {loading2 ?
                <Loader />
                : ''}

            <div className="flex items-center justify-between">
                <Heading title={`${CategoryDataName} Category`} />
                <AddNotice categoryId={params.id} categoryname={CategoryDataName} />
            </div>

            {/* UnHidden Notice Data */}

            <Heading title="Notice List" />
            <div className="container mx-auto mt-5">
                <div className="grid grid-cols-2 border-b-2 py-4 rounded-lg font-semibold text-sm bg-[#f4f6f8] px-4">
                    <div>Notice Name</div>
                    <div className="text-right">Modified</div>
                </div>
                <div className="my-3">
                    {
                        loading ?
                            (
                                <>
                                    {[...Array(4)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-2 items-center justify-between p-2 lg:p-4 border rounded-lg cursor-pointer hover:shadow-md duration-300 mb-4"
                                        >
                                            <div className="flex">
                                                <Skeleton className="flex rounded-lg w-8 h-8 mr-2" />
                                                <Skeleton className="p-2 rounded-lg w-28 h-8" />
                                            </div>
                                            <div className="flex justify-end items-center gap-2 md:gap-5">
                                                <div>
                                                    <Skeleton className="p-2 rounded-lg w-28 h-5 mb-2" />
                                                    <Skeleton className="p-2 rounded-lg w-20 h-5" />
                                                </div>
                                                <Skeleton className="p-2 rounded-lg w-2 h-8" />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) :
                            currentItems && Array.isArray(currentItems) && currentItems.length > 0 ?
                                (
                                    currentItems.map((noticeItem, noticeIndex) => (
                                        <div className="flex justify-between items-center bg-bg-blue-dashboard rounded-xl px-4 my-3 py-3 cursor-pointer hover:shadow-lg duration-300" key={noticeIndex}>
                                            <div>
                                                <h1 className="font-semibold text-lg">{noticeItem.notice_title}</h1>
                                                <p className="font-light text-xs">{noticeItem.notice_des}</p>
                                                <p className="font-light text-xs">{FormatDateString(noticeItem.updated_at)}</p>
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
                                                        onAction={() => ViewBtn(noticeItem._id)}
                                                    >
                                                        View
                                                    </DropdownItem>

                                                    <DropdownItem
                                                        key="edit"
                                                        onAction={() => handleUpdateClick(noticeItem)}
                                                    >
                                                        Edit
                                                    </DropdownItem>

                                                    <DropdownItem
                                                        key="download"
                                                        onAction={(key: any) => DownloadBtn(noticeItem._id)}
                                                    >
                                                        Download
                                                    </DropdownItem>


                                                    <DropdownItem
                                                        key="hidden"
                                                        onAction={(key: any) => Hiddenbtn(noticeItem._id)}
                                                    >
                                                        Hidden
                                                    </DropdownItem>


                                                    <DropdownItem
                                                        key="delete"
                                                        className="text-danger"
                                                        color="danger"
                                                        onAction={(key: any) => DeleteBtn(noticeItem._id)}
                                                    >
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    ))
                                ) :
                                (
                                    <div className="text-center text-gray-500">No Data</div>
                                )
                    }

                </div>
                <div className="flex justify-center mt-5 h-[100vh-6rem]">
                    <Pagination
                        className="text-white"
                        showControls
                        total={totalPages}
                        initialPage={1}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Hidden  Data */}

            <div className="flex items-center justify-between">
                <Heading title="Hidden Notice List" />
            </div>
            <div className="container mx-auto mt-5">
                <div className="grid grid-cols-2 border-b-2 py-4 rounded-lg font-semibold text-sm bg-[#f4f6f8] px-4">
                    <div>Notice Name</div>
                    <div className="text-right">Modified</div>
                </div>
                <div className="my-3">
                    {
                        loading ?
                            (
                                <>
                                    {[...Array(4)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-2 items-center justify-between p-2 lg:p-4 border rounded-lg cursor-pointer hover:shadow-md duration-300 mb-4"
                                        >
                                            <div className="flex">
                                                <Skeleton className="flex rounded-lg w-8 h-8 mr-2" />
                                                <Skeleton className="p-2 rounded-lg w-28 h-8" />
                                            </div>
                                            <div className="flex justify-end items-center gap-2 md:gap-5">
                                                <div>
                                                    <Skeleton className="p-2 rounded-lg w-28 h-5 mb-2" />
                                                    <Skeleton className="p-2 rounded-lg w-20 h-5" />
                                                </div>
                                                <Skeleton className="p-2 rounded-lg w-2 h-8" />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) :
                            currentItemsHidden && Array.isArray(currentItemsHidden) && currentItemsHidden.length > 0 ?
                                (
                                    currentItemsHidden.map((noticeItem, noticeIndex) => (
                                        <div className="flex justify-between items-center bg-bg-blue-dashboard rounded-xl px-4 my-3 py-3 cursor-pointer hover:shadow-lg duration-300" key={noticeIndex}>
                                            <div>
                                                <h1 className="font-semibold text-lg">{noticeItem.notice_title}</h1>
                                                <p className="font-light text-xs">{noticeItem.notice_des}</p>
                                                <p className="font-light text-xs">{FormatDateString(noticeItem.updated_at)}</p>
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
                                                        key="hidden"
                                                        onAction={(key: any) => UnHiddenbtn(noticeItem._id)}
                                                    >
                                                        UnHidden
                                                    </DropdownItem>


                                                    <DropdownItem
                                                        key="delete"
                                                        className="text-danger"
                                                        color="danger"
                                                        onAction={(key: any) => DeleteBtn(noticeItem._id)}
                                                    >
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    ))
                                ) :
                                (
                                    <div className="text-center text-gray-500">No Data</div>
                                )
                    }

                </div>
                <div className="flex justify-center mt-5 h-[100vh-6rem]">
                    <Pagination
                        className="text-white"
                        showControls
                        total={totalPagesHidden}
                        initialPage={1}
                        page={currentPageHidden}
                        onChange={handlePageChangeHidden}
                    />
                </div>
            </div>

            {/* // Update Model */}

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="opaque"
                size="3xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <Heading title={selectedCategory ? "Edit Category" : "Add New Category"} />
                            </ModalHeader>
                            <ModalBody>
                                {selectedCategory && (
                                    <UpdateNoticeform
                                        currentNotice={selectedCategory}
                                        onSubmit={handleFormSubmit}
                                        onClose={() => {
                                            setSelectedCategory(null);
                                            onOpenChange();
                                        }}
                                    />
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}