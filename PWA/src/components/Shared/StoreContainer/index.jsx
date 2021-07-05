import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../NavBar';
import Footer from '../Footer';
import './StoreContainer.css';

function StoreContainer({ children }) {
  return (
    <>
      <NavBar />
      <Container className="store-container">{children}</Container>
      <Footer />
    </>
  );
}

export default StoreContainer;
