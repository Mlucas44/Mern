import { useState, useCallback } from "react";

export const useUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);

    // Get the token from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    // Check si email exist
    const checkEmailExists = async (email) => {
        try {
            const response = await fetch(`/api/user/check-email/${email}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();

            console.log(response);

            if (data.exists) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    // récupère tous les users
        const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setUsers(data);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }, [token]);

    // ajoute un user
    const addUser = async (newUser) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setUsers(prevUsers => [...prevUsers, data]);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    // modifier un user
    const updateUser = async (updatedUser) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/user/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedUser)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setUsers(prevUsers => prevUsers.map(user => user._id === data._id ? data : user));
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    // supprime un user
    const deleteUser = async (userId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error deleting user');
            }

            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return { fetchUsers, checkEmailExists, addUser, updateUser, deleteUser, isLoading, error, users };
}
