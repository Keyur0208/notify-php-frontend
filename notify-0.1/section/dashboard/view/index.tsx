"use client";
import { RolesData } from "../../../common/getuserdata";
import AdminDashboardView from "../admin_view";
import UserDashboardView from "../user_view";

export function DashboardView() {
    const data = RolesData();
    return (
        <>
            {
                data?.roles?.includes('admin') ?
                    (
                        <AdminDashboardView/>
                    )
                    : data?.roles?.includes('student') || data?.roles?.includes('faculty') ?
                        (
                            <UserDashboardView/>
                        )
                        :
                        (
                            <h1 className="hidden" >Loading...</h1>
                        )
            }
        </>
    );
}
