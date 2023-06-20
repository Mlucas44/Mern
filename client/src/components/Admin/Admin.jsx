import React, { useEffect, useState } from 'react';
import './Admin.scss';
import { useUsers } from './../../hooks/useUsers';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table } from 'react-bootstrap';

const Admin = () => {
    const { users, fetchUsers, isLoading, error, updateUser, deleteUser, addUser } = useUsers();
    const [newUser, setNewUser] = useState({name: '', username: '', email: '', password: '', role: ''});
    const [addModalShow, setAddModalShow] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [editModalShow, setEditModalShow] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleChange = (event) => {
        setUpdatedUser({
          ...updatedUser,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(updatedUser);
        setUpdatedUser({});
        setEditModalShow(false);
      };
    
      const handleEditModalShow = (user) => {
        setUpdatedUser(user);
        setEditModalShow(true);
      };
    

    const handleAddUser = (event) => {
        event.preventDefault();
        addUser(newUser);
        setAddModalShow(false);
        setNewUser({name: '', username: '', email: '', password: '', role: ''});
    };

    

    const handleNewUserChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleDeleteConfirm = () => {
        deleteUser(deletingUser._id);
        setDeleteModalShow(false);
        setDeletingUser(null);
    };

    const handleDeleteClick = (user) => {
        setDeletingUser(user);
        setDeleteModalShow(true);
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
            <h2>Liste des utilisateurs</h2>
            <div className="user-table-container">
            <Button variant="primary" onClick={() => setAddModalShow(true)}>
                Ajouter un utilisateur
            </Button>
                <Table className="user-table">
                    <thead>
                        <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                            <Button variant="primary" onClick={() => handleEditModalShow(user)}>Modifier</Button>
                            <Button variant="danger" onClick={() => handleDeleteClick(user)}>Supprimer</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

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

            <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
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
                    <Button variant="secondary" onClick={() => setEditModalShow(false)}>
                    Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                    Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Admin;