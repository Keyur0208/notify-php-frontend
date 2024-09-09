"use client";
import { RolesData } from "../../../common/getuserdata";
import { AdminexpiryPage } from "../adminexperiry";
import { UserexpiryPage } from "../userexperiry";

export function ExpiryView() {

    const data = RolesData();

    return (
        <>
            {
                data?.roles?.includes('admin') ?
                    (
                        <AdminexpiryPage />
                    )
                    : data?.roles?.includes('student') || data?.roles?.includes('faculty') ?
                        (
                            <UserexpiryPage />
                        )
                        :
                        (
                            <h1 className="hidden" >Loading...</h1>
                        )
            }
        </>
    );
}