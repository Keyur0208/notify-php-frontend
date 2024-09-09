import { Metadata } from "next";
// Section -----------------
import { UserView } from "../../../section/user/view";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: "Users"
};

export default function page() {

    return(
        <>
            <UserView/>
        </>
    )
}
