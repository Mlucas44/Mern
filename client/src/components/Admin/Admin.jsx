import React from 'react'
//import { NavLink } from 'react-router-dom'
import Navbar from './../Navbar/Navbar'
import './Admin.scss'

const Admin = ({userInfo}) => {

    return (
        <>
            <Navbar userInfo={userInfo}/>
            <div>test</div>
        </>
    )
}

export default Admin;