import React from "react";

function MenuIcon({
  width = "25",
  height = "25",
  color = "white",
  onClick = "",
  className = "",
}) {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 25 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.6111 12H1.38886C0.611085 12 -2.61913e-05 11.12 -2.61913e-05 10C-2.61913e-05 8.88 0.611085 8 1.38886 8H23.6111C24.3889 8 25 8.88 25 10C25 11.12 24.3889 12 23.6111 12ZM12.5 4H1.38886C0.611085 4 -2.61913e-05 3.12 -2.61913e-05 2C-2.61913e-05 0.88 0.611085 0 1.38886 0H12.5C13.2778 0 13.8889 0.88 13.8889 2C13.8889 3.12 13.2778 4 12.5 4ZM12.5 16H23.6111C24.3889 16 25 16.88 25 18C25 19.12 24.3889 20 23.6111 20H12.5C11.7222 20 11.1111 19.12 11.1111 18C11.1111 16.88 11.7222 16 12.5 16Z"
      ></path>
    </svg>
  );
}

export default MenuIcon;
