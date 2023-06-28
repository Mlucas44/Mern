import { createContext, useReducer, useEffect,  useCallback } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  userInfo: null,
  error: null,
  userInfoLoading: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload, error: null, userInfoLoading: false };
    case 'SET_USER_ERROR':
      return { ...state, error: action.payload, userInfoLoading: false };
    case 'SET_USER_INFO_LOADING':
      return { ...state, userInfoLoading: action.payload };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserInfo = useCallback(async () => {
    dispatch({ type: 'SET_USER_INFO_LOADING', payload: true });
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;
      
      const response = await fetch('/api/user/me', {
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
      
      dispatch({ type: 'SET_USER_INFO', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_USER_ERROR', payload: err.message });
    } finally {
      dispatch({ type: 'SET_USER_INFO_LOADING', payload: false });
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.token) {
      dispatch({ type: 'LOGIN', payload: storedUser });
      getUserInfo();
    }
  }, [getUserInfo]);

  useEffect(() => {
    if (state.user) {
      getUserInfo();
    } else {
      dispatch({ type: 'SET_USER_INFO', payload: null });
    }
  }, [state.user, getUserInfo]);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
