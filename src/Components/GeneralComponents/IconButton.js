import React from "react";
import "./IconButton.css";

function IconButton(props) {
  const { icon, rounded, onClick, iconSize, iconRatio, active } = props;
  return (
    <div
      onClick={onClick ? onClick : null}
      className={[
        "IB_icon_container",
        rounded ? "IB_rounded" : "IB_rect",
        active ? "IB_active" : null
      ].join(" ")}
      style={{
        backgroundImage: `url(${icon})`,
        height: iconSize ? iconSize : 64,
        width: iconSize ? iconSize : 64,
        backgroundSize: iconRatio ? `${iconRatio}% ${iconRatio}%` : "70% 70%"
      }}
    />
  );
}

export default IconButton;
