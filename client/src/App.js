import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminPage from './pages/AdminPage'
import Profile from './pages/Profile' // Assurez-vous que le chemin d'importation est correct
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const App = () => {
  const { user, userInfo } = useContext(AuthContext);

  return (
    <>
      <NavBar userInfo={userInfo} />
      <Routes>
        <Route
          path='/'
          element={ <HomePage />} />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to="/" />} />
        <Route
          path='/signup'
          element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route
          path='/admin/*'
          element={userInfo && userInfo.role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
        <Route
          path='/profile'
          element={user ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
