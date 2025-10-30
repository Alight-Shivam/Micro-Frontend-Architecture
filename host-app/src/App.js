import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';
import EventBus from './utils/EventBus';

// Lazy load remote micro-frontends
const ChatApp = React.lazy(() => import('chatApp/App'));
const EmailApp = React.lazy(() => import('emailApp/App'));

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  width: 100%;
`;

const ContentArea = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const WelcomeSection = styled.div`
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const WelcomeTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 300;
`;

const WelcomeText = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 40px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 8px;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.5;
`;

function App() {
  const [currentView, setCurrentView] = useState('home');
  
  const handleNavigate = (view) => {
    console.log(`🧭 Navigating to: ${view}`);
    setCurrentView(view);
    
    // Broadcast navigation event to all micro-frontends
    EventBus.emit('navigation', { currentView: view });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return (
          <Suspense fallback={<LoadingSpinner message="Loading Chat App..." />}>
            <ChatApp />
          </Suspense>
        );
      case 'email':
        return (
          <Suspense fallback={<LoadingSpinner message="Loading Email App..." />}>
            <EmailApp />
          </Suspense>
        );
      default:
        return (
          <>
            <WelcomeSection>
              <WelcomeTitle>🚀 Micro-Frontend Architecture</WelcomeTitle>
              <WelcomeText>
                Welcome to our modular application architecture! Each section is powered by 
                independent micro-frontends that work together seamlessly using Module Federation.
              </WelcomeText>
            </WelcomeSection>
            <FeatureGrid>
              <FeatureCard>
                <FeatureIcon>💬</FeatureIcon>
                <FeatureTitle>Real-time Chat</FeatureTitle>
                <FeatureDescription>
                  Interactive chat system with real-time messaging, emoji support, 
                  and smart bot responses.
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard>
                <FeatureIcon>📧</FeatureIcon>
                <FeatureTitle>Email Management</FeatureTitle>
                <FeatureDescription>
                  Complete email client with inbox management, compose functionality, 
                  and advanced filtering.
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard>
                <FeatureIcon>🔧</FeatureIcon>
                <FeatureTitle>Modular Design</FeatureTitle>
                <FeatureDescription>
                  Each feature is an independent micro-frontend that can be developed, 
                  deployed, and scaled separately.
                </FeatureDescription>
              </FeatureCard>
            </FeatureGrid>
          </>
        );
    }
  };

  return (
    <AppContainer>
      <Header />
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      <MainContent>
        <ContentArea>
          {renderContent()}
        </ContentArea>
      </MainContent>
    </AppContainer>
  );
}

export default App;