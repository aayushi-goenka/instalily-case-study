import React, { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import { IoSend } from "react-icons/io5";

const FooterWindow = ({ handleSend }) => {
  const [input, setInput] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const toggleChannel = new BroadcastChannel("toggle-chat");

  const handleLocalSend = () => {
    if (input.trim()) {
      handleSend(input);
      setInput("");
    }
  };

  const toggleInputField = () => {
    setIsInputDisabled((prev) => !prev);
  };

  useEffect(() => {
    toggleChannel.onmessage = (event) => {
      if (event.data === 'true') {
        setIsInputDisabled(true);
      } else if (event.data === 'false') {
        setIsInputDisabled(false);
      }
    }
  }, [toggleChannel]);

  return (
    <div className='fixed z-10 bottom-0 left-0 right-0 p-8 bg-white'>
      <Space.Compact size='large flex items-center' style={{ width: '100%' }}>
        <Input.TextArea
          size='large'
          style={{ boxShadow: '0px 10px 20px 1px rgb(0 0 0 / 0.25)', lineHeight: '1' }}
          className='rounded-[50px] border-0 pr-[40px] pt-[20px] pl-[20px] pb-[10px]'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          onPressEnter={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleLocalSend();
              e.preventDefault();
            }
          }}
          disabled={isInputDisabled}
        />
        <Button
          type="text"
          className='color-primary self-center absolute right-10'
          icon={<IoSend size={24} className='color-primary' />}
          onClick={handleLocalSend}
          disabled={isInputDisabled}
        />
      </Space.Compact>
    </div>
  );
};

export default FooterWindow;