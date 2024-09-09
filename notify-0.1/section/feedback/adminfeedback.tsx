"use client"
import React from 'react';
import { Heading } from '../../common/heading';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner , Button } from "@nextui-org/react";
import { RootState } from "../../src/store/store";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../src/store/store";
import { useDispatch } from "react-redux";
import { getFeedbackuserData } from '../../src/store/feedback/feedbackslice';
import StarRatings from 'react-star-ratings';
import Papa from 'papaparse';
import { enqueueSnackbar } from "notistack";
import { FormatDateString , FormatTimeString} from '../../componets/date';

const AdminFeedbackPage = () => {

    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getFeedbackuserData())
    }, [dispatch])

    const { data, loading } = useSelector((state: RootState) => state.feedback.FeedbackuserData);

    const userData = data && Array.isArray(data) && data.length > 0 ? data : [];

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(userData.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return userData.slice(start, end);
    }, [page, userData]);

    const DowloandFeedbackrecord = () => {
        if (data && Array.isArray(data) && data.length > 0) {
            const csv = Papa.unparse([
                ...data.map((item, index) => ({
                    No: index + 1,
                    Roles: `${item.roles}`,
                    Department:`${item.department}`,
                    Full_Name :`${item.first_name} ${item.Last_name} `,
                    Sid: `${item.sid}`,
                    Feedback_category: `${item.feedback_category}`,
                    Feedback_des: `${item.feedback_des}`,
                    Feedback_rating:`${item.feedback_rating}`,
                    created_at: `${FormatDateString(item.created_at) || ''} ${FormatTimeString(item.created_at) || ''}`,
                })),

            ]);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Feedback.csv`;
            link.click();
        } else {
            enqueueSnackbar("No User Data", { variant: 'error' });
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="FeedBack" />
                <div className="text-end my-2">
                    <Button
                        color="secondary"
                        className="text-white text-sm font-semibold"
                        size="sm"
                        onClick={DowloandFeedbackrecord}
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
                    <TableColumn>Role</TableColumn>
                    <TableColumn>Department</TableColumn>
                    <TableColumn>Full Name</TableColumn>
                    <TableColumn>Sid</TableColumn>
                    <TableColumn>feedback_category</TableColumn>
                    <TableColumn>Feedback Describe</TableColumn>
                    <TableColumn>Feedback Rating</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={
                        <Spinner />}
                    emptyContent={"No Data"}
                    items={items}
                >
                    {(item) => {
                        const index = userData.indexOf(item) + 1;
                        return (
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{item.roles}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>{item.first_name} {item.last_name}</TableCell>
                                <TableCell>{item.sid}</TableCell>
                                <TableCell>{item.feedback_category}</TableCell>
                                <TableCell>{item.feedback_des}</TableCell>
                                <TableCell>
                                    <StarRatings
                                        rating={parseFloat(item.feedback_rating)}
                                        starRatedColor="#FFA534"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="3px"
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    }}
                </TableBody>
            </Table>
        </>
    );
};

export default AdminFeedbackPage;
