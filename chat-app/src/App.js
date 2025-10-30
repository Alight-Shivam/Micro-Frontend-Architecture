import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatComponent from './components/ChatComponent';

// Try to import shared components from host, with fallbacks
let Button, Card, EventBus;
try {
  ({ Button, Card, EventBus } = require('hostApp/SharedComponents'));
} catch (error) {
  console.warn('Chat App: Running in standalone mode - shared components not available');
  // Fallback components (simple versions)
  Button = styled.button`
    background: #667eea;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  `;
  Card = styled.div`
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  `;
}

const ChatContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const StandaloneHeader = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 30px;
`;

const StandaloneTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 10px;
`;

const StandaloneSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const App = () => {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running standalone or within host app
    const checkMode = () => {
      try {
        const isInIframe = window.self !== window.top;
        const hasHostApp = window.hostApp !== undefined;
        setIsStandalone(!isInIframe && !hasHostApp);
        
        if (!isInIframe && !hasHostApp) {
          console.log('🗨️ Chat App: Starting in standalone mode');
        } else {
          console.log('🗨️ Chat App: Starting within host application');
        }
      } catch (error) {
        console.log('🗨️ Chat App: Starting in standalone mode (fallback)');
        setIsStandalone(true);
      }
    };

    checkMode();

    // Listen for host app events if EventBus is available
    if (EventBus) {
      EventBus.on('navigation', (data) => {
        console.log('🗨️ Chat App: Received navigation event', data);
      });

      return () => {
        EventBus.off('navigation');
      };
    }
  }, []);

  return (
    <ChatContainer>
      <ChatWrapper>
        {isStandalone && (
          <StandaloneHeader>
            <StandaloneTitle>💬 Chat Application</StandaloneTitle>
            <StandaloneSubtitle>Micro-Frontend Demo</StandaloneSubtitle>
          </StandaloneHeader>
        )}
        <ChatComponent 
          Button={Button} 
          Card={Card}
          isStandalone={isStandalone}
        />
      </ChatWrapper>
    </ChatContainer>
  );
};

export default App;