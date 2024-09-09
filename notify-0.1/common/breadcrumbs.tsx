"use client"
import { BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";

export function BreadCrumb({name,first_name }:any) {
    return (
        <>
            <Breadcrumbs
                separator="/">
                <BreadcrumbItem>{first_name || "Main"}</BreadcrumbItem>
                <BreadcrumbItem className=" text-border-blue">{name}</BreadcrumbItem>
            </Breadcrumbs>
        </>
    )
}
