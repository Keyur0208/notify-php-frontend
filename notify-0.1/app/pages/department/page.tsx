import { Metadata } from "next";
// Section -----------------
import { DepartmentView } from "../../../section/department/view";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: "Department"
};

export default function page() {

    return (
        <>
            <DepartmentView />
        </>
    )
}