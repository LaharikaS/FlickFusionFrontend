import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
        <NotFoundText>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </NotFoundText>
        <NotFoundButtons>
          <HomeButton to="/">
            <FaHome /> Go to Homepage
          </HomeButton>
          <SearchButton to="/search">
            <FaSearch /> Search Movies
          </SearchButton>
        </NotFoundButtons>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 576px) {
    font-size: 6rem;
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 1.5rem;

  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const NotFoundText = styled.p`
  font-size: 1.1rem;
  color: var(--text-gray);
  margin-bottom: 2rem;
`;

const NotFoundButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: var(--text-light);
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #f40612;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const SearchButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid var(--text-light);
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: var(--text-light);
    color: var(--background-dark);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default NotFound; 