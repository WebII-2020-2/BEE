import React from 'react';
import { Nav, Col, Image } from 'react-bootstrap';
import { LogOut } from 'react-feather';
import './SidebarAdmin.css';

function SidebarAdmin(props) {
  const { logo, avatar } = props;
  return (
    <Col xs={6} md={2} className="admin-sidebar wide">
      <Nav className="admin-sidebar">
        <Image src={logo} className="admin-sidebar-logo" />
        <div className="admin-sidebar-user">
          <Image src={avatar} className="admin-sidebar-user-avatar" rounded />
          <span className="admin-sidebar-user-info">
            <p className="admin-sidebar-user-info-name">Fabio Banana</p>
            <p className="admin-sidebar-user-info-role">Administrador</p>
          </span>
          <Nav.Link href="/categorias">
            <LogOut />
          </Nav.Link>
        </div>
        <span className="admin-sidebar-separador">
          Navegação
        </span>
        <Nav.Link className="admin-sidebar-link selected" disabled href="/admin/produtos">Produtos</Nav.Link>
        <Nav.Link className="admin-sidebar-link" href="/admin/categorias">Categorias</Nav.Link>
        <Nav.Link className="admin-sidebar-link" href="/admin/promoções">Promoções</Nav.Link>
        <Nav.Link className="admin-sidebar-link" href="/admin/vendas">Vendas</Nav.Link>
        <Nav.Link className="admin-sidebar-link" href="/admin/envios">Envios</Nav.Link>
        <Nav.Link className="admin-sidebar-link" href="/admin/relatorios">Relatórios</Nav.Link>
      </Nav>
    </Col>
  );
}

export default SidebarAdmin;
