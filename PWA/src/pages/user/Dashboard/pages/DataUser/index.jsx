import React from 'react';
import PersonalData from './PersonalData';
import Security from './Security';
import './DataUser.css';

function DataUser() {
  return (
    <div className="container-dashboard">
      <PersonalData />
      <Security />
    </div>
  );
}

export default DataUser;
