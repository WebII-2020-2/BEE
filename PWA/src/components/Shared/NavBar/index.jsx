import React from 'react';
import {
  Button,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { ShoppingCart, Search, User } from 'react-feather';
import logoNav from '../../../assets/img/bee-logo-color.svg';
import './NavBar.css';

function NavBar() {
  return (
    <Navbar variant="dark" className="navbar-store store-container" expand="lg">
      <Navbar.Brand href="/" className="main-logo">
        <Image src={logoNav} alt="logotipo do site BEE" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-store" className="navbar-store" />
      <Navbar.Collapse id="navbar-store">
        <Nav className="links">
          <Nav.Link href="/promocoes">Promoções</Nav.Link>
          <NavDropdown title="Categorias">
            <NavDropdown.Item href="/categorias/graos">Grãos</NavDropdown.Item>
            <NavDropdown.Item href="/categorias/laticinios">
              Laticínios
            </NavDropdown.Item>
            <NavDropdown.Item href="/categorias/apicolas">
              Apícolas
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/categorias" className="dropdown-item">
              Todas as categorias
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/sobre">Sobre</Nav.Link>
        </Nav>
        <Nav className="actions">
          <Form className="search">
            <FormControl
              id="pesquisa-produto-nav"
              type="search"
              placeholder="Pesquisar"
              aria-label="Campo de pesquisa"
            />
            <Button
              type="submit"
              className="button-search"
              variant="outline-warning"
              aria-label="Botao de pesquisa"
            >
              <Search aria-label="Ícone de pesquisa" />
            </Button>
          </Form>
          <Nav.Link href="/user/login">
            Login <User aria-label="Ícone de usuário" />
          </Nav.Link>
          <Nav.Link href="/carrinho">
            Carrinho <ShoppingCart aria-label="Ícone de carrinho de compras" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
