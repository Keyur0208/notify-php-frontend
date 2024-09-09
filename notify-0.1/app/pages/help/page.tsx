"use client";
import { useState, useEffect, useRef } from "react";
import { Avatar, Button, Input, Skeleton, Image } from "@nextui-org/react";
import { ChartAiAdd } from "../../../src/store/chartAi/chartaislice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../src/store/store";
import { DepartmentIcon, HelpIcon } from "../../../style/icon/deshoboard";
import { ReactjsIocn } from "../../../style/icon/reactjsiocn";

type ChatMessage = {
    sender: 'user' | 'bot';
    text: string;
};

export default function Page() {
    const dispatch: AppDispatch = useDispatch();
    const { data, loading } = useSelector((state: RootState) => state.chartai.ChartAiData);

    const [message, setMessage] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const AIContent: React.FC<{ content: string }> = ({ content }) => {
        const renderContent = (markdown: string): string => {

            const htmlContent = markdown
                // Convert headings
                .replace(/^## (.*)$/gm, '<h2 class="text-2xl font-semibold mb-2">$1</h2>') // Heading 2
                .replace(/^### (.*)$/gm, '<h3 class="text-xl font-semibold mb-2">$1</h3>') // Heading 3 (if needed)

                // Convert bold text
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

                // Convert lists
                .replace(/^\* (.*)$/gm, '<li>$1</li>') // List items
                .replace(/(<li>.*<\/li>)/g, '<ul class="list-disc ml-5">$1</ul>') // Wrap lists with <ul>

                // Handle paragraphs and line breaks
                .replace(/\n{2,}/g, '</p><p>') // Double line breaks become paragraph breaks
                .replace(/([^\n])\n(?!\n)/g, '$1<br>') // Single line breaks become <br> tags

                // Wrap the content in a paragraph if it’s not already inside a block element
                .replace(/^(?!<h2>|<h3>|<ul>|<p>|<br>)/gm, '<p>$&') // Add <p> to the start of the content
                .replace(/(?<!<\/p>|<\/h2>|<\/h3>|<\/ul>)(?=$)/gm, '</p>'); // Close the paragraph at the end of content

            return `<p>${htmlContent}</p>`;
        };

        return (
            <div className="prose lg:prose-xl p-1 bg-white border border-gray-300 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: renderContent(content) }} />
            </div>
        );
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const sendMessage = async () => {
        setPredefinedMessage(false);
        if (!message.trim()) return;
        const userMessage: ChatMessage = { sender: 'user', text: message };
        setChatHistory((prevHistory) => [...prevHistory, userMessage]);
        setMessage('');

        dispatch(ChartAiAdd({ message }));
    };

    useEffect(() => {
        if (typeof data === 'string') {
            const botMessage: ChatMessage = { sender: 'bot', text: data };
            setChatHistory((prevHistory) => [...prevHistory, botMessage]);
        }
    }, [data]);

    const [PredefinedMessage, setPredefinedMessage] = useState(true);

    const handlePredefinedMessage = (message: string) => {
        setPredefinedMessage(false)
        const userMessage: ChatMessage = { sender: 'user', text: message };
        setChatHistory((prevHistory) => [...prevHistory, userMessage]);
        dispatch(ChartAiAdd({ message }));
    };


    return (
        <>
            <div className="relative  h-[calc(100vh-10rem)] flex flex-col">
                <div
                    ref={chatContainerRef}
                    className="chat-history overflow-y-auto flex-1 p-2 bg-bg-off-white-dashboard rounded-lg relative before:bg-notify-logo before:opacity-10 before:absolute before:inset-0 before:bg-no-repeat before:bg-center before:bg-auto"
                >
                    {
                        PredefinedMessage &&
                        (
                            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                                <div className="flex gap-5">
                                    <Button
                                        onClick={() => handlePredefinedMessage("What is React Js?")}
                                        className="h-28 w-52">
                                        <div className="flex flex-col items-center justify-center gap-1 ">
                                            <ReactjsIocn/>
                                            <div className="capitalize text-wrap text-sm">
                                               What is React Js?
                                            </div>
                                        </div>
                                    </Button>
                                    <Button
                                        onClick={() => handlePredefinedMessage("Sutex Bank College of Computer Applications and Science, Surat")}
                                        className="h-28 w-52">
                                        <div className="flex flex-col items-center justify-center gap-1 ">
                                            <DepartmentIcon />
                                            <div className="capitalize  text-wrap text-sm">
                                                Sutex Bank College of Computer Applications & Science
                                            </div>
                                        </div>
                                    </Button>
                                    <Button
                                        onClick={() => handlePredefinedMessage(" Waht is AI ?")}
                                        className="h-28 w-52">
                                        <div className="flex flex-col items-center justify-center gap-1 ">
                                            <Image
                                                src="/ai.png"
                                                className="size-8"
                                            />
                                            <div className="capitalize  text-wrap text-sm">
                                                Waht is AI ?
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        )
                    }


                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`flex items-start ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} my-2`}
                        >
                            {chat.sender === 'user' ? (
                                <div className="flex items-center">
                                    <Avatar
                                        alt="User"
                                        name="KP"
                                        className="h-10 w-10 p-1 mr-2"
                                    />
                                    <div className="p-2 bg-blue-500 text-white rounded-lg max-w-xs">
                                        {chat.text}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex">
                                    <Avatar
                                        src='/notify.png'
                                        alt="AI"
                                        className="h-10 w-10 p-1 mr-2"
                                    />
                                    <div className="p-1 bg-gray-300 text-black rounded-lg w-full">
                                        <AIContent content={chat.text} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex items-center">
                            <div>
                                <Skeleton className="flex rounded-full w-10 h-10 mr-2" />
                            </div>
                            <div>
                                <Skeleton className="p-2 rounded-lg w-96 h-10" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex mt-4 gap-2">
                    <Input
                        className="flex-grow  rounded-lg"
                        type="text"
                        fullWidth
                        value={message}
                        autoComplete="false"
                        placeholder="Enter your message..."
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        onKeyPress={(e) => { e.key === 'Enter' && sendMessage();}}
                    />
                    <Button
                        color="primary"
                        className="text-white"
                        onClick={sendMessage}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </>
    );
}
