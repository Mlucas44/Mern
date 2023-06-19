import { useState, useEffect, useContext } from "react";
import { AuthContext } from './../context/AuthContext';

const useUser = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const getUserInfo = async () => {
        setIsLoading(true);
        setError(null);

         // Getting the token from local storage
         const storedUser = JSON.parse(localStorage.getItem("user"));
         const token = storedUser?.token;

        try {
            const response = await fetch('/api/user/me', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setUserInfo(data);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            getUserInfo();
        } else {
            setUserInfo(null);
        }
    }, [user]);

    return { userInfo, isLoading, error };
}

export default useUser;
