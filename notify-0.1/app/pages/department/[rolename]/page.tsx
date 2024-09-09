"use client";
import { Image, Skeleton } from "@nextui-org/react";
import { Heading } from "../../../../common/heading";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../src/store/store";
import React from "react";
import { getuserAllData } from "../../../../src/store/auth/Authslice";
import Link from "next/link";
import Backicon from "../../../../style/icon/backicon";
import { Button } from "@nextui-org/react";

const Rolepage = ({ params }: { params: { rolename: string } }) => {

  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getuserAllData());
  }, [dispatch]);

  const { data, loading } = useSelector((state: RootState) => state.auth.userAlldata);


  const getCount = (department: string) => {
    return data && Array.isArray(data)
      ? data.filter(item => item.roles.includes(params.rolename) && item.department.includes(department)).length
      : 0;
  };

  const roleData = [
    { role_title: "BCA", department: "BCA" },
    { role_title: "BBA", department: "BBA" },
    { role_title: "BCOM", department: "BCOM" }
  ];

  const roles = roleData.map((role, index) => ({
    ...role,
    role_image: params.rolename === "student" ? "/students.png" : params.rolename === "faculty" ? "/faculty.png" : "/admin.png",
    role_count: getCount(role.department),
    role_link: `/pages/department/${params.rolename}/${role.department.toLowerCase()}`,
    key: index,
  }));

  return (
    <>
      <Heading title="Department" />
      <Button
        as={Link}
        className="mt-2 text-white"
        color="primary"
        size="sm"
        href={`/pages/department/`}
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
              {params.rolename.charAt(0).toUpperCase() + params.rolename.slice(1)}
            </h1>
          </div>
          {loading ? (
            <div className="text-center py-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center bg-white rounded-lg py-2 shadow-md cursor-pointer hover:shadow-xl duration-300 w-[12rem] h-[12rem]"
                >
                  <Skeleton className="size-32 rounded-full" />
                  <Skeleton className="h-5 w-16 mt-2 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-row flex-wrap gap-5 justify-center items-center pb-4 rounded-lg font-semibold text-sm">
              {roles.map((role) => (
                <Link
                  key={role.key}
                  href={role.role_link}
                  className="flex flex-col justify-center items-center bg-white rounded-lg py-2 shadow-md cursor-pointer hover:shadow-xl duration-300 w-[12rem]"
                >
                  <Image src={role.role_image} className="h-32 w-full bg-white" />
                  <h1 className="text-xl font-bold">{role.role_title}</h1>
                  <div>{role.role_count}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Rolepage;
