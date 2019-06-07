import React from "react";
import "./ColorPicker.css";
import Chrome from "react-color/lib/Chrome";

function ColorPicker(props) {
  const { color, onChange } = props;
  return (
    <>
      <p>Color Pallet</p>
      <div className={"CP_Containers"}>
        <Chrome
          disableAlpha={true}
          color={color || "#fff"}
          onChangeComplete={onChange}
        />
      </div>
      <p style={{ margin: "2px 0px" }}>Click Below To Copy</p>
      <div
        onClick={() =>
          navigator.clipboard
            .writeText(color)
            .then()
            .catch()
        }
        style={{
          flexGrow: 1,
          marginBottom: 4,
          width: "95%",
          backgroundColor: color
        }}
      />
    </>
  );
}

export default ColorPicker;
