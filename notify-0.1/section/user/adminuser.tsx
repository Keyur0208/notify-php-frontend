"use client";
import React from "react";
import { SearchIcon } from "../../style/icon/deshoboard";
import { Heading } from "../../common/heading";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Spinner } from "@nextui-org/react";
import { RootState } from "../../src/store/store";
import { useSelector } from "react-redux";
import { getuserAllData, deleteUserData } from "../../src/store/auth/Authslice";
import { AppDispatch } from "../../src/store/store";
import { useDispatch } from "react-redux";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { ThreedotIocn } from "../../style/icon/categoryicon";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { debounce } from 'lodash';
import Papa from 'papaparse';
import { enqueueSnackbar } from "notistack";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { ModalHeader, ModalBody, ModalFooter, } from '@nextui-org/modal';
import { UpdateUserData } from "../../src/store/auth/Authslice";
import UserForm from "../../componets/user/update";

export const AdminUserView = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null);


    const role = [
        {
            label: "Admin",
            value: "admin"
        },
        {
            label: "Faculty",
            value: "faculty"
        },
        {
            label: "Student",
            value: "student"
        }
    ]
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getuserAllData())
    }, [])

    const { data, loading } = useSelector((state: RootState) => state.auth.userAlldata);

    const userData = data && Array.isArray(data) && data.length > 0
        ? [...data]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        : [];

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(userData.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return userData.slice(start, end);
    }, [page, userData]);

    function formatDateString(isoString: string) {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    function formatTimeString(isoString: string) {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12;
        return `${formattedHours}:${minutes} ${period}`;
    }

    const debouncedDeleteUser = debounce((dispatch, id) => {
        dispatch(deleteUserData(id));
        dispatch(getuserAllData());
    });

    function DeleteUserBtnData(id: string) {
        debouncedDeleteUser(dispatch, id);
    }

    // Update Button //

    const handleFormSubmit = (values: { sid:string,email:string,first_name: string, last_name: string, roles: string ,password:string,department:string }) => {
        if (selectedCategory) {
            dispatch(UpdateUserData({ ...selectedCategory, ...values }));
        } else {
            dispatch(UpdateUserData(values));
        }
        dispatch(getuserAllData());
        onOpenChange();
    };

    const handleUpdateClick = (category: any) => {
        onOpen();
        setSelectedCategory(category);
    };


    const DowloandStaffrecord = () => {
        if (data && Array.isArray(data) && data.length > 0) {
            const csv = Papa.unparse([
                ...data.map((item, index) => ({
                    No: index + 1,
                    Roles: `${item.roles}`,
                    Department: `${item.department}`,
                    Sid: `${item.sid}`,
                    FullName: `${item.first_name} ${item.last_name}`,
                    Email: `${item.email}`,
                    Dob: `${formatDateString(item.dob) || ''}`,
                    created_at: `${formatDateString(item.created_at) || ''} ${formatTimeString(item.created_at) || ''}`,
                })),

            ]);

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `users.csv`;
            link.click();
        } else {
            enqueueSnackbar("No Staff Data", { variant: 'error' });
        }
    }


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Users" />
                <div className="text-end my-2">
                    <Button
                        color="secondary"
                        className="text-white text-sm font-semibold"
                        size="sm"
                        onClick={DowloandStaffrecord}
                    >
                        Download CSV
                    </Button>
                </div>
            </div>

            <Table
                aria-label="Notice Table with Pagination"
                className="mt-5"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            className="text-white"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "h-auto",
                    th: "text-center bg-bg-blue-notify text-white text-sm",
                    td: "text-center"
                }}
            >

                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Sid</TableColumn>
                    <TableColumn>User Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Role</TableColumn>
                    <TableColumn>Department</TableColumn>
                    <TableColumn>Modified</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={
                        <Spinner />}
                    emptyContent={"No Data."}
                    items={items}
                >
                    {(item) => {
                        const index = userData.indexOf(item) + 1 + (page - 1) * rowsPerPage;
                        return (
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{item.sid}</TableCell>
                                <TableCell>{item.first_name} {item.last_name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.roles}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end items-center gap-2 md:gap-5 ">
                                        <div className="text-left text-xs  sm:text-sm">
                                            <span>{formatDateString(item.created_at)}</span>
                                            <br />
                                            <span>{formatTimeString(item.created_at)}</span>
                                        </div>
                                        <div className="text-xs sm:text-sm p-2 rounded-full ">
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
                                                    aria-label="Static Actions"
                                                >
                                                    <DropdownItem 
                                                    key="edit"
                                                    onAction={(key: any) => handleUpdateClick(item)}
                                                    >
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="delete"
                                                        className="text-danger"
                                                        color="danger"
                                                        onAction={(key: any) => DeleteUserBtnData(item.id)}
                                                    >
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    }}
                </TableBody>
            </Table>


            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <Heading title={selectedCategory ? "Edit User" : "Add New User"} />
                            </ModalHeader>
                            <ModalBody>
                                {selectedCategory && (
                                    <UserForm
                                        currentUser={selectedCategory}
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
};
