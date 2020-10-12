import React from "react";
import Frame from "../Frame/Frame";
import tinyColor from "tinycolor2";
import { toAlpha } from "../../utils/OpacityToAlphaScalar";

function OpacityChannel(props) {
  const {
    zoomLevel,
    fps,
    channelName,
    duration,
    framesData,
    keyFrameWidth,
    selectChannel,
    isSelected,
    setCurrentFramePosition,
  } = props;
  let frames = [];

  for (let f in framesData) {
    const index = Math.floor(f / (1000 / fps));
    const alpha = toAlpha(framesData[f]);
    const color = tinyColor("#fff").setAlpha(alpha).toHex8String();

    frames.push(
      <Frame
        key={index + f}
        width={keyFrameWidth}
        frame={index}
        color={color}
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

export default OpacityChannel;
