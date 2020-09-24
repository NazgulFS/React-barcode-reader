import React, { useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap';
import Quagga from "quagga";
import './scann.css';

const Scanner = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <Container className="text-center">
      <Row id="videodata">
        <div id="interactive" className="viewport">
          <video className="videoCamera" autoPlay="true" preload="auto" src="" muted="true"></video>
          <canvas className="drawingBuffer"></canvas>
        </div>
      </Row>

    </Container>
  );
};

export default Scanner;