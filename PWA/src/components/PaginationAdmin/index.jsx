import React from 'react';
import { Row, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import './PaginationAdmin.css';

function PaginationAdmin(props) {
  const { itensCount, actualPage, click } = props;
  const totalPages = Math.floor(itensCount / 6) + 1;

  return (
    <Row className="pagination-component admin">
      <Button
        variant="outline-secondary"
        disabled={actualPage === 1}
        onClick={() => click(actualPage - 1)}
      >
        <ChevronLeft />
      </Button>
      <Button variant="secondary" disabled={actualPage === 1}>
        {actualPage}
      </Button>
      <Button
        variant="outline-secondary"
        disabled={actualPage === totalPages}
        onClick={() => click(actualPage + 1)}
      >
        <ChevronRight />
      </Button>
    </Row>
  );
}

export default PaginationAdmin;
