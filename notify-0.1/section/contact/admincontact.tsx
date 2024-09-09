"use client"
import { Heading } from "../../common/heading";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Spinner } from "@nextui-org/react";
import React from "react";
import { RootState } from "../../src/store/store";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../src/store/store";
import { useDispatch } from "react-redux";
import { getContactUsContactuserData } from "../../src/store/contactus/contausctslice";
import Papa from 'papaparse';
import { enqueueSnackbar } from "notistack";

export default function Admincontact() {

    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getContactUsContactuserData())
    }, [])

    const { data, loading } = useSelector((state: RootState) => state.contactUs.ContactuserData);

    const userData = data && Array.isArray(data) && data.length > 0 ? data : [];

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

    const DowloandConcatrecord = () => {
        if (data && Array.isArray(data) && data.length > 0) {
            const csv = Papa.unparse([
                ...data.map((item, index) => ({
                    No: index + 1,
                    FullName: `${item.fullname}`,
                    Email: `${item.email}`,
                    Message: `${item.des}`,
                })),

            ]);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `ContactRequest.csv`;
            link.click();
        } else {
            enqueueSnackbar("No Staff Data", { variant: 'error' });
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Contact Request" />
                <div className="text-end my-2">
                    <Button
                        color="secondary"
                        className="text-white text-sm font-semibold"
                        size="sm"
                        onClick={DowloandConcatrecord} 
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
                    <TableColumn>Full Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Message</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={
                        <Spinner />}
                    emptyContent={"No Data"}
                    items={items}
                >
                    {(item) => {
                        const index = userData.indexOf(item) + 1 + (page - 1) * rowsPerPage;
                        return (
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{item.fullname}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.des}</TableCell>
                            </TableRow>
                        );
                    }}
                </TableBody>
            </Table>
        </>
    )
}
