import React, { Component } from "react";
import WaveForm from "../WaveForm/WaveForm";
import ChannelsContainer from "../ChannelsContainer/ChannelsContainer";
import { connect } from "react-redux";
import MusicController from "../MusicController/MusicController";
import FrameSelector from "../FrameSelector/FrameSelector";
import {
  zoomTo,
  play,
  pause,
  moveFramePos,
  selectChannel,
  setCurrentFramePos,
} from "../../redux/actions/App.actions";
import "./Animator.css";
import Button from "../GeneralComponents/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import {
  placeKeyframe,
  removeKeyframe,
  addRgbChannel,
  addBinChannel,
  addOpacityChannel,
  removeSelectedChannel,
} from "../../redux/actions/Channels.actions";
import { toOpacity } from "../../utils/OpacityToAlphaScalar";
import tinyColor from "tinycolor2";
import CopyAndRemove from "../CopyAndRemove/CopyAndRemove";
import GradientEffect from "../GradientEffect/GradientEffect";
import { writeJsonFile } from "../../utils/IO";
import removeIcon from "./eraser.png";
import editIcon from "./edit.png";
import IconButton from "../GeneralComponents/IconButton";
import LiveStage from "../LiveStage/LiveStage";

const { ipcRenderer } = require("electron");

class Animator extends Component {
  state = {
    waveSurferLoaded: false,
    currentColor: null,
    focusOnInput: false,
  };
  speed = 1.0;
  ctrlPressed = false;

  _changeSped = (value) => {
    this.speed += value;
    if (this.speed < 0.5) {
      this.speed = 0.5;
    } else if (this.speed > 1.0) {
      this.speed = 1.0;
    } else {
      this.waveForm.setPlaybackRate(this.speed);
    }
  };

  componentDidMount() {
    document.addEventListener("keypress", this._handleGlobalKeyPress);
    ipcRenderer.send(
      "change_title",
      `${this.props.projectName} : [${this.props.projectPath}]`
    );
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this._handleGlobalKeyPress);
  }

  _saveProject = async () => {
    const { projectPath, channelsData, maxFrames } = this.props;
    delete channelsData["clipBoard"];
    channelsData["framesCount"] = maxFrames;
    console.log("path: ", projectPath);

    await writeJsonFile(projectPath, "channelsData.json", channelsData);
  };

  _setFocusOnInput = (focus) => {
    this.setState({ focusOnInput: focus });
  };

  _receiveWaveForm = (wf) => {
    this.waveForm = wf;
    this.setState({ waveSurferLoaded: true });
  };

  _handleOnColorPickerChange = (color) => {
    this.setState({ currentColor: color.hex });
  };

  _handleRemoveKeyframe = () => {
    const { removeKeyFrame, selectedChannel, currentFramePos } = this.props;
    if (selectedChannel === null) {
      console.log(
        "Can not REMOVE keyframe when no channel is selected, select a channel by clicking on it"
      );
      return;
    }
    removeKeyFrame(selectedChannel, currentFramePos);
  };

  _handlePlaceKeyframe = () => {
    const { placeKeyFrame, selectedChannel, currentFramePos } = this.props;
    if (selectedChannel === null) {
      console.log(
        "Can not PLACE keyframe when no channel is selected, select a channel by clicking on it"
      );
      return;
    }
    let data = true; // if its on a binary channel
    if (selectedChannel.startsWith("rgb")) {
      // if its on the rgb channel
      data = this.state.currentColor;
    } else if (
      selectedChannel.startsWith("opa") &&
      this.state.currentColor !== null
    ) {
      // if its on the opacity channel
      const hsl_lightness = tinyColor(this.state.currentColor).toHsl().l;
      data = Math.floor(toOpacity(hsl_lightness));
    }
    placeKeyFrame(selectedChannel, currentFramePos, data);
  };

  _moveSelectedChannelUpOrDown = (direction) => {
    const { selectedChannel, channelsData } = this.props;
    if (!selectedChannel) {
      console.log("select a channel first, then navigate between them.");
      return;
    }

    const channelsList = [
      ...[...channelsData.rgbChannels].reverse(),
      ...[...channelsData.opacityChannels].reverse(),
      ...[...channelsData.binaryChannels].reverse(),
    ];

    const currentIndex = channelsList.findIndex(
      (element) => element === selectedChannel
    );
    if (currentIndex < 0) {
      console.log(
        "current selected channel (" + selectedChannel + ") is invalid"
      );
      return;
    }

    let newSelectedChannelIndex = 0;
    if (direction === "up") {
      newSelectedChannelIndex = (currentIndex + 1) % channelsList.length;
    } else {
      if (currentIndex === 0) {
        newSelectedChannelIndex = channelsList.length - 1;
      } else {
        newSelectedChannelIndex = currentIndex - 1;
      }
    }

    const channel = channelsList[newSelectedChannelIndex];

    if (channel) {
      this.props.selectChannel(channel);
    }
  };
  _handleGlobalKeyPress = (e) => {
    const keyCode = e.keyCode;

    switch (keyCode) {
      case 32: // SPACE : remove a keyframe
        this._handleRemoveKeyframe();
        break;
      case 13: // ENTER : place a keyframe
        this._handlePlaceKeyframe();
        break;

      case 49: // NUM_PAD_1 : move frame backward
        if (this.state.focusOnInput) break;
        this.props.moveFramePos(-1);
        break;

      case 51: // NUM_PAD_3 : move frame forward
        if (this.state.focusOnInput) break;
        this.props.moveFramePos(+1);
        break;

      case 52: // NUM_PAD_4 : move frame backward
        if (this.state.focusOnInput) break;
        this.props.moveFramePos(-5);
        break;

      case 54: // NUM_PAD_6 : move frame forward
        if (this.state.focusOnInput) break;
        this.props.moveFramePos(+5);
        break;

      case 55: // NUM_PAD_7 : move frame backward
        if (this.state.focusOnInput) break;
        this.props.moveFramePos(-25);
        break;

      case 57: // NUM_PAD_9 : move frame forward
        if (this.state.focusOnInput) break;
        this.props.moveFramePos(+25);
        break;
      case 91: // [ key for lowering the playback speed
        this._changeSped(-0.1);
        break;
      case 93: // ] key for lowering the playback speed
        this._changeSped(0.1);
        break;

      case 119:
        //w key to move channel up
        this._moveSelectedChannelUpOrDown("up");
        break;

      case 115:
        // s key to move channel down
        this._moveSelectedChannelUpOrDown("down");
        break;
      default:
        break;
    }
    // console.log(keyCode);
  };

  render() {
    const {
      zoomLevel,
      duration,
      fps,
      channelsData,
      isPlaying,
      zoomTo,
      playMusic,
      pauseMusic,
      currentFramePos,
      moveFramePos,
      selectedChannel,
      selectChannel,
      loading,
      maxFrames,
      setCurrentFramePosition,
      musicFileBlob,
    } = this.props;

    let wf = (
      <WaveForm
        key="WAVEFORM"
        musicFileBlob={musicFileBlob}
        propagateReference={this._receiveWaveForm}
        currentFramePos={currentFramePos}
        fps={fps}
      />
    );

    if (loading) {
      return (
        <div>
          <center>
            <h2 style={{ color: "#efe" }}>Loading ...</h2>
          </center>
          {wf}
        </div>
      );
    }

    return (
      <>
        <div className={"Animator_Header"}>
          <div>
            <Button
              value={"Add RGB Channel"}
              onClick={() => {
                this.props.addRgbChannel();
              }}
            />
            <Button
              value={"Add Opacity Channel"}
              onClick={() => {
                this.props.addOpacityChannel();
              }}
            />
            <Button
              value={"Add Binary Channel"}
              onClick={() => {
                this.props.addBinaryChannel();
              }}
            />
            <Button
              value={"REMOVE SELECTED CHANNEL"}
              onClick={() => {
                if (selectedChannel) {
                  this.props.removeSelectedChannel(selectedChannel);
                }
              }}
            />
          </div>
          <Button value={"Save"} onClick={this._saveProject} />
        </div>

        <div className={"Animator_middle_area"}>
          <div className={"Animator_ColorPalletContainer"}>
            <ColorPicker
              color={this.state.currentColor}
              onChange={this._handleOnColorPickerChange}
            />
          </div>
          <LiveStage
            channelsData={channelsData}
            selectedChannel={selectedChannel}
            selectChannel={selectChannel}
            waveFormRef={this.waveForm}
          />

          <div className={"Animator_mid_copy_remove_container"}>
            <GradientEffect
              onInputFocus={this._setFocusOnInput}
              currentColor={this.state.currentColor}
            />
            <CopyAndRemove onInputFocus={this._setFocusOnInput} />
          </div>
        </div>

        <div className={"Animator_Bottom"}>
          <div>
            <ChannelsContainer
              zoomLevel={zoomLevel}
              duration={duration}
              waveFormRef={this.waveForm}
              fps={fps}
              maxFrames={maxFrames}
              channelsData={channelsData}
              selectedChannel={selectedChannel}
              selectChannel={selectChannel}
              currentFramePos={currentFramePos}
              setCurrentFramePosition={setCurrentFramePosition}
            />
            {wf}
            <div className={"Animator_MC_Container"}>
              <MusicController
                isPlaying={isPlaying}
                playMusic={playMusic}
                pauseMusic={pauseMusic}
                zoomTo={zoomTo}
              />
              <div style={{ marginLeft: "auto" }}>
                <IconButton
                  rounded={true}
                  icon={removeIcon}
                  onClick={this._handleRemoveKeyframe}
                />
                <IconButton
                  rounded={true}
                  icon={editIcon}
                  onClick={this._handlePlaceKeyframe}
                />
              </div>
              <FrameSelector
                currentFramePos={currentFramePos}
                moveFramePos={moveFramePos}
                isPlaying={isPlaying}
                fps={fps}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (newState) => ({
  isPlaying: newState.app.play,
  zoomLevel: newState.app.zoomLevel,
  duration: newState.app.duration,
  fps: newState.app.fps,
  channelsData: newState.channels,
  currentFramePos: newState.app.currentFramePos,
  selectedChannel: newState.app.selectedChannel,
  loading: newState.app.loading,
  maxFrames: newState.app.maxFrames,
  projectName: newState.app.projectName,
  projectPath: newState.app.projectPath,
  musicPath: newState.app.musicPath,
  musicFileBlob: newState.app.musicFileBlob,
});

const mapDispatchToProps = (dispatch) => ({
  zoomTo: (level) => dispatch(zoomTo(level)),
  playMusic: () => dispatch(play()),
  pauseMusic: () => dispatch(pause()),
  moveFramePos: (jump) => dispatch(moveFramePos(jump)),
  selectChannel: (name) => dispatch(selectChannel(name)),
  setCurrentFramePosition: (pos) => dispatch(setCurrentFramePos(pos)),
  placeKeyFrame: (channelName, framePos, data) =>
    dispatch(placeKeyframe(channelName, framePos, data)),
  removeKeyFrame: (channelName, framePos) =>
    dispatch(removeKeyframe(channelName, framePos)),
  addRgbChannel: () => dispatch(addRgbChannel()),
  addBinaryChannel: () => dispatch(addBinChannel()),
  addOpacityChannel: () => dispatch(addOpacityChannel()),
  removeSelectedChannel: (channelID) =>
    dispatch(removeSelectedChannel(channelID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Animator);
