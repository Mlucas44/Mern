import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouseChimney,  faUser, faUserGear, faPeopleGroup, faFutbol, faNewspaper, faReceipt} from '@fortawesome/free-solid-svg-icons'


const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/admin/accueil" activeClassName="active-link"><FontAwesomeIcon className="fa-icon" icon={faHouseChimney}  />Accueil</NavLink>
      <NavLink to="/admin/users" activeClassName="active-link"><FontAwesomeIcon className="fa-icon" icon={faUser} />Utilisateurs</NavLink>
      <Link to="/admin/accueil"><FontAwesomeIcon className="fa-icon" icon={faHouseChimney}  />Accueil</Link>
      <Link to="/admin/users"><FontAwesomeIcon className="fa-icon" icon={faUser} />Utilisateurs</Link>
      <Link to="/admin/events"><FontAwesomeIcon className="fa-icon" icon={faUserGear} />Rôle</Link>
      <Link to="/admin/players"><FontAwesomeIcon className="fa-icon" icon={faPeopleGroup}  />Equipe</Link>
      <Link to="/admin/players"><FontAwesomeIcon className="fa-icon" icon={faFutbol} />Joueur</Link>
      <Link to="/admin/players"><FontAwesomeIcon className="fa-icon" icon={faNewspaper} />Actualité</Link>
      <Link to="/admin/players"><FontAwesomeIcon className="fa-icon" icon={faReceipt} />Convocation</Link>
    </div>
  );
};

export default Sidebar;
