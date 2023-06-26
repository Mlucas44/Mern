import React, { useEffect, useState } from 'react';
import UserTable from './Items/UserTable';
import AddUserModal from './Modals/AddUserModal';
import DeleteUserModal from './Modals/DeleteUserModal';
import EditUserModal from './Modals/EditUserModal';
import { useUsers } from './../../hooks/useUsers';
import './Admin.scss';

const Admin = () => {
     // Hooks pour le chargement des données et la gestion des erreurs
    const { users, fetchUsers, isLoading, error, updateUser, deleteUser, addUser } = useUsers();
    // State declarations
    // 1. User management state variables
    const [newUser, setNewUser] = useState({name: '', username: '', email: '', password: '', role: ''});
    const [updatedUser, setUpdatedUser] = useState({});
    const [deletingUser, setDeletingUser] = useState(null);

    // 2. UI state variables
    const [addModalShow, setAddModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    // Handlers
    // 1. CRUD handlers
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
    const handleEditChange = (event) => {
        setUpdatedUser({
          ...updatedUser,
          [event.target.name]: event.target.value,
        });
      };
    const handleEditSubmit = (event) => {
        event.preventDefault();
        updateUser(updatedUser);
        setUpdatedUser({});
        setEditModalShow(false);
    };
    const handleEditModalShow = (user) => {
        setUpdatedUser(user);
        setEditModalShow(true);
    };
    // 2. Filter handler
    const handleFilterChange = (event) => {
        const filterText = event.target.value.toLowerCase();
        setFilteredUsers(users.filter(user =>
            user.name.toLowerCase().includes(filterText) ||
            user.email.toLowerCase().includes(filterText) ||
            user.username.toLowerCase().includes(filterText) ||
            user.role.toLowerCase().includes(filterText)
        ));
    }
    // Effects
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);
      
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

            <UserTable
            users={filteredUsers}
            handleFilterChange={handleFilterChange}
            setAddModalShow={setAddModalShow}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditModalShow}
            />


            <DeleteUserModal 
                show={deleteModalShow} 
                handleClose={() => setDeleteModalShow(false)}
                deletingUser={deletingUser}
                handleDeleteConfirm={handleDeleteConfirm}
            />

            <AddUserModal 
                show={addModalShow} 
                handleClose={() => setAddModalShow(false)}
                handleAddUser={handleAddUser}
                handleNewUserChange={handleNewUserChange}
            />

            <EditUserModal 
                show={editModalShow} 
                handleClose={() => setEditModalShow(false)}
                updatedUser={updatedUser}
                handleEditChange={handleEditChange}
                handleEditSubmit={handleEditSubmit}
            />
        </div>
    )
}

export default Admin;