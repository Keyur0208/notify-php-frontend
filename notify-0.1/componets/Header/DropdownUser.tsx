"use client"
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Avatar } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function App() {

  const router = useRouter();

  const LogOut = () => {
    Cookies.remove('token');
    window.location.reload();
    router.push('/');
  }

  const { data } = useSelector((state: RootState) => state.auth.userData);

  const firstNameInitial = data?.first_name ? data.first_name.charAt(0) : '';

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <div className="relative">
            <Avatar
              showFallback
              name={firstNameInitial}
              color={data && data?.roles && data?.roles?.includes("admin") ? "primary" : "success"}
              size="md"
              isBordered
              as="button"
              src={`${process.env.NEXT_PUBLIC_API_URL}${data?.profile_image}`}
            />
            <span className="blue-badge "></span>
            <span className={clsx(data && data?.roles && data?.roles?.includes("admin") ? "blue-badge" : "green-badge")} ></span>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="settings"
            className=" bg-transparent">
            <div className=" font-semibold">
              {`${data?.first_name} ${data?.last_name}`}
            </div>
            <p className="text-xs">
              {data?.email}
            </p>
          </DropdownItem>
          <DropdownItem key="profile" color="primary" href="/pages/profile">
            My Profile
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={LogOut} >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
