"use client";
import React from "react";
import { Image } from "@nextui-org/react";
import { Heading } from "../../common/heading";
import Link from "next/link";
import { RootState } from "../../src/store/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../src/store/store";
import { getuserAllData } from "../../src/store/auth/Authslice";
import { Skeleton } from "@nextui-org/react";

export default function AdminDepartmentView() {
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getuserAllData());
    }, [dispatch]);

    const { data, loading } = useSelector((state: RootState) => state.auth.userAlldata);

    const studentCount = data && Array.isArray(data)
        ? data.filter(item => item.roles.includes("student")).length
        : 0;

    const facultyCount = data && Array.isArray(data)
        ? data.filter(item => item.roles.includes("faculty")).length
        : 0;

    const adminCount = data && Array.isArray(data)
        ? data.filter(item => item.roles.includes("admin")).length
        : 0;


    const roles = [
        {
            role_image: '/students.png',
            role_title: "Students",
            role_count: studentCount,
            role_link: "/pages/department/student"
        },
        {
            role_image: '/faculty.png',
            role_title: "Facultys",
            role_count: facultyCount,
            role_link: "/pages/department/faculty"
        },
        // {
        //     role_image: '/admin.png',
        //     role_title: "Admin",
        //     role_count: adminCount,
        //     role_link: "/pages/department/admin"
        // }
    ];

    return (
        <>
            <Heading title="Department" />

            <div className="container mx-auto mt-5">
                <div className="bg-bg-off-white-dashboard rounded-lg px-4">
                    <div className="text-center py-3">
                        <h1 className="text-2xl font-semibold">
                            Sutex Bank College of Computer Applications and Science
                        </h1>
                    </div>
                    {loading ?
                        (
                            <div className="text-center py-4">
                                {[...Array(3)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-center items-center bg-white rounded-lg py-2 shadow-md cursor-pointer hover:shadow-xl duration-300 w-[12rem] h-[12rem]" >
                                        <Skeleton className=" size-32 rounded-full"></Skeleton>
                                        <Skeleton className=" h-5 w-16 mt-2 rounded-full"></Skeleton>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-row flex-wrap gap-5 justify-center items-center pb-4 rounded-lg font-semibold text-sm">
                                {roles.map((role, index) => (
                                    <>
                                        <Link
                                            key={index}
                                            href={role.role_link}
                                            className="flex flex-col justify-center items-center bg-white rounded-lg py-2 shadow-md cursor-pointer hover:shadow-xl duration-300 w-[12rem]"
                                        >
                                            <Image
                                                src={role.role_image}
                                                className="h-32 w-full bg-white"
                                            />
                                            <h1 className="text-xl font-bold">{role.role_title}</h1>
                                            <div>{role.role_count}</div>
                                        </Link>
                                    </>
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}
