import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import clsx from "clsx";

export default function About() {

    const Teconology = [
        {
            link: "https://react.dev/",
            image: "/landing/teconhology/react.png",
            name: "React js",
            desc: "React.js is a JavaScript library for building user interfaces."
        },
        {
            link: "https://nodejs.org/en",
            image: "/landing/teconhology/nodejs.png",
            name: "Node js",
            desc: "Node.js is a JavaScript runtime built on Chrome's V8 engine for executing server-side code."
        },
        {
            link: "https://legacy.reactjs.org/docs/react-api.html",
            image: "/landing/teconhology/api.png",
            name: "API",
            desc: "An API allows different software applications to communicate and interact with each other."
        },
        {
            link: "https://www.mongodb.com/",
            image: "/landing/teconhology/mongodb.png",
            name: "MongoDB",
            desc: "MongoDB is a NoSQL database that uses a flexible, document-oriented model to store and manage data"
        }
    ]

    return (
        <section className="h-full w-full lg:pt-10   flex justify-center bg-bg-off-white dark:bg-[#1e1e1e]" id="about">
            <div
                className="max-w-screen-xl px-4 text-dark "
            >
                <div className="py-10">
                    <div className="grid lg:grid-cols-2">
                        <div className="lg:pt-10  w-11/12">
                            <h1 className="text-4xl font-semibold mb-5 lg:mb-2 uppercase">
                                About Us
                                <span className={clsx(`mt-1 block border-b-4 rounded-full border-border-blue w-12`)} />
                            </h1>
                            <div className="lg:pt-20 px-2 border-0  lg:border-r-2">
                                <h1 className="text-2xl font-medium" >Notice Mangement System </h1>
                                <br></br>
                                <div className="leading-loose">
                                    <p className=" w-full lg:w-7/12 text-sm  text-text-off-white leading-6">
                                        A Notify is a digital platform designed to efficiently create, manage, and disseminate notices within an organization, such as a college or company. It allows administrators to post announcements, categorize them, and notify relevant users based on roles (e.g., students, faculty) through a user-friendly interface. The system streamlines communication and ensures that important information reaches the intended audience in a timely manner
                                    </p>
                                </div>
                                <div className="py-10">
                                    <Button
                                        radius="sm"
                                        color="primary"
                                        className="text-white px-12"
                                    >
                                        Login Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className="grid md:grid-cols-2 gap-5">
                                {
                                    Teconology.map((item, index) => {
                                        return (
                                            <Link
                                                href={item.link}
                                                className="bg-white h-[16rem] cursor-pointer transition-all duration-100" key={index}>
                                                <div className="flex flex-col px-5 pt-10">
                                                    <div className="size-20 shadow-lg rounded-full p-2 transition-transform duration-300 ease-in-out hover:scale-105">
                                                        <Image
                                                            src={item.image}
                                                            className="p-2"
                                                        />
                                                    </div>
                                                    <h1 className="font-semibold text-xl pt-5 py-2">{item.name}</h1>
                                                    <p className=" text-sm text-text-off-white">{item.desc}</p>
                                                </div>
                                            </Link>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}