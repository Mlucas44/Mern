import { useState, useCallback } from "react";

const useApiRequest = (url, method) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = useCallback(async (params = null) => {
        setIsLoading(true);
        setError(null);

        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (params) {
            options.body = JSON.stringify(params);
        }

        const response = await fetch(url, options);

        setIsLoading(false);

        if (!response.ok) {
            const error = await response.json();
            setError(error);
            return { error };
        }

        const responseData = await response.json();
        setData(responseData);
        return { data: responseData };
    }, [url, method]);

    return { isLoading, error, data, execute };
};

export default useApiRequest