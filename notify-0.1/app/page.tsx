import { Metadata as NextMetadata } from "next";
// Section -----------------
import Navbars from "../section/landing/navbar";
import About from "../section/landing/about";
import HeroSection from "../section/landing/hero-section";
import Teamus from "../section/landing/teamus";
import ContactUs from "../section/landing/contactus";
import Footer from "../section/landing/footer";
// ----------------------------------------------------------------------


export default function Home() {
    return (
        <>
            <Navbars />
            <HeroSection/>
            <About/>
            <Teamus/>
            <ContactUs/>
            <Footer/>
        </>
    );
}
