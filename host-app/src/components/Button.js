import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => {
    switch (props.variant) {
      case 'primary': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'secondary': return '#f8f9fa';
      case 'danger': return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
      case 'success': return 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)';
      default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }};
  color: ${props => props.variant === 'secondary' ? '#495057' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid #e9ecef' : 'none'};
  padding: ${props => props.size === 'large' ? '12px 24px' : props.size === 'small' ? '6px 12px' : '8px 16px'};
  border-radius: 6px;
  font-size: ${props => props.size === 'large' ? '16px' : props.size === 'small' ? '12px' : '14px'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  
  ${props => props.fullWidth && `
    width: 100%;
    justify-content: center;
  `}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;