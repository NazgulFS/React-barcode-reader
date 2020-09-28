import React, { Fragment, useEffect, useState } from "react";
import { Row, ListGroup, Card, ListGroupItem, Col } from 'react-bootstrap';
import Quagga from "quagga";
import './scann.css';

const Scanner = () => {

  const [item, setItem] = useState();
  const [format, setFormat] = useState();
  const onDetected = (data) => {
    setItem(data.codeResult.code);
    setFormat(data.codeResult.format);
    
  };

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 425,
            height: 400,
            facing: "environment", // or user
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ["code_128_reader"],
          debug: {
            drawBoundingBox: false,
            showFrequency: false,
            drawScanline: false,
            showPattern: false,
          },
          multiple: false,
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(onDetected );
    

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, []);

  return (
    <Fragment>

        <Row id="videodata">
          <Col>
          <div id="interactive" className="viewport">
            <video className="videoCamera" autoPlay="true" preload="auto" src="" muted="true"></video>
            <canvas className="drawingBuffer"></canvas>
          </div>
          </Col>

          <Col>
            <Card bg="secondary" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Product</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Code: {item}</ListGroupItem>
                <ListGroupItem>Format: {format}</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
    </Fragment>
  );
};

export default Scanner;