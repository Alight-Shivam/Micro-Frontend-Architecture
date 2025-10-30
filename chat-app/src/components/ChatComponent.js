import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  overflow: hidden;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  text-align: center;
`;

const ChatTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const ChatSubtitle = styled.p`
  margin: 5px 0 0 0;
  opacity: 0.9;
  font-size: 0.9rem;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #f8f9fa;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.sender === 'user' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'white'};
  color: ${props => props.sender === 'user' ? 'white' : '#2c3e50'};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    ${props => props.sender === 'user' ? 'right: 10px' : 'left: 10px'};
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: ${props => props.sender === 'user' ? '#764ba2' : 'white'};
    border-bottom: 0;
  }
`;

const MessageText = styled.div`
  margin-bottom: 4px;
  line-height: 1.4;
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  opacity: 0.7;
  text-align: right;
`;

const InputContainer = styled.div`
  padding: 20px;
  background: white;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 12px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 20px;
`;

const TypingBubble = styled.div`
  background: white;
  border-radius: 18px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #adb5bd;
  border-radius: 50%;
  animation: typing 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-10px);
    }
  }
`;

const ChatComponent = ({ Button: HostButton, Card: HostCard, isStandalone = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! Welcome to the Chat micro-frontend. How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const botResponses = [
    "That's interesting! Tell me more about that.",
    "I understand. How does that make you feel?",
    "Great point! I hadn't thought of it that way.",
    "Can you elaborate on that?",
    "That reminds me of something I heard recently...",
    "Fascinating! What led you to that conclusion?",
    "I see what you mean. That's a common concern.",
    "Thanks for sharing that with me!",
    "That's a great question. Let me think about it...",
    "I appreciate your perspective on this topic.",
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatCard>
      <ChatHeader>
        <ChatTitle>💬 Smart Chat Assistant</ChatTitle>
        <ChatSubtitle>
          {isStandalone ? 'Standalone Mode' : 'Powered by Micro-Frontend Architecture'}
        </ChatSubtitle>
      </ChatHeader>

      <MessagesContainer>
        {messages.map(message => (
          <Message key={message.id} sender={message.sender}>
            <MessageBubble sender={message.sender}>
              <MessageText>{message.text}</MessageText>
              <MessageTime>{message.timestamp}</MessageTime>
            </MessageBubble>
          </Message>
        ))}
        
        {isTyping && (
          <TypingIndicator>
            <TypingBubble>
              <TypingDot delay={0} />
              <TypingDot delay={0.2} />
              <TypingDot delay={0.4} />
            </TypingBubble>
          </TypingIndicator>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <ChatInput
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          title="Send message"
        >
          📤
        </SendButton>
      </InputContainer>
    </ChatCard>
  );
};

export default ChatComponent;