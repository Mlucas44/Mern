import React, { useEffect, useState } from 'react'
import './Admin.scss'
import { useUsers } from './../../hooks/useUsers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const { users, fetchUsers, isLoading, error, updateUser, deleteUser } = useUsers();
    const [editingUser, setEditingUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({});

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

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(updatedUser);
        setEditingUser(null);
        setUpdatedUser({});
    };


    const handleDeleteClick = (user) => {
        toast(
            <div className="toast-content">
                Êtes-vous sûr de vouloir supprimer l'utilisateur {user.name} ?
                <div className="toast-buttons">
                    <button
                        className="toast-delete-button"
                        onClick={() => { deleteUser(user._id); toast.dismiss(); }}
                    >
                        Supprimer
                    </button>
                    <button
                        className="toast-cancel-button"
                        onClick={() => toast.dismiss()}
                    >
                        Annuler
                    </button>
                </div>
            </div>,
            {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false
            }
        );
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
            <ToastContainer />
        </div>
    )
}

export default Admin;