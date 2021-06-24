import React from 'react';
import { Image } from 'react-bootstrap';
import logoBlack from '../../assets/img/bee-logo-black.svg';
import AdminContainer from '../../components/AdminContainer';
import './HomeAdmin.css';

function HomeAdmin() {
  return (
    <AdminContainer>
      <Image src={logoBlack} className="admin-main-content-logo" />
    </AdminContainer>
  );
}

export default HomeAdmin;
