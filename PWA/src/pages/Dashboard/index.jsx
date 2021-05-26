import React, { useState } from 'react';
import {
  Row, Col, Container, Image,
} from 'react-bootstrap';
import { Menu } from 'react-feather';
import logoBlack from '../../assets/img/bee-logo-black.svg';
import logoColorful from '../../assets/img/bee-logo-color.svg';
import user from '../../assets/img/default-user.png';
import SidebarAdmin from '../../components/SidebarAdmin';
import './Dashboard.css';

function Dashboard() {
  const [active, setActive] = useState(false);

  const toggleSidebar = () => {
    setActive(!active);
  };

  return (
    <Container fluid>
      <Row>
        <SidebarAdmin avatar={user} logo={logoColorful} disabled={!active} click={toggleSidebar} />
        <Col sm md={8} lg={10} className="admin-main">
          <Row>
            <Menu size={30} onClick={toggleSidebar} className="admin-sidebar-toggle" />
          </Row>
          <Row>
            <Col className="admin-main-content">
              <Image src={logoBlack} className="admin-main-content-logo" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
