import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddUserModal = ({ show, handleClose, handleAddUser, handleNewUserChange }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleAddUser}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input onChange={handleNewUserChange} type="text" className="form-control" id="name" placeholder="Name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input onChange={handleNewUserChange} type="text" className="form-control" id="username" placeholder="Username" name="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={handleNewUserChange} type="email" className="form-control" id="email" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={handleNewUserChange} type="password" className="form-control" id="password" placeholder="Password" name="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select onChange={handleNewUserChange} className="form-select" id="role" name="role" defaultValue="">
                        <option value="" disabled>Select role...</option>
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
                <Button variant="primary" onClick={handleAddUser}>
                    Ajouter
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddUserModal;