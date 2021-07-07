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
    <Navbar
      variant="dark"
      className="navbar-store store-container"
      expand="lg"
      aria-label="Menu de Navegação"
    >
      <Navbar.Brand
        href="/"
        className="main-logo"
        title="Link para a página inicial"
      >
        <Image src={logoNav} alt="Logotipo do site BEE" />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navbar-store"
        className="navbar-store"
        aria-label="Abrir menu de navegação"
      />
      <Navbar.Collapse id="navbar-store" aria-label="Itens de navegação">
        <Nav className="links">
          <Nav.Link href="/promocoes" title="Promoções">
            Promoções
          </Nav.Link>
          <NavDropdown title="Categorias">
            <NavDropdown.Item href="/categorias/graos" title="Categoria: Grãos">
              Grãos
            </NavDropdown.Item>
            <NavDropdown.Item
              href="/categorias/laticinios"
              title="Categoria: Laticínios"
            >
              Laticínios
            </NavDropdown.Item>
            <NavDropdown.Item
              href="/categorias/apicolas"
              title="Categoria: Apícolas"
            >
              Apícolas
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="/categorias"
              className="dropdown-item"
              title="Todos os produtos"
            >
              Todos os produtos
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/sobre" title="Informações sobre a loja">
            Sobre
          </Nav.Link>
        </Nav>
        <Nav className="actions">
          <Form className="search" aria-label="Pesquisar produtos">
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
              title="Pesquisar"
            >
              <Search aria-label="Ícone de pesquisa" />
            </Button>
          </Form>
          <Nav.Link href="/carrinho" title="Carrinho de compras">
            <ShoppingCart aria-label="Ícone de carrinho de compras" />
          </Nav.Link>
          <Nav.Link href="/user/login" title="Login">
            <User aria-label="Ícone de usuário" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
