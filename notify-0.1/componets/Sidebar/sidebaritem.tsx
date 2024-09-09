"use client"
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { useEffect } from "react";

export function SidebarItems({ items, index, pagename,sidebarOpen,setSidebarOpen }: any) {

    // const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsSmallScreen(window.innerWidth <= 768);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    // const handleLinkClick = () => {
    //     if (isSmallScreen) {
    //         setSidebarOpen(false);
    //     }
    // };


    return (
        <li key={index} >
            <Link
                href="#"
                // onClick={handleLinkClick}
                className={clsx("group relative flex items-center px-4 py-2 gap-2 text-lg rounded-lg font-semibold duration-300 ease-in-out", pagename.includes(items.route) ? "text-navigation-subitem bg-navigation-item-bg  dark:text-navigation-subitem" : "text-title-color hover:text-navigation-subitem dark:hover:text-navigation-subitem  hover:bg-navigation-item-bg dark:text-white" ,sidebarOpen && " flex lg:flex-col lg:text-xs lg:gap-y-1 lg:justify-center lg:items-center lg:p-2")}
            >
                {items.icon}
                <span className={clsx("block" , sidebarOpen && "lg:text-center" )}>
                    {items.label}
                </span>
            </Link>
        </li>
    )
}