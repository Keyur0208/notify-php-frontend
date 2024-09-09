"use client"
import { Button, Image } from "@nextui-org/react";
import { Heading } from "../../../common/heading";
import Confetti from 'react-confetti';
import React from "react";

export default function Bookmark() {
    const [showConfetti, setShowConfetti] = React.useState(true);
    setTimeout(() => setShowConfetti(false), 3000);

    return (
        <>
            {showConfetti && (
                <Confetti
                    colors={['#ff5733', '#33ff57', '#3357ff', '#f4ff33']}
                />
            )}

            <Heading title="BookMark" />
            <div className=" flex flex-col justify-center items-center">
                <div >
                    <Image
                        src="/notify.png"
                        alt="logo"
                        className=" h-72"
                    />
                </div>
                <Button
                >
                    <div className=" flex  items-center justify-center">
                        <span className=" text-2xl">🎉</span>
                        Comming Soon
                        <span className=" text-2xl">🎉</span>
                    </div>
                </Button>
            </div>
        </>
    )
}