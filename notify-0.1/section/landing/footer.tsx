import { Button, Image, Input } from "@nextui-org/react";
import { FaceBookIcon, InstagramIcon, LinkdinIcon, TwiiterIcon } from "../../public/landing/social-media/icon";

export default function Footer() {
    return (
        <section className="h-full w-full pt-5 relative flex justify-center">
            <div
                className="max-w-screen-xl text-dark px-4 "
            >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center pb-8">
                    <div className="w-full md:w-5/12">
                        <div className="flex justify-center">
                            <Image
                                src="/logo.png"
                                className="size-48"
                                alt="Dark_icon"
                            />
                        </div>
                        <p>
                            We are proficient in all the majorly popular technologies and languages of the current time. Our expert team can realize your requirements in no time using your preferred tech stack
                        </p>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 pt-5">
                            <div>
                                <h1 className="font-semibold text-xl">Company</h1>
                                <ul className="pt-4">
                                    <li>Home</li>
                                    <li>About Us</li>
                                    <li>Team</li>
                                    <li>Contact  Us</li>
                                </ul>
                            </div>
                            <div>
                                <div className="pt-10 lg:py-0">
                                    <h1 className="font-semibold text-xl">Let’s Connected</h1>
                                    <div className="flex flex-nowrap py-4 gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Your Email...."
                                            variant="bordered"
                                        />
                                        <Button
                                            color="primary"
                                            radius="sm"
                                            className="text-white"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                                <div className="pt-10">
                                    <h1 className="font-semibold text-xl">Social Media</h1>
                                    <div className="flex items-center gap-4 pt-2 cursor-pointer">
                                        <InstagramIcon />
                                        <FaceBookIcon/>
                                        <TwiiterIcon/>
                                        <LinkdinIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="text-center">
                    <h1 className="p-5 text-sm ">© COPYRIGHT 2024 - 2024 , NOTIFY INFOTECH LLP, ALL RIGHTS RESERVED.</h1>
                </div>
            </div>

        </section>
    )
}