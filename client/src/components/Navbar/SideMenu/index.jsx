import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import MenuItem from "./MenuItem"; // Assurez-vous que le chemin d'importation est correct
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  ArrowDownIcon,
  CrossIcon,
} from "../../../assets/icons";

const menuItems = [
  {
    name: "CLUB",
    path: "/club",
    subItems: [
      { name: "Historique", path: "/historique" },
      { name: "Bureau", path: "/bureau" },
      // Plus d'items ici
    ],
  },
  {
    name: "SENIOR",
    path: "/senior",
    subItems: [
      {
        name: "R1",
        path: "/r1",
        subItems: [
          { name: "Accueil", path: "/r1/accueil" },
          { name: "Staff", path: "/r1/staff" },
          // Plus d'items ici
        ],
      },
      {
        name: "R2",
        path: "/r2",
        subItems: [
          { name: "Accueil", path: "/r2/accueil" },
          { name: "Staff", path: "/r2/staff" },
          // Plus d'items ici
        ],
      },
      {
        name: "R3",
        path: "/r3",
      },
      // Plus de catégories comme R2, R3, etc.
    ],
  },
  // Plus de catégories principales
];

const SideMenu = ({ isOpen, setIsMenuOpen }) => {
  return (
    <div className={`slide-menu ${isOpen ? "open" : ""}`}>
      <div className="menu-content">
        <div className="menu-header">
          <CrossIcon
            width="20"
            height="20"
            onClick={() => setIsMenuOpen(false)}
            className="close-menu-icon"
          />
          <span>MENU</span>
        </div>
        <nav className="menu-list">
          <ul className="list">
            {menuItems.map((item) => (
              <MenuItem key={item.name} item={item} />
            ))}
          </ul>
        </nav>
      </div>
      <div className="menu-secondary">
        <ul className="social-media">
          <li className="socialIcon">
            <a href="https://facebook.com">
              <FacebookIcon width="18" height="18" color="#48801b" />
            </a>
          </li>
          <li className="socialIcon">
            <a href="https://twitter.com">
              <TwitterIcon width="18" height="18" color="#48801b" />
            </a>
          </li>
          <li className="socialIcon">
            <a href="https://instagram.com">
              <InstagramIcon width="18" height="18" color="#48801b" />
            </a>
          </li>
          <li className="socialIcon">
            <a href="https://youtube.com">
              <YoutubeIcon width="18" height="18" color="#48801b" />
            </a>
          </li>
        </ul>
        <ul>
          <li className="secondary-content">
            <NavLink to="/boutique">BOUTIQUE</NavLink>
          </li>
          <li className="secondary-content">
            <NavLink to="/partenaire">PARTENAIRES</NavLink>
          </li>
          <li className="secondary-content">
            <NavLink to="/boutique">CONTACT</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
