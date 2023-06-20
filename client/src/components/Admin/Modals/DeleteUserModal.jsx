import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteUserModal = ({ show, handleClose, deletingUser, handleDeleteConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmer la suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>Êtes-vous sûr de vouloir supprimer l'utilisateur {deletingUser?.name} ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteUserModal;