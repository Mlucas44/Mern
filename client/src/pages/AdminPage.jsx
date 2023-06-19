import React from 'react'
import Admin from './../components/Admin/Admin' 

const AdminPage = ({userInfo}) => {
    // Ici, vous récupérerez la liste des utilisateurs depuis l'API, 
    // et vous afficherez cette liste dans le tableau ou la liste
    return (
        <>
    <Admin userInfo={userInfo}/>
    </>
    );
};

export default AdminPage