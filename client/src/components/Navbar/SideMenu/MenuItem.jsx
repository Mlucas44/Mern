import React, { useState } from "react";
import { ArrowDownIcon } from "../../../assets/icons";
import "./MenuItem.scss";

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <li className="menu-category__item">
      <div
        className="menu-category__dropdown-header"
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
        <ul className={`menu-category__sub-category ${isOpen ? "open" : ""}`}>
          {item.subItems.map((subItem) => (
            <MenuItem key={subItem.name} item={subItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
