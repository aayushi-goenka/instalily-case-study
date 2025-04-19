import React, { useState, useEffect } from 'react';
import { VscRobot } from "react-icons/vsc";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Typography, Button } from "antd";

const { Text } = Typography;

const HeaderWindow = () => {

    const toggleChannel = new BroadcastChannel("toggle-chat");
    const chatbotChannel = new BroadcastChannel('chatbot-channel');
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const toggleInputField = () => {
        setIsInputDisabled((prev) => !prev);
    };

    useEffect(() => {
        toggleChannel.postMessage(isInputDisabled.toString());
        isInputDisabled && chatbotChannel.postMessage('back');
    }, [isInputDisabled]);

    function handleBackButtonClick() {
        chatbotChannel.postMessage('back');
    }

    return (
        <div className='bg-white fixed top-0 left-0 right-0 z-10 flex items-center justify-between border-b-2 p-4 px-6'>
            <div className='flex items-center'>
                <Button onClick={handleBackButtonClick} type="text" className='self-center' icon={<MdOutlineKeyboardBackspace color="#474747" size={30}/>}/>
                <VscRobot size={54} className='color-primary mx-4 self-center'/>
                <div className='flex flex-col ml-2'>
                    <Text className='color-primary text-2xl' strong>Lily</Text>
                    <Text type="success" className='text-md'>
                        <span className='text-2xl'>&#x2022;</span> 
                        <span className='text-lg ml-1'>Online</span>
                    </Text>
                </div>
            </div>
            <div className='flex items-center'>
                <Button id="close" onClick={toggleInputField} className="bg-primary text-white px-4 py-2 rounded float-right">
                    {isInputDisabled ? "New Conversation" : "Close Conversation"}
                </Button>
            </div>
        </div>
    );
};

export default HeaderWindow;