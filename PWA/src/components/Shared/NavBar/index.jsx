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
        aria-label="Link para a página inicial"
      >
        <Image src={logoNav} alt="Logotipo do site BEE" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-store" className="navbar-store" />
      <Navbar.Collapse id="navbar-store" aria-label="Itens de navegação">
        <Nav className="links">
          <Nav.Link href="/promocoes" aria-label="Ir para página de Promoções">
            Promoções
          </Nav.Link>
          <NavDropdown
            title="Categorias"
            aria-label="Navegar entre as categorias"
          >
            <NavDropdown.Item
              href="/categorias/graos"
              aria-label="Categoria: Grãos"
            >
              Grãos
            </NavDropdown.Item>
            <NavDropdown.Item
              href="/categorias/laticinios"
              aria-label="Categoria: Laticínios"
            >
              Laticínios
            </NavDropdown.Item>
            <NavDropdown.Item
              href="/categorias/apicolas"
              aria-label="Categoria: Apícolas"
            >
              Apícolas
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="/categorias"
              className="dropdown-item"
              aria-label="Todas as Categorias"
            >
              Todas as categorias
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            href="/sobre"
            aria-label="Ir para página de informações sobre a loja"
          >
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
              aria-label="Botao de pesquisa"
            >
              <Search aria-label="Ícone de pesquisa" />
            </Button>
          </Form>
          <Nav.Link href="/user/login" aria-label="Ir para tela de login">
            Login <User aria-label="Ícone de usuário" />
          </Nav.Link>
          <Nav.Link href="/carrinho" aria-label="Ir para carrinho de compras">
            Carrinho <ShoppingCart aria-label="Ícone de carrinho de compras" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
