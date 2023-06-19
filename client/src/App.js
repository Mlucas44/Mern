import React from 'react'
import { Routes, Route,Navigate } from "react-router-dom"
//import NavBar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminPage from './pages/AdminPage'
import useAuthContext from './hooks/useAuthContext'
import useUser from './hooks/useUser'

const App = () => {
  const {user} = useAuthContext()
  const { userInfo } = useUser();
  return (
    <>
    {/* <NavBar userInfo={userInfo} /> */}
          <Routes>
            <Route 
              path='/' 
              element={user ? <HomePage userInfo={userInfo} /> : <Navigate to="/login"/>}/>
            <Route 
              path='/login' 
              element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route 
              path='/signup' 
              element={!user ? <Signup/> : <Navigate to="/"/>}/>
            <Route
              path='/admin'
              element={userInfo && userInfo.role === 'admin' ? <AdminPage userInfo={userInfo}/> : <Navigate to="/"/>}/>
          </Routes>
    </>
  )
}

export default App