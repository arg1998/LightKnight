import React from "react";
import "./FrameSelector.css";
import backward1 from "./backward1.png";
import backward5 from "./backward5.png";
import backward25 from "./backward25.png";
import forward1 from "./forward1.png";
import forward5 from "./forward5.png";
import forward25 from "./forward25.png";

function FrameSelector(props) {
  const { currentFramePos, moveFramePos, fps } = props;
  return (
    <div className={"FS_Container"}>
      <div
        onClick={() => moveFramePos(-25)}
        className={"FS_Backward FS_Backward25"}
        style={{ backgroundImage: `url(${backward25})` }}
      />
      <div
        onClick={() => moveFramePos(-5)}
        className={"FS_Backward FS_Backward5"}
        style={{ backgroundImage: `url(${backward5})` }}
      />
      <div
        onClick={() => moveFramePos(-1)}
        className={"FS_Backward FS_Backward1"}
        style={{ backgroundImage: `url(${backward1})` }}
      />
      <div className={"FS_FramePosContainer"}>
        <input
          className={"FS_FramePos"}
          type="number"
          readOnly={true}
          value={currentFramePos}
        />
        <span className={"FS_FrameMiliSec"}>
          {(currentFramePos * 1000) / fps} ms
        </span>
      </div>

      <div
        onClick={() => moveFramePos(+1)}
        className={"FS_Backward FS_Forward1"}
        style={{ backgroundImage: `url(${forward1})` }}
      />
      <div
        onClick={() => moveFramePos(+5)}
        className={"FS_Backward FS_Forward5"}
        style={{ backgroundImage: `url(${forward5})` }}
      />
      <div
        onClick={() => moveFramePos(+25)}
        className={"FS_Backward FS_Forward25"}
        style={{ backgroundImage: `url(${forward25})` }}
      />
    </div>
  );
}

export default FrameSelector;
