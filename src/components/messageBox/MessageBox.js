import React, { useEffect } from 'react';
import { Button, Typography } from "antd";
import { FaRobot } from "react-icons/fa6";
import ReactLoading from 'react-loading';

const { Text } = Typography;

const MessageBox = ({ message, role }) => {

    const [loader, setLoader] = React.useState(true);

    useEffect(() => {
        if (role === 'assistant') {
            setTimeout(() => {
                setLoader(false);
            }, 1500);
        } else {
            setLoader(false);
        }
    }, []);

    return role === 'assistant' ? (
        message != 'Close Conversation' ? (
            <div className='flex my-4'>
                <div className='self-end'>
                    <FaRobot size={16} className='color-primary' />
                </div>
                <div className='self-start'>
                    <div className='bg-light-gray p-4 rounded-r-3xl rounded-t-3xl shadow-2xs ml-2'>
                        {loader ? <ReactLoading type={'bubbles'} color={'gray'} height={30} width={30} />
                        : <Text strong className='text-gray-600'>{message}</Text>}
                    </div>
                </div>
            </div>
        ) : (
            <Button type="text" id="close-button" className='bg-light-gray p-4 rounded-r-3xl rounded-t-3xl shadow-2xs ml-2'/>
        )
    ) : (
        <div className='flex justify-end ml-[25%]'>
            <div className='self-start'>
                <div className='bg-primary p-4 rounded-l-3xl rounded-t-3xl shadow-2xs'>
                    <Text strong className='text-white'>{message}</Text>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;