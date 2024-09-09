"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, Image, Skeleton, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../src/store/store";
import { getUserData } from "../../src/store/auth/Authslice";
import { getToken } from "../../common/token";
import Cookies from "js-cookie";
import { User_Pannel } from "../../lib/navigation";
import Link from "next/link";
import '../../style/dashboard.css';
import { LogOutIcon } from "../../style/icon/deshoboard";
import AdminSidebar from "./adminsidebar";
import { useRouter } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

  const router = useRouter();
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getUserData(token));
    }
  }, [dispatch]);

  const LogOut = () => {
    Cookies.remove('token');
    window.location.reload();
    router.push('/');
  }

  return (
    <div>
      {
        data && data?.roles && data?.roles?.includes("admin") ?
          (
            <>
              <div className=" hidden lg:block">
                <div className="flex justify-center items-center gap-2 py-1">
                  <Image
                    src="/logo2.svg"
                    alt="logo"
                    aria-controls="sidebar"
                  />
                </div>
              </div>
              <div className="mx-2 lg:mx-5">
                <aside
                  ref={sidebar}
                  className={clsx(`absolute left-0 top-0 flex h-screen  w-64  flex-col  bg-bg-off-white-dashboard   rounded-xl  dark:border-gray-500  dark:bg-light-black drop-shadow-navigation  duration-300 ease-linear  lg:static lg:translate-x-0 `, sidebarOpen ? "translate-x-0 z-9999 lg:z-0" : "-translate-x-full z-9999 lg:z-0 ")}
                >
                  <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <div className="block lg:hidden">
                      <div className="flex justify-center items-center gap-2  ">
                        <Image
                          src="/logo2.svg"
                          alt="logo"
                          aria-controls="sidebar"
                        />
                      </div>
                    </div>
                    <nav className={clsx("mt-5 px-4 py-2 lg:mt-5 lg:px-6")}>
                      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    </nav>
                    <div className="mb-3 fixed bottom-0 lg:bottom-20 ">
                      <Tooltip content="logout" color="secondary" className="text-white" radius="sm" size="lg">
                        <div className="flex justify-center items-center gap-1 bg-white py-2 w-52 rounded-xl cursor-pointer ml-6 "
                          onClick={LogOut}>
                          <Avatar
                            size="sm" />
                          <p className="px-1 text-sm">{data?.first_name} {data?.last_name}</p>
                          <LogOutIcon />
                        </div>
                      </Tooltip>
                    </div>
                  </div >
                </aside >
              </div>
            </>
          ) :
          data && data?.roles && data?.roles?.includes("student") || data && data?.roles && data?.roles?.includes("admin") ?
            (
              <>
                <div className=" hidden lg:block">
                  <div className="flex justify-center items-center gap-2 py-1">
                    <Image
                      src="/logo2.svg"
                      alt="logo"
                      aria-controls="sidebar"
                    />
                  </div>
                </div>
                <div className="mx-2 lg:mx-5">
                  <aside
                    ref={sidebar}
                    className={clsx(`absolute left-0 top-0 flex h-screen  w-64  flex-col  bg-bg-off-white-dashboard   rounded-xl  dark:border-gray-500  dark:bg-light-black drop-shadow-navigation  duration-300 ease-linear  lg:static lg:translate-x-0 `, sidebarOpen ? "translate-x-0 z-9999 lg:z-0" : "-translate-x-full z-9999 lg:z-0 ")}
                  >
                    <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                      <div className="block lg:hidden">
                        <div className="flex justify-center items-center gap-2  ">
                          <Image
                            src="/logo2.svg"
                            alt="logo"
                            aria-controls="sidebar"
                          />
                        </div>
                      </div>
                      <nav className={clsx("mt-5 px-4 py-2 lg:mt-5 lg:px-6")}>
                        {

                          User_Pannel.map((groupmenu, groupindex) => (
                            <div key={groupindex}>
                              <ul className={clsx("flex flex-col gap-1.5 mb-3")}>
                                <Link
                                  href={groupmenu.route}
                                  onClick={() => setSidebarOpen(false)}
                                  className={clsx("group relative hover:bg-bg-blue-dashboard hover:fill-blue-600 hover:text-blue-600 flex items-center px-4 py-2 gap-2 text-md rounded-md duration-300 ease-in-out", pathname.includes(groupmenu.route) && "fill-blue-600 text-blue-600 bg-bg-blue-dashboard")}
                                >
                                  {groupmenu.icon}
                                  <span className={clsx("block", sidebarOpen && "lg:text-center")}>
                                    {groupmenu.label}
                                  </span>
                                </Link>
                              </ul>
                            </div>
                          ))
                        }
                      </nav>
                      <div className="mb-3  fixed bottom-0 lg:bottom-20 ">
                        <Tooltip content="logout" color="secondary" className="text-white" radius="sm" size="lg">
                          <div className="flex justify-center items-center gap-1 bg-white py-2 w-52 rounded-xl cursor-pointer ml-6"
                            onClick={LogOut}>
                            <Avatar
                              size="sm" />
                            <p className="px-1 text-sm">{data?.first_name} {data?.last_name}</p>
                            <LogOutIcon />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </aside>
                </div>
              </>
            )
            :
            (
              <>
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 bg-white">
                  <div className="border-t-transparent border-solid animate-spin rounded-full border-bg-text-dashboard border-8 size-48">
                  </div>
                </div>
              </>
            )
      }
    </div >
  )
};

export default Sidebar;
