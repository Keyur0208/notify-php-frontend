"use client";

import { AppDispatch } from "../src/store/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getCategoryDate } from "../src/store/category/categoryslice";
import { RootState } from "../src/store/store";

export function MenuCategoryList() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryDate());
    }, [dispatch]);

    const { data } = useSelector((state: RootState) => state.category.CategoryDispalyDate);

    return data && Array.isArray(data) && data.length > 0 ? (
        data.map((item) => (
            {
                icon: "#", 
                label: item.category_name,
                route: `/pages/category/${item.category_name}`
            }
        ))
    ) : [];
}
