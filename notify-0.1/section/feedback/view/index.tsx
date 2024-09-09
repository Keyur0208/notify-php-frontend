"use client";
import { RolesData } from "../../../common/getuserdata";
import AdminFeedbackPage from "../adminfeedback";
import UserFeedbackPage from "../userfeedback";

export function FeedbackView() {

    const data = RolesData();

    return (
        <>
            {
                data?.roles?.includes('admin') ?
                    (
                        <AdminFeedbackPage/>
                    )
                    : data?.roles?.includes('student') || data?.roles?.includes('faculty') ?
                        (
                            <UserFeedbackPage/>
                        )
                        :
                        (
                            <h1 className="hidden" >Loading...</h1>
                        )
            }
        </>
    );
}