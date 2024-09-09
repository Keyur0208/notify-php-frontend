"use client"
import { Metadata } from "next";
import { Heading } from "../../common/heading";
import { AddCategory } from "../../componets/category/add";
import { FolderIcon } from "../../style/icon/foldericon";
import { ThreedotIocn } from "../../style/icon/categoryicon";
import { AppDispatch } from "../../src/store/store";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { getCategoryDate, EditCategory, DeleteCategory } from "../../src/store/category/categoryslice";
import { RootState } from "../../src/store/store";
import { useSelector } from "react-redux";
import { Pagination, } from "@nextui-org/react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import { debounce } from 'lodash';
import { FormatTimeString, FormatDateString } from "../../componets/date";
import { useRouter } from "next/navigation";
import { ModalHeader, ModalBody, ModalFooter, } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import CategoryForm from "../../componets/category/update";

interface CategoryItem {
    id: string;
    category_name: string;
    roles: string;
    department:string;
}


export default function AdminCategory() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch: AppDispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageHidden, setCurrentPageHidden] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const router = useRouter();

    const itemsPerPage = 4;

    React.useEffect(() => {
        dispatch(getCategoryDate());
    }, []);

    const { data, loading } = useSelector((state: RootState) => state.category.CategoryDispalyDate);

    // Pagination Logic

    const CategorData = data && Array.isArray(data) && data.length > 0
        ? [...data]
            .filter(item => item.is_hidded === 0)
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = CategorData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(CategorData.length / itemsPerPage);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    // Pagination Logic for Hidden Categories

    const CategorDataHidden = data && Array.isArray(data) && data.length > 0
        ? [...data]
            .filter(item => item.is_hidded === 1)
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        : [];
    const indexOfLastItemHidden = currentPageHidden * itemsPerPage;
    const indexOfFirstItemHidden = indexOfLastItemHidden - itemsPerPage;
    const currentItemsHidden = CategorDataHidden.slice(indexOfFirstItemHidden, indexOfLastItemHidden);
    const totalPagesHidden = Math.ceil(CategorDataHidden.length / itemsPerPage);
    const handlePageChangeHidden = (page: number) => {
        setCurrentPageHidden(page);
    };

    // Button Click Events

    const debouncedEditCategory = debounce((dispatch, updatedValues) => {
        dispatch(EditCategory(updatedValues));
        dispatch(getCategoryDate());
    });

    const Hiddenbtn = (categoryItem:CategoryItem) => {
        const updatedValues = {
            id: categoryItem.id,
            category_name:categoryItem.category_name,
            roles:categoryItem.roles.split(',').map((role):any => role.trim()),
            is_hidded: true,
            department:categoryItem.department.split(',').map((dep):any => dep.trim())
        };
        debouncedEditCategory(dispatch, updatedValues);
    };

    const UnHiddenbtn = (categoryItem:CategoryItem) => {
        const updatedValues = {
            id: categoryItem.id,
            category_name:categoryItem.category_name,
            roles:categoryItem.roles.split(',').map((role):any => role.trim()),
            is_hidded: false,
            department:categoryItem.department.split(',').map((dep):any => dep.trim())
        };
        debouncedEditCategory(dispatch, updatedValues);
    };

    const debouncedDeleteCategory = debounce((dispatch, deleteValues) => {
        dispatch(DeleteCategory(deleteValues));
        dispatch(getCategoryDate());
    });

    const DeleteBtn = (id: string) => {
        const deleteValues = id;
        debouncedDeleteCategory(dispatch, deleteValues);
    };


    // Update Button //

    const handleFormSubmit = (values: { category_name: string, roles: string[], department: string[] }) => {
        if (selectedCategory) {
            dispatch(EditCategory({ ...selectedCategory, ...values }));
        } else {
            dispatch(EditCategory(values));
        }
        dispatch(getCategoryDate());
        onOpenChange();
    };

    const handleUpdateClick = (category: any) => {
        onOpen();
        setSelectedCategory(category);
    };

    return (
        <>
            {/* UnHiddenbtn Category Data */}

            <div className="flex items-center justify-between">
                <Heading title="Category List" />
                <AddCategory />
            </div>
            <div className="container mx-auto mt-5">
                <div className="grid grid-cols-2 border-b-2 py-4 rounded-lg font-semibold text-sm bg-[#f4f6f8] px-4">
                    <div>Name</div>
                    <div className="text-right">Modified</div>
                </div>

                <div className="mt-4">
                    {

                        loading ? (
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
                                    currentItems.map((categoryItem, categoryIndex) => (
                                        <div
                                            className="grid grid-cols-2 text-black items-center p-2 lg:p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out mb-4"
                                            key={categoryIndex}>
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <FolderIcon />
                                                </div>
                                                <span className="text-xs sm:text-sm">{categoryItem.category_name}</span>
                                            </div>
                                            <div className="flex justify-end items-center gap-2 md:gap-5">
                                                <div className="text-left text-xs sm:text-sm">
                                                    <span>{FormatDateString(categoryItem.updated_at)}</span>
                                                    <br />
                                                    <span>{FormatTimeString(categoryItem.updated_at)}</span>
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
                                                            onClick={() =>
                                                                router.push(`/pages/category/${categoryItem.category_slug}`)
                                                            }
                                                        >
                                                            View
                                                        </DropdownItem>

                                                        <DropdownItem
                                                            key="edit"
                                                            onClick={(key: any) => handleUpdateClick(categoryItem)}
                                                        >
                                                            Edit
                                                        </DropdownItem>


                                                        <DropdownItem
                                                            key="hidden"
                                                            onAction={(key: any) => Hiddenbtn(categoryItem)}
                                                        >
                                                            Hidden
                                                        </DropdownItem>

                                                        <DropdownItem
                                                            key="delete"
                                                            className="text-danger"
                                                            color="danger"
                                                            onAction={(key: any) => DeleteBtn(categoryItem.id)}
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    ))) :
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

            {/* Hiddenbtn Category Data */}

            <div className="flex items-center justify-between">
                <Heading title="Hidden Category List" />
            </div>
            <div className="container mx-auto mt-5">
                {/* Header Row */}
                <div className="grid grid-cols-2 border-b-2 py-4 rounded-lg font-semibold text-sm bg-[#f4f6f8] px-4">
                    <div>Name</div>
                    <div className="text-right">Modified</div>
                </div>
                {/* Folder Rows */}
                <div className="mt-4">
                    {
                        loading ? (
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
                            Array.isArray(currentItemsHidden) && currentItemsHidden.length > 0 ?
                                (
                                    currentItemsHidden.map((categoryItem, categoryIndex) => (
                                        <div
                                            className="grid grid-cols-2 items-center p-2 lg:p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out mb-4"
                                            key={categoryIndex}
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <FolderIcon />
                                                </div>
                                                <span className="text-xs sm:text-sm transition-colors duration-300 ease-in-out">
                                                    {categoryItem.category_name}
                                                </span>
                                            </div>
                                            <div className="flex justify-end items-center gap-2 md:gap-5">
                                                <div className="text-left text-xs sm:text-sm">
                                                    <span>{FormatDateString(categoryItem.updated_at)}</span>
                                                    <br />
                                                    <span>{FormatTimeString(categoryItem.updated_at)}</span>
                                                </div>
                                                <Dropdown size="sm" className="min-w-32 w-fit">
                                                    <DropdownTrigger>
                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            radius="full"
                                                            size="sm"
                                                            className="transition-colors duration-300 ease-in-out hover:bg-gray-200"
                                                        >
                                                            <ThreedotIocn />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Categorical Action">
                                                        <DropdownItem
                                                            key="hidden"
                                                            onAction={(key: any) => UnHiddenbtn(categoryItem)}
                                                            className="transition-colors duration-300 ease-in-out hover:bg-gray-100"
                                                        >
                                                            Unhidden
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="delete"
                                                            className="text-danger transition-colors duration-300 ease-in-out hover:bg-red-100"
                                                            color="danger"
                                                            onAction={(key: any) => DeleteBtn(categoryItem.id)}
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>

                                    ))
                                ) : (
                                    <div className="text-center text-gray-500">No Data</div>
                                )}
                </div>
                <div className="flex justify-center mt-6">
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


            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <Heading title={selectedCategory ? "Edit Category" : "Add New Category"} />
                            </ModalHeader>
                            <ModalBody>
                                {selectedCategory && (
                                    <CategoryForm
                                        currentCategory={selectedCategory}
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
    );
}
