import React, { useEffect, useState } from 'react';
import UserTable from './Items/UserTable';
import AddUserModal from './Modals/AddUserModal';
import DeleteUserModal from './Modals/DeleteUserModal';
import EditUserModal from './Modals/EditUserModal';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUsers } from '../../hooks/useUsers';
import './UserAdmin.scss';


const UserAdmin = () => {
    // Hooks pour le chargement des données et la gestion des erreurs
    const { users, fetchUsers, checkEmailExists, isLoading, error, updateUser, deleteUser, addUser } = useUsers();
    // State declarations
    // 1. User management state variables
    const [newUser, setNewUser] = useState({ name: '', username: '', email: '', password: '', role: '' });
    const [updatedUser, setUpdatedUser] = useState({});
    const [deletingUser, setDeletingUser] = useState(null);

    // 2. UI state variables
    const [addModalShow, setAddModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    // Handlers
    // 1. CRUD handlers
    const handleAddUser = async (event) => {
        event.preventDefault();
        const { name, username, email, password, role } = newUser;

        if (!name || !username || !email || !password || !role) {
            toast.error('Tous les champs doivent être remplis');
            return;
        }

        if (!validator.isEmail(email)) {
            toast.error('Email n\'est pas valide');
            return;
        }

        if (!validator.isStrongPassword(password)) {
            toast.error('Le mot de passe n\'est pas assez fort');
            return;
        }

        // Vérifier si l'email existe déjà
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            toast.error('Email déjà utilisé');
            return;
        }
        addUser(newUser);
        toast.success('L\'utilisateur a bien été ajouté')
        setAddModalShow(false);
        setNewUser({ name: '', username: '', email: '', password: '', role: '' });
    };
    const handleNewUserChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };
    const handleDeleteConfirm = () => {
        deleteUser(deletingUser._id);
        toast.success('L\'utilisateur a bien été supprimé')
        setDeleteModalShow(false);
        setDeletingUser(null);
    };
    const handleDeleteClick = (user) => {
        setDeletingUser(user);
        setDeleteModalShow(true);
    };
    const handleEditSubmit = (event) => {
        event.preventDefault();
        updateUser(updatedUser);
        toast.success('L\'utilisateur a bien été modifié')
        setUpdatedUser({});
        setEditModalShow(false);
    };
    const handleEditModalShow = (user) => {
        setUpdatedUser(user);
        setEditModalShow(true);
    };
    const handleEditChange = (event) => {
        setUpdatedUser({
            ...updatedUser,
            [event.target.name]: event.target.value,
        });
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

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="user-container">
            <ToastContainer />
            <h3>Liste des utilisateurs  ({users ? users.length : 0})</h3>

            <UserTable
                users={filteredUsers}
                handleFilterChange={handleFilterChange}
                setAddModalShow={setAddModalShow}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditModalShow}
                isLoading={isLoading}
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

export default UserAdmin;