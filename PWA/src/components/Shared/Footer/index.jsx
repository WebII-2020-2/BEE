import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Mail, Instagram, Facebook, Phone } from 'react-feather';
import logo from '../../../assets/img/bee-logo-color.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo do BEE" className="logo-footer my-4" />
      <ListGroup horizontal className="footer-list list">
        <ListGroup.Item href="/promocoes" title="Ir para página de Promoções">
          <b>P</b>rodutos
        </ListGroup.Item>
        <ListGroup.Item href="/categorias" title="Ir para página de Categorias">
          <b>C</b>ategorias
        </ListGroup.Item>
        <ListGroup.Item href="/produtos" title="Ir para página dos produtos">
          <b>P</b>romoções
        </ListGroup.Item>
        <ListGroup.Item
          href="/sobre"
          title="Ir para página de informações sobre a loja"
        >
          <b>Q</b>uem Somos?
        </ListGroup.Item>
      </ListGroup>
      <p className="footer-contacts mb-0 mt-2">
        <b>F</b>ale conosco
      </p>
      <ListGroup horizontal className="footer-list list">
        <ListGroup.Item title="e-mail da loja">
          <Mail aria-label="ícone de e-mail" /> comercial@bee.com
        </ListGroup.Item>
        <ListGroup.Item title="Instagram da loja">
          <Instagram aria-label="ícone do instagram" /> @bee
        </ListGroup.Item>
        <ListGroup.Item title="Facebook da loja">
          <Facebook aria-label="ícone do facebook" /> bee.oficial
        </ListGroup.Item>
        <ListGroup.Item title="Telefone da loja">
          <Phone aria-label="ícone de telefone" /> (77) 99171-0606
        </ListGroup.Item>
      </ListGroup>
      <p className="footer-copyright p-2">
        <b>C</b>opyright &copy; 2021. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
