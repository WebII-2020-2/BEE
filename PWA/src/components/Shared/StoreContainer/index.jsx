import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../NavBar';
import Footer from '../Footer';
import './StoreContainer.css';

function StoreContainer({ children, title }) {
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  document.title = `BEE - ${formattedTitle}`;
  return (
    <>
      <NavBar />
      <Container className="store-container">{children}</Container>
      <Footer />
    </>
  );
}

export default StoreContainer;
