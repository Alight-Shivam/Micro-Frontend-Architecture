import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  color: #495057;
  font-size: 14px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:disabled {
    background: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #adb5bd;
  }
  
  ${props => props.error && `
    border-color: #ff6b6b;
    
    &:focus {
      border-color: #ff6b6b;
      box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
    }
  `}
`;

const ErrorText = styled.span`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 2px;
`;

const Input = ({ 
  label, 
  error, 
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  ...props 
}) => {
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default Input;