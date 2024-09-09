"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../Sidebar/index";
import Header from "../Header/index";
import { useEffect } from "react";
import clsx from "clsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);
  

  return (
    <>
      <div className={clsx("flex h-screen overflow-hidden bg-light-blue-bg  dark:bg-black")} >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className={clsx("mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 page-transition",pageLoaded && 'active')} >
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
