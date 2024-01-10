import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  MenuIcon,
  MailIcon,
} from "../../assets/icons";
import logo from "../../assets/images/logo1.png";
import SideMenu from "./SideMenu";

const Navbar = ({ userInfo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOutsideClick = useCallback(
    (event) => {
      if (
        isMenuOpen &&
        !document.querySelector(".slide-menu").contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen, handleOutsideClick]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

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
            <MailIcon width="20" height="20" />
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

export default Navbar;
