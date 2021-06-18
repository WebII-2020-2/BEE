import React from 'react';
import { Nav, Col, Image } from 'react-bootstrap';
import { X, LogOut } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/auth/authAdmin';
import logoColorful from '../../assets/img/bee-logo-color.svg';
import user from '../../assets/img/user.jpeg';
import './SidebarAdmin.css';

function SidebarAdmin(props) {
  const { disabled, click, link } = props;

  const history = useHistory();

  const handleClickLogout = () => {
    logout();
    history.push('login-admin');
  };

  return (
    <Col
      sm
      md={4}
      lg={3}
      className={`admin-sidebar wide ${disabled && 'disabled'}`}
    >
      <Nav className="admin-sidebar">
        <span className="admin-sidebar-close">
          <X size={30} onClick={click} />
        </span>
        <Image src={logoColorful} className="admin-sidebar-logo" />

        <div className="admin-sidebar-user">
          <Image src={user} className="admin-sidebar-user-avatar" />

          <span className="admin-sidebar-user-info">
            <p className="admin-sidebar-user-info-name">Beanie</p>
            <p className="admin-sidebar-user-info-role">Administrator</p>
          </span>

          <Nav.Link onClick={handleClickLogout}>
            <LogOut />
          </Nav.Link>
        </div>

        <span className="admin-sidebar-separador">Navegação</span>

        <Nav.Link
          className={`admin-sidebar-link ${link === 'produtos' && 'selected'}`}
          disabled={link === 'produtos'}
          href="/admin/produtos"
        >
          Produtos
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${
            link === 'categorias' && 'selected'
          }`}
          disabled={link === 'categorias'}
          href="/admin/categorias"
        >
          Categorias
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${link === 'promocoes' && 'selected'}`}
          disabled={link === 'promocoes'}
          href="/admin/promocoes"
        >
          Promoções
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${link === 'vendas' && 'selected'}`}
          disabled={link === 'vendas'}
          href="/admin/vendas"
        >
          Vendas
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${
            link === 'relatorios' && 'selected'
          }`}
          disabled={link === 'relatorios'}
          href="/admin/relatorios"
        >
          Relatórios
        </Nav.Link>
      </Nav>
    </Col>
  );
}

export default SidebarAdmin;
