import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Search, ShoppingCart, User } from 'react-feather';
import { useHistory } from 'react-router-dom';
import logoNav from '../../../assets/img/bee-logo-color.svg';
import CategoryApiService from '../../../services/api/CategoryAdminApiService';
import './NavBar.css';

function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const history = useHistory();
  const inputRef = useRef(null);
  const quantity = useSelector((state) => state.cart.count);

  const getCategories = async () => {
    setLoadingCategories(true);
    try {
      const resp = await CategoryApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setCategories(resp.data);
      } else {
        throw new Error(resp.error.error_message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value)
      history.push(`/pesquisar/${inputRef.current.value}`);
  };

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
          <Nav.Link href="/produtos" title="Produtos">
            Produtos
          </Nav.Link>
          <NavDropdown title="Categorias" id="category-dropdown">
            {loadingCategories ? (
              <NavDropdown.Item title="Carregando categorias...">
                <Spinner animation="border" variant="light" role="status" />
              </NavDropdown.Item>
            ) : (
              categories.map((category) => {
                if (category.count_products)
                  return (
                    <NavDropdown.Item
                      key={category.id}
                      href={`/categoria/${category.id}`}
                      title={`Categoria: ${category.name}`}
                    >
                      {category.name}
                    </NavDropdown.Item>
                  );
                return '';
              })
            )}
          </NavDropdown>
          <Nav.Link href="/sobre" title="Informações sobre a loja">
            Sobre
          </Nav.Link>
        </Nav>
        <Nav className="actions">
          <Form
            className="search"
            aria-label="Pesquisar produtos"
            onSubmit={handleSubmit}
          >
            <FormControl
              id="pesquisa-produto-nav"
              type="search"
              placeholder="Pesquisar"
              aria-label="Campo de pesquisa"
              ref={inputRef}
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
          <Nav.Link
            href="/carrinho"
            title="Carrinho de compras"
            className="cart-icon"
          >
            <ShoppingCart aria-label="Ícone de carrinho de compras" />
            {quantity > 0 && (
              <sup className="cart-quantity">
                {quantity}
                <span className="sr-only">Quantidade de itens no carrinho</span>
              </sup>
            )}
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
