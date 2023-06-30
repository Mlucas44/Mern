export const storageService = {
    get: (key) => {
        try {
            const serializedState = localStorage.getItem(key);
            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    },
    set: (key, value) => {
        try {
            const serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (err) {
            // Ignore write errors
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            // Ignore write errors
        }
    },
};