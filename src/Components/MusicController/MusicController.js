import React from "react";
import "./MusicController.css";
import play from "./play.png";
import pause from "./pause.png";
import zoomin from "./zoomin.png";
import zoomout from "./zoomout.png";

function MusicController(props) {
  const { isPlaying, playMusic, pauseMusic, zoomTo } = props;
  return (
    <div className={"MC_Container"}>
      <div
        onClick={() => zoomTo("min")}
        className={"MC_Zoom MC_Out"}
        style={{ backgroundImage: `url(${zoomout})` }}
      />
      <div
        onClick={isPlaying ? pauseMusic : playMusic}
        className={isPlaying ? "MC_C MC_Pause" : "MC_C  MC_Play"}
        style={
          isPlaying
            ? { backgroundImage: `url(${pause})` }
            : { backgroundImage: `url(${play})` }
        }
      />
      <div
        onClick={() => zoomTo("max")}
        className={"MC_Zoom MC_In"}
        style={{ backgroundImage: `url(${zoomin})` }}
      />
    </div>
  );
}

export default MusicController;
