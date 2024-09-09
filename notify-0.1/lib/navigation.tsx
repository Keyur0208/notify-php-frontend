import {BookMarkIcon, CategoryIcon, ChartIcon, ContactUsIcon, DepartmentIcon, FeedBackIcon, HelpIcon, HomeIcon, People, TimeIcon } from "../style/icon/deshoboard";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../src/store/store";
import React from "react";
import { useDispatch } from "react-redux";
import { getCategoryDate } from "../src/store/category/categoryslice";

export function CategoryFunction()
{

    const dispatch:AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCategoryDate());
    }, []);


    const { data, loading } = useSelector((state: RootState) => state.category.CategoryDispalyDate);

    const CategorData = data && Array.isArray(data) && data.length > 0
        ? [...data]
            .filter(item => item.is_hidded === false)
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        : [];

    return(
        <h1>
            {
                CategorData.map((item,index)=>(
                    <>
                        <h1 key={index}>{item.category_name}</h1>
                    </>
                ))
            }
        </h1>
    )
}


export const MenuItems = [
    {
        id: "home",
        name: "Home"
    },
    {
        id: "about",
        name: "About"
    },
    {
        id: "team",
        name: "Team"
    },
    {
        id: "contactUs ",
        name: "Contact Us "
    }
];

export const User_Pannel = [
    {
        icon: <HomeIcon />,
        label: "Dashboard",
        route: "/pages/dashboard"
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
        icon: <ChartIcon />,
        label: 'Chat',
        route: '/pages/chart',
    },
]


export const Admin_Pannel = [

    {
        icon: <HomeIcon />,
        label: "Dashboard",
        route: "/pages/dashboard"
    },
    {
        icon: <People/>,
        label: "Users",
        route: "/pages/user"
    },
    {
        icon: <CategoryIcon/>,
        label: "Category",
        route: "/pages/category/list",
        children:[
            {
                menuitem:"List",
                menuroute:"/pages/category/list"
            },
            {
                menuitem:"Demo",
                menuroute:"/keyur"
            },
            {
                menuitem:"Demo2",
                menuroute:"/keyur"
            },
            {
                menuitem:"Demo3",
                menuroute:"/keyur"
            }
        ]
    },
    {
        icon: <DepartmentIcon/>,
        label: "Department",
        route: "/pages/department"
    },
    {
        icon: <BookMarkIcon/>,
        label: "BookMark",
        route: "/pages/bookmark"
    },
    {
        icon: <FeedBackIcon/>,
        label: 'Feedback',
        route: '/pages/feedback',
    },
    {
        icon: <HelpIcon/>,
        label: 'Help',
        route: '/pages/help',
    },
    {
        icon: <TimeIcon/>,
        label: 'Expiry',
        route: '/pages/expiry',
    },
    {
        icon: <ContactUsIcon/>,
        label: 'Contact Request',
        route: '/pages/contact',
    },
    {
        icon: <ChartIcon/>,
        label: 'Chat',
        route: '/pages/chart',
    },
    
]
