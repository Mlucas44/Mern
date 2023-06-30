import { useEffect } from "react";
import useAuthContext from './useAuthContext'
import useApiRequest from './useApiRequest'

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const { isLoading, error, data, execute } = useApiRequest('/api/user/login', 'POST');

    useEffect(() => {
        if (data) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
        }
    }, [data, dispatch]);

    const login = (email, password) => execute({ email, password });

    return { login, isLoading, error };
};

export default useLogin