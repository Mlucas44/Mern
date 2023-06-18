import { useState, useEffect } from "react";

const useUser = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserInfo = async () => {
        setIsLoading(true);
        setError(null);

        // Getting the token from local storage
        const token = localStorage.getItem("token");

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
        getUserInfo();
    }, []);

    return { userInfo, isLoading, error };
}

export default useUser;
