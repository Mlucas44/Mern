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
              width="18"
              height="18"
              onClick={toggleMenu}
              className="cursor-pointer"
            />
            <span onClick={toggleMenu} className="cursor-pointer">
              Menu
            </span>

            <NavLink to="/partenaire" className="menu-item">
              Partenaire
            </NavLink>
            <NavLink to="/boutique" className="menu-item">
              Boutique
            </NavLink>
          </div>

          <div className="center-menu">
            <div className="logo">
              <img src={logo} alt="Logo" className="navbar-logo"></img>
            </div>
          </div>

          <div className="right-menu">
            <FacebookIcon width="18" height="18" />
            <InstagramIcon width="18" height="18" />
            <TwitterIcon width="18" height="18" />
            <YoutubeIcon width="18" height="18" />
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
  const [isClubExpanded, setClubExpanded] = useState(false);
  const [isSeniorExpanded, setSeniorExpanded] = useState(false);

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
                onClick={() => setClubExpanded(!isClubExpanded)}
              >
                <span> Club </span>
                <ArrowDownIcon width="14" height="8" />
              </div>
              <div
                className={`menu-sous-categorie ${
                  isClubExpanded ? "open" : ""
                }`}
              >
                <ul>
                  <li>
                    <NavLink to="/historique">HISTORIQUE</NavLink>
                  </li>
                  <li>
                    <NavLink to="/bureau">BUREAU</NavLink>
                  </li>
                  <li>
                    <NavLink to="/organigramme">ORGANIGRAMME</NavLink>
                  </li>
                  <li>
                    <NavLink to="/installation">INSTALLATION</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-catégorie">
              <div
                className="menu-dropdown-header"
                onClick={() => setSeniorExpanded(!isSeniorExpanded)}
              >
                <span>SENIOR</span>
                <ArrowDownIcon width="14" height="8" />
              </div>
              <div
                className={`menu-sous-categorie ${
                  isSeniorExpanded ? "open" : ""
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
          <li>
            <a href="https://facebook.com">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="https://twitter.com">
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a href="https://instagram.com">
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a href="https://youtube.com">
              <YoutubeIcon />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/boutique">Boutique</NavLink>
          </li>
          <li>
            <NavLink to="/partenaire">Partenaire</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

//               {userInfo && userInfo.role === "admin" && (
//                 <li>
//                   <NavLink to="/admin" className="menu-item">
//                     Admin
//                   </NavLink>
//                 </li>
//               )}

// const DropdownMenu = ({ userInfo }) => {
//   const { user } = useAuthContext();
//   const { logout } = useLogout();
//   const handleclick = () => {
//     logout();
//   };
//   const [open, setopen] = useState("");
//   //it will help to show and hide dropdown menu bar.
//   function Toggle_dropdown() {
//     open === "active" ? setopen("") : setopen("active");
//   }

//   return (
//     <>
//       <div className="right-menu">
//         <div className="dropdown-menu" onClick={() => Toggle_dropdown()}>
//           <div className="user-pic">
//             <img src={avatar} alt="" />
//           </div>
//           <div className="user-data">
//             <span>{user.name}</span>
//           </div>
//         </div>
//         <div className={"drodown-box " + open}>
//           <ul className="dropdown-item">
//             <li>
//               <NavLink to="/profile">Mon profil</NavLink>
//             </li>
//             <li>
//               <NavLink onClick={handleclick} className="btn btn-dark btn-icon">
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M10 13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1M6 11l3-3-3-3M8.5 8H3"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     vectorEffect="non-scaling-stroke"
//                   ></path>
//                 </svg>
//                 <span>Logout</span>
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// const LoginMenu = () => {
//   return (
//     <>
//       <div className="right-menu">
//         <NavLink to="/signup" className="btn btn-light">
//           Sign up
//         </NavLink>
//         <NavLink to="/login" className="btn btn-dark btn-icon">
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 16 16"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M10 13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1M6 11l3-3-3-3M8.5 8H3"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               vectorEffect="non-scaling-stroke"
//             ></path>
//           </svg>
//           <span>Sign in</span>
//         </NavLink>
//       </div>
//     </>
//   );
// };
