import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterLogo to="/">
            <span>Flick</span>Fusion
          </FooterLogo>
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialLink>
          </SocialLinks>
        </FooterTop>

        <FooterLinks>
          <FooterLinkColumn>
            <FooterLinkTitle>FlickFusion</FooterLinkTitle>
            <FooterLink to="/booking">Home</FooterLink>
            <FooterLink to="/">Browse</FooterLink>
            <FooterLink to="/search">Search</FooterLink>
          </FooterLinkColumn>

          <FooterLinkColumn>
            <FooterLinkTitle>Support</FooterLinkTitle>
            <FooterLink to="#">Help Center</FooterLink>
            <FooterLink to="#">Contact Us</FooterLink>
            <FooterLink to="#">FAQ</FooterLink>
          </FooterLinkColumn>

          <FooterLinkColumn>
            <FooterLinkTitle>Legal</FooterLinkTitle>
            <FooterLink to="#">Terms of Service</FooterLink>
            <FooterLink to="#">Privacy Policy</FooterLink>
            <FooterLink to="#">Cookie Preferences</FooterLink>
          </FooterLinkColumn>

          <FooterLinkColumn>
            <FooterLinkTitle>Account</FooterLinkTitle>
            <FooterLink to="/login">Login</FooterLink>
            <FooterLink to="/register">Register</FooterLink>
            <FooterLink to="/profile">My Account</FooterLink>
          </FooterLinkColumn>
        </FooterLinks>

        <FooterBottom>
          <Copyright>
            &copy; {currentYear} FlickFusion. All rights reserved.
          </Copyright>
          <FooterBottomLinks>
            <FooterBottomLink to="#">Privacy</FooterBottomLink>
            <FooterBottomLink to="#">Terms</FooterBottomLink>
            <FooterBottomLink to="#">Cookies</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #0b0b0b;
  color: #999;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FooterLogo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  
  span {
    color: #e50914;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e50914;
    transform: translateY(-3px);
  }
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterLinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLinkTitle = styled.h4`
  color: white;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #999;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const FooterBottomLink = styled(Link)`
  color: #999;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

export default Footer; 