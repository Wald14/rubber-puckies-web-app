import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function CustomModal(props) {

  const variant = props.variant ? props.variant : "primary"

  return (
    <>
      <Modal show={props.open} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            {props.closeBtnTitle}
          </Button>
          <Button variant={variant} onClick={props.enterFunction}>
            {props.enterBtnTitle}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}