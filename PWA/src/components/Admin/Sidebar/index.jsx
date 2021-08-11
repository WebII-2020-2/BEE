import React from 'react';
import { Col, Image, Nav } from 'react-bootstrap';
import { LogOut, X } from 'react-feather';
import { useHistory } from 'react-router-dom';
import {
  logout,
  getAdminData,
} from '../../../services/local-storage/authAdmin';
import logoColorful from '../../../assets/img/bee-logo-admin.svg';
import defaultUser from '../../../assets/img/default-user.png';
import './Sidebar.css';

function SidebarAdmin(props) {
  const { disabled, click, link } = props;
  const history = useHistory();
  const adminData = getAdminData();

  const handleClickLogout = () => {
    logout();
    history.push('/admin/login');
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
          <Image
            src={adminData.image || defaultUser}
            className="admin-sidebar-user-avatar"
          />

          <span className="admin-sidebar-user-info">
            <p className="admin-sidebar-user-info-name">{adminData.name}</p>
            <p className="admin-sidebar-user-info-role">
              {adminData.level_access === 2 ? 'Administrador' : 'Usuário Comum'}
            </p>
          </span>

          <Nav.Link onClick={handleClickLogout}>
            <LogOut />
          </Nav.Link>
        </div>

        <span className="admin-sidebar-separador">Navegação</span>

        <Nav.Link
          className={`admin-sidebar-link ${link === 'produtos' && 'selected'}`}
          disabled={link === 'produtos'}
          href="/admin/produtos/page/1"
        >
          Produtos
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${
            link === 'categorias' && 'selected'
          }`}
          disabled={link === 'categorias'}
          href="/admin/categorias/page/1"
        >
          Categorias
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${link === 'promocoes' && 'selected'}`}
          disabled={link === 'promocoes'}
          href="/admin/promocoes/page/1"
        >
          Promoções
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${link === 'vendas' && 'selected'}`}
          disabled={link === 'vendas'}
          href="/admin/vendas/page/1"
        >
          Vendas
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${
            link === 'relatorios' && 'selected'
          }`}
          disabled={link === 'relatorios'}
          href="/admin/relatorios/page/1"
        >
          Relatórios
        </Nav.Link>
        <Nav.Link
          className={`admin-sidebar-link ${link === 'campanhas' && 'selected'}`}
          disabled={link === 'campanhas'}
          href="/admin/campanhas/page/1"
        >
          Campanhas
        </Nav.Link>
      </Nav>
    </Col>
  );
}

export default SidebarAdmin;
