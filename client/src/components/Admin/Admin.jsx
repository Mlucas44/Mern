import React, { useEffect } from 'react'
import './Admin.scss'
import { useUsers } from './../../hooks/useUsers'

const Admin = () => {
    const { users, fetchUsers, isLoading, error } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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
            {users && users.map(user => (  // assurez-vous que `users` n'est pas null avant de faire un map
                <div className="user-card" key={user._id}>
                    <h3>Nom: {user.name}</h3>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Role: {user.role}</p>
                </div>
            ))}
        </div>
    )
}

export default Admin;