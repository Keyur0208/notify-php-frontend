"use client"
import React from "react";
import { Heading } from "../../common/heading";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getNoticeGetData } from "../../src/store/notice/noticeslice";
import { AppDispatch } from "../../src/store/store";
import { RootState } from "../../src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';

interface Notice {
    created_at: string;
}

const filterNoticesByMonth = (notices: Notice[]) => {
    return notices.reduce((acc, notice) => {
        const date = new Date(notice.created_at);
        const monthYear = format(date, 'MMMM yyyy');

        if (!acc[monthYear]) {
            acc[monthYear] = 0;
        }
        acc[monthYear]++;
        return acc;
    }, {} as Record<string, number>);
};

export default function AdminDashboardView() {
    const dispatch: AppDispatch = useDispatch();
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    React.useEffect(() => {
        dispatch(getNoticeGetData());
    }, [dispatch]);

    const { noticedata, loading } = useSelector((state: RootState) => state.notice.NoticeGetData);

    const notices = Array.isArray(noticedata) ? noticedata : [];

    const noticesByMonth = filterNoticesByMonth(notices);

    const months = Object.keys(noticesByMonth);
    const counts = months.map(month => noticesByMonth[month]);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Notice Count',
                data: counts,
                fill: false,
                borderColor: 'rgba(1, 147, 220, 1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <Heading title="Dashboard" />
            <div className="flex flex-col items-center justify-center">
                <h1 className=" text-xl lg:text-3xl font-semibold">Notice Data</h1>
                <div className="w-full max-w-2xl mt-12">
                    <div className="relative h-72 sm:h-80 md:h-96">
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </>
    );
}
