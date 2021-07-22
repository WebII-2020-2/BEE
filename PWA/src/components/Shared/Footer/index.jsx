import React from 'react';
import { Nav } from 'react-bootstrap';
import { Mail, Instagram, Facebook, Phone } from 'react-feather';
import logo from '../../../assets/img/bee-logo-color.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo do BEE" className="logo-footer my-4" />
      <Nav className="footer-nav">
        <Nav.Link href="/promocoes" title="Produtos">
          <b>P</b>rodutos
        </Nav.Link>
        <Nav.Link href="/categorias" title="Ir para página de Categorias">
          <b>C</b>ategorias
        </Nav.Link>
        <Nav.Link
          href="/sobre"
          title="Ir para página de informações sobre a loja"
        >
          <b>Q</b>uem Somos?
        </Nav.Link>
      </Nav>
      <p className="footer-contacts mb-0 mt-2">
        <b>F</b>ale conosco
      </p>
      <Nav className="footer-nav my-2">
        <Nav.Link href="#" title="e-mail da loja">
          <Mail aria-label="ícone de e-mail" /> comercial@bee.com
        </Nav.Link>
        <Nav.Link href="#" title="Instagram da loja">
          <Instagram aria-label="ícone do instagram" /> @bee
        </Nav.Link>
        <Nav.Link href="#" title="Facebook da loja">
          <Facebook aria-label="ícone do facebook" /> bee.oficial
        </Nav.Link>
        <Nav.Link href="#" title="Telefone da loja">
          <Phone aria-label="ícone de telefone" /> (77) 99171-0606
        </Nav.Link>
      </Nav>
      <p className="footer-copyright p-2">
        <b>C</b>opyright &copy; 2021. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
