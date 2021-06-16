import React from 'react';
import { Nav, Col, Image } from 'react-bootstrap';
import { ArrowLeftCircle, LogOut } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/auth/authAdmin';
import logoColorful from '../../assets/img/bee-logo-color.svg';
import user from '../../assets/img/default-user.png';
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
        <Image src={logoColorful} className="admin-sidebar-logo" />

        <div className="admin-sidebar-user">
          <Image src={user} className="admin-sidebar-user-avatar" rounded />

          <span className="admin-sidebar-user-info">
            <p className="admin-sidebar-user-info-name">Fabio Banana</p>
            <p className="admin-sidebar-user-info-role">Administrador</p>
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
          href="/admin/promoções"
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

        <span className="admin-sidebar-close">
          <ArrowLeftCircle size={30} onClick={click} />
        </span>
      </Nav>
    </Col>
  );
}

export default SidebarAdmin;
