import { Metadata } from "next";
// Section -----------------
import { ExpiryView } from "../../../section/expiry/view";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: "expiry"
};

export default function page() {

    return(
        <>
           <ExpiryView/>
        </>
    )
}