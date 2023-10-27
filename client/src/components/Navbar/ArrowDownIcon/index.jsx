import React from "react";

function ArrowDownIcon({
  width = "25",
  height = "25",
  color = "white",
  className = "",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 8"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1406 0.00921481C12.6706 0.00921481 13.2006 0.229812 13.5687 0.671106C14.2312 1.46535 14.1134 2.62744 13.3331 3.28936L8.19491 7.56975C7.50295 8.14342 6.50186 8.14342 5.80988 7.56975L0.671703 3.28936C-0.123262 2.62747 -0.226373 1.46538 0.436119 0.671106C1.09861 -0.123169 2.26174 -0.22616 3.05673 0.435734L7.00238 3.7159L10.948 0.435734C11.3015 0.14168 11.7136 0.00921481 12.1406 0.00921481Z"
        fill="white"
      ></path>
    </svg>
  );
}

export default ArrowDownIcon;
