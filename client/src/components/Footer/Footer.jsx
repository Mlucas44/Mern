import React from "react";
import "./Footer.scss";
import FacebookIcon from "../Navbar/FacebookIcon";
import InstagramIcon from "../Navbar/InstagramIcon";
import TwitterIcon from "../Navbar/TwitterIcon";
import YoutubeIcon from "../Navbar/YoutubeIcon";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo">
          <FacebookIcon width="20" height="20" />
          {/* <img src="/path-to-your-logo.svg" alt="Nereus" /> */}
        </div>
        <nav className="footer-nav">
          <a href="/link1">First Link</a>
          <a href="/link2">Second Link</a>
          <a href="/link3">Third Link</a>
          <a href="/link4">Fourth Link</a>
        </nav>
        <div className="social-media">
          {/* Icons can be SVGs or icon-fonts like FontAwesome Participer*/}
          <a href="/facebook" aria-label="Facebook">
            <FacebookIcon width="20" height="20" />
          </a>
          <a href="/twitter" aria-label="Twitter">
            <TwitterIcon width="20" height="20" />
          </a>
          <a href="/instagram" aria-label="Instagram">
            <InstagramIcon width="20" height="20" />
          </a>
          <a href="/linkedin" aria-label="LinkedIn">
            <YoutubeIcon width="20" height="20" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
