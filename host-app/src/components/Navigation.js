import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 8px;
`;

const NavButton = styled.button`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    'transparent'};
  color: ${props => props.active ? 'white' : '#495057'};
  border: 2px solid ${props => props.active ? 'transparent' : '#e9ecef'};
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
      'rgba(102, 126, 234, 0.1)'};
    border-color: ${props => props.active ? 'transparent' : '#667eea'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Navigation = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'email', label: 'Email', icon: '📧' },
  ];

  return (
    <NavContainer>
      <NavContent>
        {navItems.map(item => (
          <NavButton
            key={item.id}
            active={currentView === item.id}
            onClick={() => onNavigate(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavButton>
        ))}
      </NavContent>
    </NavContainer>
  );
};

export default Navigation;