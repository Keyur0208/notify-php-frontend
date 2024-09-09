import { Metadata } from "next";
// Section -----------------
import { CategoryView } from "../../../../section/category/view";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: "Category Notice"
};

export default function page() {

    return(
        <>
           <CategoryView/>
        </>
    )
}