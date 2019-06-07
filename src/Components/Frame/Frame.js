import React from "react";
import "./Frame.css";

function Frame(props) {
  const {
    frame,
    width,
    zoomLevel,
    fps,
    color,
    setCurrentFramePosition
  } = props;
  return (
    <div
      className={"Frame_Container"}
      onClick={() => setCurrentFramePosition(frame)}
      style={{
        width: width,
        left: frame * width,
        backgroundColor: color
      }}
    />
  );
}

export default Frame;
