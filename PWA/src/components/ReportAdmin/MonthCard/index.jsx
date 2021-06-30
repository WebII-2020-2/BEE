import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-feather';
import './MonthCard.css';

const MonthCard = ({ value, linkPath }) => (
  <Link
    className="month-card admin"
    to={`${linkPath}/${value.replace('/', '-')}`}
  >
    <Calendar className="month-card admin-icon" size={24} />
    <span className="month-card admin-text">{value}</span>
  </Link>
);

export default MonthCard;
