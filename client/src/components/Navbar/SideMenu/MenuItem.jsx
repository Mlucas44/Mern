import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowDownIcon } from "../../../assets/icons";
import "./MenuItem.scss";

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <li className="menu-catégorie">
      <div
        className="menu-dropdown-header"
        onClick={hasSubItems ? toggle : null}
      >
        <span>{item.name}</span>
        {hasSubItems && (
          <ArrowDownIcon
            width="15"
            height="10"
            className={`arrow-transition ${isOpen ? "rotated" : ""}`}
          />
        )}
      </div>
      {isOpen && hasSubItems && (
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
