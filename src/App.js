import React, { Fragment } from 'react';
import View from './components/View';
import { Container, Row} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Fragment>
      <Container>
        <Row id="title"><h1>CODE-BAR READER</h1></Row>   
      </Container>
      <Container>
      <Row><View /></Row>
      </Container>
    </Fragment>
  );
}

export default App;
