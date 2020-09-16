import React, { Fragment } from 'react';
import Scanner from './components/Scanner';
import { Container, Row} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Fragment>
      <Container id="body">
        <Row id="title"><h1>CODE-BAR READER</h1></Row>
        <Scanner />
      </Container>
    </Fragment>
  );
}

export default App;