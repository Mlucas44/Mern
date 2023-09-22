import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouseChimney,  faUser, faUserGear, faPeopleGroup, faFutbol, faNewspaper, faReceipt} from '@fortawesome/free-solid-svg-icons'


const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/admin/accueil" activeclassname="active"><FontAwesomeIcon className="fa-icon" icon={faHouseChimney} />Accueil</NavLink>
      <NavLink to="/admin/users" activeclassname="active"><FontAwesomeIcon className="fa-icon" icon={faUser} />Utilisateurs</NavLink>
      <NavLink to="/admin/events" activeclassname="active"><FontAwesomeIcon className="fa-icon" icon={faUserGear} />Rôle</NavLink>
      <NavLink to="/admin/equipe" activeclassname="active"><FontAwesomeIcon className="fa-icon" icon={faPeopleGroup}  />Equipe</NavLink>
      <NavLink to="/admin/joueur" activeclassname="active"><FontAwesomeIcon className="fa-icon" icon={faFutbol} />Joueur</NavLink>
      <NavLink to="/admin/actualite" activeclassname="active"><FontAwesomeIcon className="fa-icon" icon={faNewspaper} />Actualité</NavLink>
      <NavLink to="/admin/convocation" activeclassname="active"><FontAwesomeIcon className="fa-icon" icon={faReceipt} />Convocation</NavLink>
    </div>
  );
};

export default Sidebar;
