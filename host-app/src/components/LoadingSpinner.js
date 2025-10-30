import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
  color: #7f8c8d;
  font-size: 16px;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const SubText = styled.div`
  color: #adb5bd;
  font-size: 14px;
  margin-top: 8px;
`;

const LoadingSpinner = ({ message = 'Loading...', subMessage = 'Please wait while we load the application' }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
      <SubText>{subMessage}</SubText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;