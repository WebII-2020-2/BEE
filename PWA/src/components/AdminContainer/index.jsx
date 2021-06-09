import React, { useState } from 'react';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import { Menu } from 'react-feather';
import SidebarAdmin from '../SidebarAdmin';
import './AdminContainer.css';

function AdminContainer({ children, link }) {
  const [active, setActive] = useState(false);

  const toggleSidebar = () => {
    setActive(!active);
  };

  return (
    <Container fluid>
      <Row>
        <SidebarAdmin disabled={!active} click={toggleSidebar} link={link} />
        <Col sm md={8} lg={10} className="admin-main">
          <Menu size={30} onClick={toggleSidebar} className={`admin-sidebar-toggle ${active && 'disabled'}`} />
          <Row>
            <Col className="admin-main-content">
              {children}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminContainer;
