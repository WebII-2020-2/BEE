import React from 'react';
import {
  Row, Col, Container, Image,
} from 'react-bootstrap';
import logoBlack from '../../assets/img/bee-logo-black.svg';
import logoColorful from '../../assets/img/bee-logo-color.svg';
import user from '../../assets/img/default-user.png';
import SidebarAdmin from '../../components/SidebarAdmin';
import './Dashboard.css';

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        <SidebarAdmin avatar={user} logo={logoColorful} />
        <Col md={10} xs={12} className="admin-main">
          <Image src={logoBlack} className="admin-main-logo" />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
