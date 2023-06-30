import { useEffect } from "react";
import useAuthContext from './useAuthContext'
import useApiRequest from './useApiRequest'

const useSignup = () => {
    const { dispatch } = useAuthContext();
    const { isLoading, error, data, execute } = useApiRequest('/api/user/signup', 'POST');

    useEffect(() => {
        if (data) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
        }
    }, [data, dispatch]);

    const signup = (name, email, username, password, role) => execute({ name, email, username, password, role });

    return { signup, isLoading, error };
};

export default useSignup