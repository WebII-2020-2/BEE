import React from 'react';
import { Row, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useHistory } from 'react-router-dom';
import './PaginationAdmin.css';

function PaginationAdmin(props) {
  const { actualPage, totalPages, baseUrl, changePage } = props;
  const history = useHistory();

  const handlePrevious = () => {
    changePage(actualPage - 1);
    history.push(`${baseUrl}/page/${actualPage - 1}`);
  };

  const handleNext = () => {
    changePage(actualPage + 1);
    history.push(`${baseUrl}/page/${actualPage + 1}`);
  };

  return (
    <Row className="pagination-component admin">
      <Button
        variant="outline-dark"
        disabled={actualPage <= 1 || actualPage > totalPages}
        onClick={handlePrevious}
      >
        <ChevronLeft />
      </Button>
      <p>{actualPage}</p>
      <Button
        variant="outline-dark"
        disabled={actualPage < 1 || actualPage >= totalPages}
        onClick={handleNext}
      >
        <ChevronRight />
      </Button>
    </Row>
  );
}

export default PaginationAdmin;
