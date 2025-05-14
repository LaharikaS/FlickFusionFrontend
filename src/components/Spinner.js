import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerElement />
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  padding: 2rem;
`;

const SpinnerElement = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #e50914;
  animation: ${spin} 1s ease-in-out infinite;
`;

export default Spinner; 