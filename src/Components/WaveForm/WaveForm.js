import React, { Component } from "react";
import { connect } from "react-redux";
import tl from "./wavesurfer.timeline";
import {
  setDuration,
  setCurrentFramePos
} from "../../redux/actions/App.actions";
const WaveSurfer = require("wavesurfer.js");
const timeline = require("wavesurfer.js/dist/plugin/wavesurfer.timeline");

class WaveForm extends Component {
  createWaveForm = () => {
    const {
      propagateReference,
      zoomLevel,
      setDuration,
      setCurrentFramePos,
      musicFileBlob
    } = this.props;

    // if (this.waveSurfer) {
    //   this.waveSurfer.unAll();
    //   this.waveSurfer.empty();
    //   this.waveSurfer.destroy();
    //   this.waveSurfer = null;
    // }

    this.waveSurfer = WaveSurfer.create({
      container: "#waveform",
      responsive: true,
      splitChannels: false,
      cursorWidth: 1,
      scrollParent: true,
      cursorColor: "#def725",
      progressColor: "#757474",
      waveColor: "#eff2ea",
      plugins: [
        timeline.create({
          container: "#waveform-timeline",
          formatTimeCallback: tl.formatTimeCallback,
          timeInterval: tl.timeInterval,
          primaryLabelInterval: tl.primaryLabelInterval,
          secondaryLabelInterval: tl.secondaryLabelInterval,
          primaryFontColor: "#ffe",
          height: 30
        })
      ]
    });
    this.waveSurfer.zoom(zoomLevel);
    this.waveSurfer.on("ready", () => {
      setDuration(this.waveSurfer.getDuration());
    });
    this.waveSurfer.on("seek", progress => {
      setCurrentFramePos(
        Math.floor((progress * this.waveSurfer.getDuration()) / 0.04)
      );
    });

    propagateReference(this.waveSurfer);
    this.waveSurfer.loadBlob(musicFileBlob);
  };

  componentDidMount() {
    this.createWaveForm();
  }

  componentWillReceiveProps(props) {
    if (this.props.zoomLevel !== props.zoomLevel) {
      this.waveSurfer.zoom(props.zoomLevel);
    }
    if (props.isPlaying) {
      this.waveSurfer.play();
    } else {
      this.waveSurfer.pause();
    }
  }

  render() {
    return (
      <div>
        <div id="waveform" />
        <div id="waveform-timeline" />
      </div>
    );
  }
}

const mapStateToProps = newState => ({
  fps: newState.app.fps,
  zoomLevel: newState.app.zoomLevel,
  isPlaying: newState.app.play,
  duration: newState.app.duration
});

const mapDispatchToProps = dispatch => ({
  setDuration: duration => dispatch(setDuration(duration)),
  setCurrentFramePos: pos => dispatch(setCurrentFramePos(pos))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveForm);
