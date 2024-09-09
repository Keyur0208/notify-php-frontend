"use client";
import { Heading } from "../../../../common/heading";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Button } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../src/store/store";
import React from "react";
import { getuserAllData } from "../../../../src/store/auth/Authslice";
import Backicon from "../../../../style/icon/backicon";
import Link from "next/link";
import Papa from 'papaparse';
import { enqueueSnackbar } from "notistack";

const DepartmentPage = async ({ params }: { params: { department: string } }) => {
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getuserAllData());
    }, [dispatch]);

    const { data, loading } = useSelector((state: RootState) => state.auth.userAlldata);

    const Departmentdata = data && Array.isArray(data) && data.length > 0
        ? [...data]
            .filter(item => item.roles.includes(params.department[0]) && item.department.includes(params.department[1].toUpperCase()))
        : [];


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

    const DowloandDepartmentecord = () => {
        if (Departmentdata && Array.isArray(Departmentdata) && Departmentdata.length > 0) {
            const csv = Papa.unparse([
                ...Departmentdata.map((item, index) => ({
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
            link.download = `${params.department[0].charAt(0).toUpperCase() + params.department[0].slice(1)}_${params.department[1].toUpperCase()}.csv`;
            link.click();
        } else {
            enqueueSnackbar("No Staff Data", { variant: 'error' });
        }
    }

    return (
        <>
            <Heading title="Department" />
            <Button
                as={Link}
                className="mt-2 text-white"
                color="primary"
                size="sm"
                href={`/pages/department/${params.department[0]}`}
            >
                <Backicon /> Back To
            </Button>
            <div className="container mx-auto mt-5">
                <div className="bg-bg-off-white-dashboard rounded-lg px-4">
                    <div className="text-center py-3">
                        <h1 className="text-2xl font-semibold">
                            Sutex Bank College of Computer Applications and Science
                        </h1>
                        <h1 className="text-2xl font-semibold text-green-600">
                            {params.department[0].charAt(0).toUpperCase() + params.department[0].slice(1)} {params.department[1].toUpperCase()}
                        </h1>
                        <div className="text-end">
                            <Button
                                color="secondary"
                                className="text-white text-sm font-semibold"
                                size="sm"
                                onClick={DowloandDepartmentecord}
                            >
                                Download CSV
                            </Button>
                        </div>
                    </div>
                    <Table
                        aria-label="User Table with Pagination"
                        className="py-4"
                        classNames={{
                            wrapper: "h-auto",
                            th: "text-center bg-bg-blue-notify text-white text-sm",
                            td: "text-center"
                        }}
                    >
                        <TableHeader>
                            <TableColumn>No</TableColumn>
                            <TableColumn>Full Name</TableColumn>
                            <TableColumn>Sid</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Department</TableColumn>
                            <TableColumn>Time</TableColumn>
                        </TableHeader>
                        <TableBody
                            isLoading={loading}
                            loadingContent={<Spinner />}
                            emptyContent={"No Data"}
                        >
                            {
                                Departmentdata.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.first_name} {item.last_name}</TableCell>
                                        <TableCell>{item.sid}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.department}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center gap-2 md:gap-5 ">
                                                <div className="text-center text-xs  sm:text-sm">
                                                    <span>{formatDateString(item.created_at)}</span>
                                                    <br />
                                                    <span>{formatTimeString(item.created_at)}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>

                    </Table>
                </div>
            </div>
        </>
    );
};

export default DepartmentPage;
