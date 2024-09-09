"use client"
import { Avatar, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image } from "@nextui-org/react";
import { useState } from "react";

interface TeamMember {
    name: string;
    short: string;
    image_url?: string;
    des: string;
    role: string;
    teconology: string[];
}

export default function Teamus() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const ProjectTeam: TeamMember[] = [
        {
            name: "Mihir Kumar Donda",
            short: "MD",
            image_url: "/landing/team/mihir.png",
            des: "Responsible for creating the logo and designing visual elements for the Notify project, ensuring brand consistency and aesthetic appeal across all platforms.",
            role: "Designer",
            teconology: ["Networking", "HTML", "CSS"],
        },
        {
            name: "Ridham Savaliya",
            short: "RS",
            image_url: "/landing/team/ridham.jpeg",
            des: "Responsible for the frontend design and development, implementing user-friendly interfaces and ensuring responsive design for the Notify project.",
            role: "Frontend Developer",
            teconology: ["HTML", "CSS", "JavaScript", "Rect Js", "Next Ui", "Bootstarp", "Material Ui"]
        },
        {
            name: "Shashank Dash",
            short: "SD",
            image_url: "/landing/team/shashank.png",
            des: "Focuses on API integration, ensuring seamless communication between the Notify project and external services, and optimizing data flow.",
            role: "Frontend Developer",
            teconology: ["HTML", "CSS", "JavaScript", "Rect Js", "Api Integtration"]
        },
        {
            name: "Keyur Pansriya",
            short: "KP",
            image_url: "/landing/team/keyur.png",
            des: "Handles backend development, including server-side logic, database management, and API creation, ensuring robust and scalable solutions for the  Notify project.",
            role: "Backend Developer",
            teconology: ["HTML", "CSS", "JavaScript", "Rect Js", "Next Js", "PHP", "Api Handling", "Node js"]
        },
    ]

    const handleAvatarClick = (member: TeamMember) => {
        setSelectedMember(member);
        onOpen();
    };

    const renderTeamSection = (role: string, title: string) => {
        return (
            <div className="text-center">
                <h1 className="text-2xl lg:text-4xl font-extrabold py-5 lg:py-10">{title}</h1>
                <div className="flex justify-center items-center gap-10 flex-wrap">
                    {ProjectTeam.filter(member => member.role === role).map((member, idx) => (
                        <Tooltip key={idx} content={member.name} color="primary" className="text-white">
                            <Avatar
                                src={member.image_url}
                                isBordered
                                color="primary"
                                classNames={{ base: "h-24 w-24 cursor-pointer" }}
                                onClick={() => handleAvatarClick(member)}
                            />
                        </Tooltip>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="h-full w-full py-10 flex justify-center dark:bg-[#1e1e1e]" id="team">
            <div className="max-w-screen-xl px-4 text-dark">
                {renderTeamSection("Designer", "Designer")}
                {renderTeamSection("Frontend Developer", "Frontend Developer")}
                {renderTeamSection("Backend Developer", "Backend Developer")}
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {selectedMember && (
                        <>
                            <ModalHeader className="flex flex-col justify-center items-center gap-1">
                                <Avatar
                                    src={selectedMember.image_url}
                                    isBordered
                                    color="primary"
                                    classNames={{ base: "h-24 w-24" }}
                                />
                                {selectedMember.name}
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Role :- {
                                        selectedMember.role
                                    }
                                </p>
                                <p>
                                    Skills :- {
                                        <ul className="py-2">
                                            {selectedMember.teconology.map((tech, index) => (
                                                <li key={index} className="ml-16 list-disc">{tech}</li>
                                            ))}
                                        </ul>
                                    }
                                </p>
                                <p>
                                    Describe :-
                                </p>
                                <p>
                                    {selectedMember.des}
                                </p >
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    );
}
