/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Alert, ListGroup } from 'react-bootstrap';
import './ValidationErrorsContainer.css';

function ValidationErrorsContainer(props) {
  const { errors, clear } = props;
  if (errors.length > 0)
    return (
      <Alert
        variant="warning"
        onClose={clear}
        dismissible
        className="validation-errors container"
      >
        <ListGroup className="validation-errors list">
          {errors.map((value, index) => (
            <ListGroup.Item
              variant="warning"
              className="validation-errors list-item"
              key={index}
            >
              {value};
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Alert>
    );
  return <></>;
}

export default ValidationErrorsContainer;
