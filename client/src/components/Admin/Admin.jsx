import React, { useEffect, useState } from 'react';
import './Admin.scss';
import { useUsers } from './../../hooks/useUsers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import AddUserModal from './Modals/AddUserModal';
import DeleteUserModal from './Modals/DeleteUserModal';
import EditUserModal from './Modals/EditUserModal';

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

    // modifie un user
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
    // ajoute un user
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
    // supprime un user
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
            {/*Modal de suppression*/}
            <DeleteUserModal 
                show={deleteModalShow} 
                handleClose={() => setDeleteModalShow(false)}
                deletingUser={deletingUser}
                handleDeleteConfirm={handleDeleteConfirm}
            />
            {/*Modal de d'ajout*/}
            <AddUserModal 
                show={addModalShow} 
                handleClose={() => setAddModalShow(false)}
                handleAddUser={handleAddUser}
                handleNewUserChange={handleNewUserChange}
            />
            {/*Modal de modification*/}
            <EditUserModal 
                show={editModalShow} 
                handleClose={() => setEditModalShow(false)}
                updatedUser={updatedUser}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Admin;