import React from "react";
import Frame from "../Frame/Frame";

function BinaryChannel(props) {
  const {
    zoomLevel,
    fps,
    channelName,
    duration,
    framesData,
    selectChannel,
    isSelected,
    keyFrameWidth,
    setCurrentFramePosition
  } = props;
  let frames = [];
  

  for (let f in framesData) {
    const index = Math.floor(f / (1000 / fps));
    frames.push(
      <Frame
        key={index + f}
        width={keyFrameWidth}
        frame={index}
        color={framesData[f] ? "#d8d79c" : null}
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

export default BinaryChannel;
