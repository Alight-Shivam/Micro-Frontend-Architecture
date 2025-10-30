import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: ${props => props.padding || '20px'};
  margin: ${props => props.margin || '0'};
  transition: all 0.3s ease;
  
  ${props => props.hoverable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
  `}
  
  ${props => props.variant === 'outlined' && `
    border: 2px solid #e9ecef;
    box-shadow: none;
  `}
  
  ${props => props.variant === 'elevated' && `
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  `}
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
`;

const CardTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 4px 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CardSubtitle = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
`;

const CardContent = styled.div`
  color: #495057;
  line-height: 1.6;
`;

const CardFooter = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Card = ({ 
  children, 
  title,
  subtitle,
  footer,
  variant = 'default',
  hoverable = false,
  padding,
  margin,
  onClick,
  ...props 
}) => {
  return (
    <StyledCard
      variant={variant}
      hoverable={hoverable}
      padding={padding}
      margin={margin}
      onClick={onClick}
      {...props}
    >
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </StyledCard>
  );
};

export default Card;