import React, { useEffect, useState } from "react";
import './scann.css';
import { Col, Row, Card } from 'react-bootstrap';
import Quagga from "quagga";

const Scanner = () => {
  const [item, setItem] = useState();
  const [format, setFormat] = useState();
  const onDetected = (data) => {
    setItem(data.codeResult.code);
    setFormat(data.codeResult.format);
    console.log(data);
  };

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 300,
            height: 300,
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
    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
    };
  }, []);

  return (
    <Row id="cards">
      <Col className="video" md={4} sm={6}>
        <Card bg='primary'>
          <Card.Header>Scanner</Card.Header>
          <Card.Body>
            <div id="interactive" className="viewport" />
          </Card.Body>
        </Card>
      </Col>
      <Col id="data" md={{ span: 4, offset: 4 }}  sm={6}  >
        <Card bg='secondary'>
            <Card.Header>Data</Card.Header>
            <Card.Body>
            <p>code: {item}</p>
            <p>code format: {format}</p>
            </Card.Body>
          </Card>        
      </Col>
    </Row>
  );
};

export default Scanner;