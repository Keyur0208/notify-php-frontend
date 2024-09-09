"use client"
import { Button, Image, Link, link } from "@nextui-org/react";

export default function HeroSection() {
    return (
        <section>
            <div className="mx-auto flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center w-full xl:max-w-[1280px] p-5 lg:py-20 lg:pb-28 gap-0 sm:gap-0 md:gap-20 lg:gap-x-20 xl:gap-x-16" >
                <div className="w-full sm:w-10/12 md:w-5/12 lg:w-5/12">
                    <Image
                        width={538}
                        src="/landing/guest.png"
                        className="h-auto rounded-none "
                    />
                </div>
                <div className="w-full sm:w-11/12 md:w-4/12 lg:w-6/12 sm:mt-5 lg:mt-0">
                    <p className="font-semibold mb-4 text-2xl lg:text-4xl">
                        Welcome to Amroli SFI College
                    </p>
                    <div className="leading-loose">
                        <p className="text-md text-slate-500 ">
                            Prof. V. B. Shah Institute of Management, R.V. Patel College of Commerce (English Medium), V. L. Shah College of Commerce ( Gujarati Medium) and Sutex Bank College of Computer Applications & Science are self-financed colleges affiliated to the Veer Narmad South Gujarat University, Surat
                        </p>
                    </div>
                    <div className="mt-5">
                        <Button
                            as={Link}
                            target="_blank"
                            radius="sm"
                            color="primary"
                            className="text-white px-16"
                            href="https://www.amrolicollege.ac.in/"
                        >
                            Visit Us
                        </Button>
                    </div>
                </div>
            </div>

            
        </section>
    )
}