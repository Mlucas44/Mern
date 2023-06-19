import React from 'react'
//import { NavLink } from 'react-router-dom'
import Navbar from './../Navbar/Navbar'
import './Admin.scss'

const Admin = ({userInfo}) => {

    return (
        <>
            <Navbar userInfo={userInfo}/>
            <div>Vous etes sur la page ADMIN</div>
        </>
    )
}

export default Admin;