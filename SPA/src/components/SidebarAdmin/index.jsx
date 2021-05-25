import React from 'react';
import { Nav, Col, Image } from 'react-bootstrap';
import { ArrowLeftCircle, LogOut } from 'react-feather';
import './SidebarAdmin.css';

function SidebarAdmin(props) {
  const {
    logo, avatar, disabled, click,
  } = props;
  return (
    <Col sm md={4} lg={2} className={`admin-sidebar wide ${disabled && 'disabled'}`}>
      <Nav className="admin-sidebar">
        <Image src={logo} className="admin-sidebar-logo" />

        <div className="admin-sidebar-user">
          <Image src={avatar} className="admin-sidebar-user-avatar" rounded />

          <span className="admin-sidebar-user-info">
            <p className="admin-sidebar-user-info-name">Fabio Banana</p>
            <p className="admin-sidebar-user-info-role">Administrador</p>
          </span>

          <Nav.Link href="/admin/logout">
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

        <span className="admin-sidebar-close">
          <ArrowLeftCircle size={30} onClick={click} />
        </span>
      </Nav>
    </Col>
  );
}

export default SidebarAdmin;
