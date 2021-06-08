/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './FormCategory.css';

function FormCategory(props) {
  const { isNew, formData } = props;

  const [name, setName] = useState(formData.name);
  const [description, setDescription] = useState(formData.description);
  const [isReadOnly, setIsReadOnly] = useState(!isNew);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleUpdateName = (event) => {
    setName(event.target.value);
  };

  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Form />
  );
}

export default FormCategory;
