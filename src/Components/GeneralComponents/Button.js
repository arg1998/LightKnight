import React from "react";
import "./Button.css";

function Button(props) {
  const { value, onClick, style } = props;
  return (
    <div
      onClick={e => {
        if (onClick) {
          onClick();
        }
        e.stopPropagation();
      }}
      className={"Button"}
      style={{ ...style }}
    >
      <p>{value}</p>
    </div>
  );
}

export default Button;
