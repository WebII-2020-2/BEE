import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingPageAdmin.css';

function index() {
  return (
    <div className="loading-page admin container">
      <Spinner
        animation="border"
        variant="secondary"
        className="loading-page admin"
        role="status"
      >
        <span className="sr-only">Carregando...</span>
      </Spinner>
    </div>
  );
}

export default index;
