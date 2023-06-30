import React from 'react'
import './profile.scss'
import useAuthContext from './../../hooks/useAuthContext'

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Mon Profil</h1>
      <p>Nom: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default Profile