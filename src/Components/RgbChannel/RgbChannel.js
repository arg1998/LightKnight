import React from "react";
import Frame from "../Frame/Frame";
import "./Channels.css";

function RgbChannel(props) {
  const {
    zoomLevel,
    fps,
    channelName,
    duration,
    framesData,
    keyFrameWidth,
    selectChannel,
    isSelected,
    setCurrentFramePosition
  } = props;
  let frames = [];

  

  for (let f in framesData) {
    let index = Math.floor(f / (1000 / fps));
    frames.push(
      <Frame
        key={index + f}
        width={keyFrameWidth}
        frame={index}
        color={framesData[f]}
        zoomLevel={zoomLevel}
        channelName={channelName}
        setCurrentFramePosition={setCurrentFramePosition}
      />
    );
  }
  return (
    <div
      onClick={() => selectChannel(channelName)}
      className={isSelected ? "Channel Channel_Selected" : "Channel"}
    >
      {frames}
    </div>
  );
}

export default RgbChannel;
