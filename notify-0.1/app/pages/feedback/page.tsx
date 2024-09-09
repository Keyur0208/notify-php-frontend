import { Metadata } from "next";
// Section -----------------
import { FeedbackView } from "../../../section/feedback/view";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: "Feedback"
};

export default function page() {

    return(
        <>
           <FeedbackView/>
        </>
    )
}