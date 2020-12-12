import React from 'react';
import './CardDetailModal.css';

function CardDetailModal({ show, handleClose, body, header }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
      </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CardDetailModal;