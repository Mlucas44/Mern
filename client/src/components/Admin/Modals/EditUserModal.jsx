import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditUserModal = ({ show, handleClose, updatedUser, handleEditChange, handleEditSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier l'utilisateur {updatedUser.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleEditSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input value={updatedUser.name || ''} onChange={handleEditChange} type="text" className="form-control" id="name" placeholder="Name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input value={updatedUser.username || ''} onChange={handleEditChange} type="text" className="form-control" id="username" placeholder="Username" name="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={updatedUser.email || ''} onChange={handleEditChange} type="email" className="form-control" id="email" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input value={updatedUser.password || ''} onChange={handleEditChange} type="password" className="form-control" id="password" placeholder="Password" name="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select value={updatedUser.role} onChange={handleEditChange} className="form-select" id="role" name="role">
                            <option value="" disabled defaultValue>Select role...</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={handleEditSubmit}>
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserModal;