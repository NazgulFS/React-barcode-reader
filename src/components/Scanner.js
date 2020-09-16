import React, { useEffect, useState } from "react";
import { Col, Row, Card } from 'react-bootstrap';
import Quagga from "quagga";
import './scann.css';

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
    };
  }, []);

  return (
    <Row id="videodata">
      <Col md={6} sm={12}>
      <div id="interactive" class="viewport">
        <video class="videoCamera" autoplay="true" preload="auto" src="" muted="true"
              playsinline="true"></video>
        <canvas class="drawingBuffer"></canvas>
      </div>
      </Col>
      <Col md={{span: 4, offset: 2}} sm={12}>
        <Card>
            <Card.Body>
              <Card.Header>Barcode data</Card.Header>
              <Card.Text>
                <p>CODE: {item}</p>
                <p>CODE FORMAT: {format}</p> 
              </Card.Text>
            </Card.Body>
          </Card>
       
      </Col>
    </Row>
  );
};

export default Scanner;