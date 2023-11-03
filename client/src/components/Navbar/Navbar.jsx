import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import FacebookIcon from "./FacebookIcon";
import InstagramIcon from "./InstagramIcon";
import TwitterIcon from "./TwitterIcon";
import YoutubeIcon from "./YoutubeIcon";
import MenuIcon from "./MenuIcon";
import ArrowDownIcon from "./ArrowDownIcon";
import CrossIcon from "./CrossIcon";
import logo from "./logo.png";

const Navbar = ({ userInfo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    const handleOutsideClick = (event) => {
      if (
        isMenuOpen &&
        !document.querySelector(".slide-menu").contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={`nav-container ${isScrolled ? "scrolled" : ""}`}>
        <nav className="navbar">
          <div className="left-menu">
            <MenuIcon
              width="25"
              height="20"
              onClick={toggleMenu}
              className="cursor-pointer"
            />
            <span onClick={toggleMenu} className="cursor-pointer">
              MENU
            </span>

            <NavLink to="/partenaire" className="menu-item">
              PARTENAIRE
            </NavLink>
            <NavLink to="/boutique" className="menu-item">
              BOUTIQUE
            </NavLink>
          </div>

          <div className="center-menu">
            <div className="logo">
              <img src={logo} alt="Logo" className="navbar-logo"></img>
            </div>
          </div>

          <div className="right-menu">
            <FacebookIcon width="20" height="20" />
            <InstagramIcon width="20" height="20" />
            <TwitterIcon width="20" height="20" />
            <YoutubeIcon width="20" height="20" />
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <SideMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

const SideMenu = ({ isOpen, setIsMenuOpen }) => {
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);
  const CLUB = "CLUB";
  const SENIOR = "SENIOR";
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
            <li className="menu-catégorie">
              <div
                className="menu-dropdown-header"
                // Pour la sous-catégorie "CLUB"
                onClick={() => {
                  setExpandedSubMenu(expandedSubMenu !== CLUB ? CLUB : null);
                }}
              >
                <span> CLUB </span>
                <ArrowDownIcon
                  width="14"
                  height="8"
                  className={`arrow-transition ${
                    expandedSubMenu === CLUB ? "rotated" : ""
                  }`}
                />
              </div>
              <div
                className={`menu-sous-categorie ${
                  expandedSubMenu === CLUB ? "open" : ""
                }`}
              >
                <ul>
                  <li>
                    <NavLink to="/historique">Historique</NavLink>
                  </li>
                  <li>
                    <NavLink to="/bureau">Bureau</NavLink>
                  </li>
                  <li>
                    <NavLink to="/organigramme">Organigramme</NavLink>
                  </li>
                  <li>
                    <NavLink to="/installation">Installation</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-catégorie">
              <div
                className="menu-dropdown-header"
                // Pour la sous-catégorie "SENIOR"
                onClick={() => {
                  setExpandedSubMenu(
                    expandedSubMenu !== SENIOR ? SENIOR : null
                  );
                }}
              >
                <span>SENIOR</span>
                <ArrowDownIcon
                  width="14"
                  height="8"
                  className={`arrow-transition ${
                    expandedSubMenu === SENIOR ? "rotated" : ""
                  }`}
                />
              </div>
              <div
                className={`menu-sous-categorie ${
                  expandedSubMenu === SENIOR ? "open" : ""
                }`}
              >
                <ul>
                  <li>
                    <NavLink to="/r1">R1</NavLink>
                  </li>
                  <li>
                    <NavLink to="/r2">R2</NavLink>
                  </li>
                  <li>
                    <NavLink to="/r3">R3</NavLink>
                  </li>
                  <li>
                    <NavLink to="/d2">D2</NavLink>
                  </li>
                </ul>
              </div>
            </li>
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

export default Navbar;
