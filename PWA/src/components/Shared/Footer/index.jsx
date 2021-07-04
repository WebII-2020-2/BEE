import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Mail, Instagram, Facebook, Phone } from 'react-feather';
import logo from '../../../assets/img/bee-logo-color.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo do BEE" className="logo-footer my-4" />
      <ListGroup horizontal variant="flush" className="footer-list list">
        <ListGroup.Item>
          <b>P</b>rodutos
        </ListGroup.Item>
        <ListGroup.Item>
          <b>C</b>ategorias
        </ListGroup.Item>
        <ListGroup.Item>
          <b>P</b>romoções
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Q</b>uem Somos?
        </ListGroup.Item>
      </ListGroup>
      <p className="footer-contacts mb-0 mt-2">
        <b>F</b>ale conosco
      </p>
      <ListGroup horizontal variant="flush" className="footer-list list">
        <ListGroup.Item>
          <Mail /> comercial@bee.com
        </ListGroup.Item>
        <ListGroup.Item>
          <Instagram /> @bee
        </ListGroup.Item>
        <ListGroup.Item>
          <Facebook /> bee.oficial
        </ListGroup.Item>
        <ListGroup.Item>
          <Phone /> (77) 99171-0606
        </ListGroup.Item>
      </ListGroup>
      <p className="footer-copyright p-2">
        <b>C</b>opyright &copy; 2021. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
