"use client"
import { RolesData } from "../../../common/getuserdata";
import AdminDepartmentView from "../admindepartment";
import not_found from "@//not-found";
import { useRouter } from "next/navigation";

export function DepartmentView() {
    const data = RolesData();
    const router = useRouter();

    if (!data) {
        return <h1 className="hidden">Loading...</h1>;
    }
    
    if (data?.roles?.includes('admin')) {
        return <AdminDepartmentView/>;
    } else if (data?.roles?.includes('student') || data?.roles?.includes('faculty')) {
        router.push('/404');
        return null;
    } else {
        return <h1 className="hidden">Loading...</h1>;
    }
}
