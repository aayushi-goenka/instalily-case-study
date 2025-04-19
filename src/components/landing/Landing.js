import React from 'react';
import { VscRobot } from "react-icons/vsc";
import { Button } from 'antd';
import { Typography } from "antd";

const { Text } = Typography;

const Landing = ({ handleContinue }) => {

    const handleContinueClicked = () => {
        handleContinue();
    };

    return (
        <div className="flex flex-col items-center justify-evenly h-screen bg-primary">
            <div className="text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Hi, I'm Lily! Your AI assistant.</h1>
                <p className="text-center text-md sm:text-lg mb-4">I'm here to help you with any questions<br /> you might have.</p>
            </div>
    
            <div className="bg-white rounded-full p-5 mb-4">
                <VscRobot className='color-primary' size={120} />
            </div>

            <Button onClick={handleContinueClicked} id="continue-button"
                className="bg-white rounded-xl flex items-center justify-center px-24 py-8">
                <Text className='color-primary text-lg' strong>Continue &gt;</Text>
            </Button>
        </div>
    );
};

export default Landing;