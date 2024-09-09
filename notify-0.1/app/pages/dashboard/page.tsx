import { Metadata } from "next";
// Section -----------------
import { DashboardView } from "../../../section/dashboard/view";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: "Dashborad"
};

export default function page() {

    return(
        <>
            <DashboardView/>
        </>
    )
}