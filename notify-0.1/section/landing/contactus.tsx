import clsx from "clsx";
import ContactUsform from "../../componets/contactform";

export default function ContactUs() {
    return (
        <section className="h-full w-full lg:pt-10  flex justify-center bg-bg-off-white dark:bg-[#1e1e1e]" id="contactUs">
            <div
                className="max-w-screen-xl px-4 text-dark "
            >
                <div className="py-10">
                    <h1 className="text-4xl font-semibold mb-2 uppercase">
                        Contact Us
                        <span className={clsx(`mt-1 block border-b-4 rounded-full border-border-blue w-12`)} />
                    </h1>
                    <div className="grid lg:grid-cols-2 gap-5">
                        <div className="lg:pt-10 w-full lg:w-11/12">
                            <ContactUsform/>
                        </div>
                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9052836839087!2d72.8499274750375!3d21.23560418046601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f27ee8159e3%3A0xf6defb4d03e81080!2sSutex%20Bank%20College%20of%20Computer%20Applications%20%26%20Science!5e0!3m2!1sen!2sin!4v1723511159688!5m2!1sen!2sin"
                                className=" w-full h-full"
                                loading="lazy" >

                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}