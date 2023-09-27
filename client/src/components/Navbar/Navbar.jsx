import React, { useState } from 'react'
import avatar from './../../images/avatar.jpg'
import { NavLink } from 'react-router-dom'
import './navbar.scss'
import { useLogout } from './../../hooks/useLogout'
import useAuthContext from './../../hooks/useAuthContext'
import logo from './logo.png';

const Navbar = ({ userInfo }) => {
  return (
      <>
          <div className="nav-container">
              <nav className="navbar">
                  <div className="logo">
                      <img src={logo} alt="Logo" className="navbar-logo"></img>
                      <h1>Club Football</h1>
                  </div>
                  <div className="primary-menu">
                      <ul className="menu">
                          <li>
                              <NavLink to="/" className='menu-item'>Accueil</NavLink>
                          </li>
                          <li>
                              <NavLink to="/club" className='menu-item'>Club</NavLink>
                          </li>
                          <li>
                              <NavLink to="/equipes" className='menu-item'>Equipes</NavLink>
                          </li>
                          <li>
                              <NavLink to="/partenaire" className='menu-item'>Partenaire</NavLink>
                          </li>
                          {userInfo && userInfo.role === 'admin' && (
                              <li>
                                  <NavLink to="/admin" className='menu-item'>Admin</NavLink>
                              </li>
                          )}
                      </ul>
                  </div>
                  {userInfo ? (<DropdownMenu userInfo={userInfo} />) : (<LoginMenu />)}
              </nav>
          </div>
      </>
  )
}

const DropdownMenu = ({ userInfo }) => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const handleclick = () => {
    logout()
  }
  const [open, setopen] = useState('');
  //it will help to show and hide dropdown menu bar.
  function Toggle_dropdown() {
    (open === "active") ? setopen('') : setopen('active');
  }

  return (
    <>
      <div className="right-menu">
        <div className="dropdown-menu" onClick={() => Toggle_dropdown()}>
          <div className="user-pic">
            <img src={avatar} alt="" />
          </div>
          <div className="user-data">
            <span>{user.name}</span>
          </div>
        </div>
        <div className={"drodown-box " + open}>
          <ul className="dropdown-item">
            <li>
              <NavLink to="/profile">Mon profil</NavLink>
            </li>
            <li>
              <NavLink onClick={handleclick} className='btn btn-dark btn-icon'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1M6 11l3-3-3-3M8.5 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

const LoginMenu = () => {
  return (
    <>
      <div className="right-menu">
        <NavLink to="/signup" className='btn btn-light'>Sign up</NavLink>
        <NavLink to="/login" className='btn btn-dark btn-icon'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1M6 11l3-3-3-3M8.5 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
          <span>Sign in</span>
        </NavLink>
      </div>
    </>
  )
}

export default Navbar