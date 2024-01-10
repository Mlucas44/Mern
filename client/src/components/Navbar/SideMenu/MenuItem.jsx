import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowDownIcon } from "../../../assets/icons";
import "./MenuItem.scss";

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <li className="menu-catégorie">
      <div className="menu-dropdown-header" onClick={toggle}>
        <span>{item.name}</span>
        <ArrowDownIcon
          className={`arrow-transition ${isOpen ? "rotated" : ""}`}
        />
      </div>
      {isOpen && item.subItems && (
        <ul className={`menu-sous-categorie ${isOpen ? "open" : ""}`}>
          {item.subItems.map((subItem) => (
            <MenuItem key={subItem.name} item={subItem} isSubItem />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
