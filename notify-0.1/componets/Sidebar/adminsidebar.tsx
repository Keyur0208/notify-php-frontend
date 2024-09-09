"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../src/store/store";
import Link from "next/link";
import { BookMarkIcon, CategoryIcon, ChartIcon, ContactUsIcon, DepartmentIcon, FeedBackIcon, HelpIcon, HomeIcon, People, TimeIcon } from "../../style/icon/deshoboard";
import { DotIcon } from "../../style/icon/doticon";
import { DropdownIcon } from "../../style/icon/dropdownicon";
import { getCategoryDate } from "../../src/store/category/categoryslice";
import { Category, MenuItem, SubMenuItem } from "../../utils/tyep";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: any;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryDate());
    }, [dispatch]);

    const { data: categories = [], loading } = useSelector((state: RootState) => state.category.CategoryDispalyDate);

    const pathname = usePathname();

    const Admin_Pannel: MenuItem[] = [
        {
            icon: <HomeIcon />,
            label: "Dashboard",
            route: "/pages/dashboard"
        },
        {
            icon: <People />,
            label: "Users",
            route: "/pages/user"
        },
        {
            icon: <CategoryIcon />,
            label: "Category",
            route: "/pages/category",
            children: [
                {
                    menuitem: "List",
                    menuroute: "/pages/category/list"
                },
                ...(Array.isArray(categories) && categories.length > 0
                    ? categories
                        .filter((category: Category) => !category.is_hidded)
                        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                        .map((category: Category): SubMenuItem => ({
                            menuitem: category.category_name,
                            menuroute: `/pages/category/${category.category_slug}`,
                        }))
                    : [])
            ]
        },
        {
            icon: <DepartmentIcon />,
            label: "Department",
            route: "/pages/department"
        },
        {
            icon: <BookMarkIcon />,
            label: "BookMark",
            route: "/pages/bookmark"
        },
        {
            icon: <FeedBackIcon />,
            label: 'Feedback',
            route: '/pages/feedback',
        },
        {
            icon: <HelpIcon />,
            label: 'Help',
            route: '/pages/help',
        },
        {
            icon: <TimeIcon />,
            label: 'Expiry',
            route: '/pages/expiry',
        },
        {
            icon: <ContactUsIcon />,
            label: 'Contact Request',
            route: '/pages/contact',
        },
        {
            icon: <ChartIcon />,
            label: 'Chat',
            route: '/pages/chart',
        },
    ];

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleMenuClick = (index: number, hasChildren: boolean) => {
        if (index == 2) {
            setSidebarOpen(true);
            if (hasChildren) {
                setOpenDropdown(openDropdown === index ? null : index);
            } else {
                setOpenDropdown(null);
            }
        }
        else {
            setSidebarOpen(false);
            if (hasChildren) {
                setOpenDropdown(openDropdown === index ? null : index);
            } else {
                setOpenDropdown(null);
            }
        }
    };

    return (
        <>
            {
                Admin_Pannel.map((groupmenu, groupindex) => (
                    <div key={groupindex}>
                        <ul className={clsx("flex flex-col gap-1.5 mb-3")}>
                            {groupmenu.children ? (
                                <div
                                    onClick={() => handleMenuClick(groupindex, true)}
                                    className={clsx(
                                        "cursor-pointer group relative hover:bg-bg-blue-dashboard hover:fill-blue-600 hover:text-blue-600 flex items-center px-4 py-2 gap-2 text-md rounded-md duration-300 ease-in-out",
                                        pathname.startsWith(groupmenu.route) &&
                                        "fill-blue-600 text-blue-600 bg-bg-blue-dashboard"
                                    )}
                                >
                                    {groupmenu.icon}
                                    <span className={clsx("block", sidebarOpen && "lg:text-center")}>
                                        {groupmenu.label}
                                    </span>
                                    <div className="ml-auto">
                                        <DropdownIcon isOpen={openDropdown === groupindex} />
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={groupmenu.route}
                                    onClick={() => {
                                        handleMenuClick(groupindex, false)
                                    }}
                                    className={clsx(
                                        "group relative hover:bg-bg-blue-dashboard hover:fill-blue-600 hover:text-blue-600 flex items-center px-4 py-2 gap-2 text-md rounded-md duration-300 ease-in-out",
                                        pathname.includes(groupmenu.route) &&
                                        "fill-blue-600 text-blue-600 bg-bg-blue-dashboard"
                                    )}
                                >
                                    {groupmenu.icon}
                                    <span className={clsx("block", sidebarOpen && "lg:text-center")}>
                                        {groupmenu.label}
                                    </span>
                                </Link>
                            )}
                            {groupmenu.children && (
                                <ul
                                    className={clsx(
                                        "space-y-1",
                                        openDropdown === groupindex ? "dropdown-open" : "dropdown-content"
                                    )}
                                >
                                    {groupmenu.children.map((submenu, subindex) => (
                                        <li key={subindex}>
                                            <Link
                                                href={submenu.menuroute}
                                                onClick={(e) => {
                                                    setSidebarOpen(false);
                                                    e.stopPropagation()
                                                }}
                                                className={clsx(
                                                    "flex items-center px-4 py-2 gap-2 text-sm rounded-md transform transition-all duration-300 ease-in-out",
                                                    pathname === submenu.menuroute
                                                        ? "fill-blue-600 text-blue-600"
                                                        : "hover:bg-gray-200 hover:fill-blue-600 hover:text-blue-600"
                                                )}
                                            >
                                                <DotIcon />
                                                {submenu.menuitem}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </ul>
                    </div>
                ))
            }
        </>
    )
}
