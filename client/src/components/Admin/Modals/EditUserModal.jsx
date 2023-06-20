import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditUserModal = ({ show, handleClose, updatedUser, handleChange, handleSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier l'utilisateur {updatedUser.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input value={updatedUser.name || ''} onChange={handleChange} type="text" className="form-control" id="name" placeholder="Name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input value={updatedUser.username || ''} onChange={handleChange} type="text" className="form-control" id="username" placeholder="Username" name="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={updatedUser.email || ''} onChange={handleChange} type="email" className="form-control" id="email" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input value={updatedUser.password || ''} onChange={handleChange} type="password" className="form-control" id="password" placeholder="Password" name="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select value={updatedUser.role} onChange={handleChange} className="form-select" id="role" name="role">
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
                <Button variant="primary" onClick={handleSubmit}>
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserModal;