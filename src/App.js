import React, { Fragment, useState } from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import './App.css';
import Scanner from './components/Scanner'

function App() {

  const[scann, setScann] = useState(false);

  return (
    <Fragment>
      <Row id="title"><h1>CODE-BAR READER</h1></Row>
      <Row className="justify-content-center m-4"><h5>Enabled formats: code_128_reader and ean_reader</h5></Row>
      <Container>
        <Row><Button id="btn-start" onClick={() => setScann(!scann) }>{scann ? 'Stop' : 'Scann Now'}</Button></Row>
      </Container>

      <Container id="scannerRow">
      <Row>{scann ? <Scanner /> : null}</Row>
      </Container>
    </Fragment>
  );
}

export default App;
