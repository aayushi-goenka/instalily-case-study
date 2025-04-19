import React, { useState, useEffect, useRef } from "react";
import { getAIMessage } from "../../services/chatbotApi";
import HeaderWindow from "../headerWindow/HeaderWindow";
import FooterWindow from "../footerWindow/FooterWindow";
import MessageBox from "../messageBox/MessageBox";
import Landing from "../landing/Landing";
import { Typography } from "antd";

const { Text } = Typography;

function ChatWindow() {

  const defaultMessage = [{
    role: "assistant",
    content: "Hi, I'm Lily, an AI assistant for Part Select. You can ask me any questions related to Refrigerator/Dishwasher parts or Transactions. How may I assist you today?"
  }];

  const [messages, setMessages] = useState(defaultMessage);
  const [showChat, setShowChat] = useState(false);
  const [toggleChat, setToggleChat] = React.useState(false);

  const query = {
    query: "",
  }
  const toggleChannel = new BroadcastChannel("toggle-chat");
  const chatbotChannel = new BroadcastChannel('chatbot-channel');

  function handleBackButtonClick() {
    chatbotChannel.postMessage('back');
  }

  useEffect(() => {
    toggleChannel.onmessage = (event) => {
      if (event.data === 'true') {
        setToggleChat(true);
        handleBackButtonClick();
      } else if (event.data === 'false') {
        setToggleChat(false);
        setMessages(defaultMessage);
      }
    }
  }, [toggleChannel]);

  const messagesEndRef = useRef(null);

  const handleContinue = () => {
    setShowChat(true);
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (input) => {
    if (input.trim() !== "") {
      setMessages(prevMessages => [...prevMessages, { role: "user", content: input }]);
      query.query = input;
      const newMessage = await getAIMessage(query);
      const messageContent = {
        role: "assistant",
        content: newMessage.response
      }
      setMessages(prevMessages => [...prevMessages, messageContent]);
    }
  };

  return (
    showChat ? (
      <div>
        <HeaderWindow />
        <div className="mb-24 mt-24 px-8 py-4">
          <div className="py-4">
            {messages.map((message, index) => (
              <div key={index}>
                {message.content && (
                  <MessageBox message={message.content} role={message.role} />
                )}
              </div>
            ))}
          </div>
          {toggleChat && (
            <div>
              <Text className="text-center text-gray-500 text-sm mb-4">
                This conversation is now closed. Please click the button below to open a new conversation.
              </Text>
            </div>
          )}
          <div ref={messagesEndRef} />
          <FooterWindow handleSend={handleSend} />
        </div>
      </div>
    ) : (
      <div className="">
        <Landing handleContinue={handleContinue} />
      </div>
    )
  );
}

export default ChatWindow;
