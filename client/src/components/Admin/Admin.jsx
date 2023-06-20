import React, { useEffect, useState } from 'react';
import './Admin.scss';
import { useUsers } from './../../hooks/useUsers';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Admin = () => {
    const { users, fetchUsers, isLoading, error, updateUser, deleteUser, addUser } = useUsers();
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({});
    const [newUser, setNewUser] = useState({name: '', username: '', email: '', password: '', role: ''});
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setUpdatedUser(user);
    }

    const handleChange = (event) => {
        setUpdatedUser({
            ...updatedUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleNewUserChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddUser = (event) => {
        event.preventDefault();
        console.log(newUser);
        addUser(newUser);
        setAddModalShow(false);
        setNewUser({name: '', username: '', email: '', password: '', role: ''});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(updatedUser);
        setEditingUser(null);
        setUpdatedUser({});
    };

    const handleDeleteClick = (user) => {
        setDeletingUser(user);
        setDeleteModalShow(true);
    };

    const handleDeleteConfirm = () => {
        deleteUser(deletingUser._id);
        setDeleteModalShow(false);
        setDeletingUser(null);
    };
      
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="admin-container">
            <h1>Page d'administration</h1>
            <Button variant="primary" onClick={() => setAddModalShow(true)}>
                Ajouter un utilisateur
            </Button>
            <h2>Liste des utilisateurs</h2>
            {users && users.map(user => (
                <div className="user-card" key={user._id}>
                    {editingUser === user._id ? (
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nom:
                                <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
                            </label>
                            <label>
                                Username:
                                <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />
                            </label>
                            <label>
                                Role:
                                <input type="text" name="role" value={updatedUser.role} onChange={handleChange} />
                            </label>
                            <button type="submit">Valider</button>
                            <button type="button" onClick={() => setEditingUser(null)}>Annuler</button>
                        </form>
                    ) : (
                        <>
                            <h3>Nom: {user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                            <p>Role: {user.role}</p>
                            <button onClick={() => handleEditClick(user)}>Modifier</button>
                            <button onClick={() => handleDeleteClick(user)}>Supprimer</button>
                        </>
                    )}
                </div>
            ))}

            <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmer la suppression</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Êtes-vous sûr de vouloir supprimer l'utilisateur {deletingUser?.name} ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>

            <Modal show={addModalShow} onHide={() => setAddModalShow(false)}>
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
                        <select onChange={handleNewUserChange} className="form-select" id="role" name="role">
                        <option value="" disabled defaultValue>Select role...</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        </select>
                    </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddModalShow(false)}>
                    Annuler
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                    Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Admin;