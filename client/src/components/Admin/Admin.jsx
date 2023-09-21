import React  from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserAdmin from './UserAdmin';
import Accueil from './Accueil';
import './Admin.scss';

const Admin = () => {

  return (
    
    <div className="admin-container">
      <Sidebar />
        <div className="content-wrapper">
            <Routes>
                <Route path="/" element={<Navigate to="/admin/accueil" />} />
                <Route path="accueil" element={<Accueil />} />
                <Route path="users" element={<UserAdmin />} />
            </Routes>
        </div>
    </div>
  );
};

export default Admin;
