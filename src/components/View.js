import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Scanner from './Scanner';

const View = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (  
        <>  
            <Button variant="primary" onClick={handleShow}>
                Scann Now
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Scanner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Scanner />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            </>

     );
}
 
export default View;