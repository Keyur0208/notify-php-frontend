import { Metadata } from "next";
// Section -----------------
import { ContactView } from "../../../section/contact/view";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: "Contact Request"
};

export default function page() {

    return(
        <>
           <ContactView/>
        </>
    )
}