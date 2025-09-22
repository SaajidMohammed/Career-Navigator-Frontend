import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css';

// SVG for the AI Chat logo
const ChatLogo = () => (
  <svg className="chat-icon ai" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 15.5H8.5V14H15.5V15.5ZM15.5 12.5H8.5V11H15.5V12.5ZM15.5 9.5H8.5V8H15.5V9.5Z" fill="currentColor"/>
  </svg>
);

// New SVG for the User Icon
const UserIcon = () => (
  <svg className="chat-icon user" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
  </svg>
);

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Career Navigator. Tell me about your interests, skills, and academic background to get started.", sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    // Placeholder for AI response
    setTimeout(() => {
      const aiResponse = { text: "Thank you for sharing! I'm analyzing your input...", sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="chat-page-container">
      <div className="chat-header">
        <ChatLogo />
        <h2 className="chat-title">AI Career Navigator</h2>
      </div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message-row ${message.sender}`}>
            {message.sender === 'ai' ? <ChatLogo /> : <UserIcon />}
            <div className={`chat-message ${message.sender}`}>
              <p className="message-text">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me a question..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;