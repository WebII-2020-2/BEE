import React from 'react';
import './NotFound.css';
import img404 from '../../assets/img/404.png';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-text">Oops...</h1>
      <img src={img404} alt="broken-page" className="not-found-image" />
      <h2 className="not-found-text">
        A página que você estava procurando não está aqui
      </h2>
    </div>
  );
}

export default NotFound;
