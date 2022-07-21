import React from 'react';
import { Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const DocScreen = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <Button color='danger' onClick={() => navigate('/daily')}>
        back
      </Button>
      <div></div>
    </Container>
  );
};

export default DocScreen;
