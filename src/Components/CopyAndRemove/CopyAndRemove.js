import React, { Component } from "react";
import "./CopyAndRemove.css";
import Button from "../GeneralComponents/Button";
import { connect } from "react-redux";
import {
  copyKeyFrames,
  pasteKeyFrames,
  removeKeyFrameRange,
} from "../../redux/actions/Channels.actions";

class CopyAndRemove extends Component {
  state = {
    isCtrlPressed: false,
  };

  selectionRange = {
    beginPose: 0,
    endPose: 0,
  };

  componentDidMount() {
    document.addEventListener("keydown", this._ctrlPressHandler);
    document.addEventListener("keyup", this._ctrlReleaseHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this._ctrlPressHandler);
    document.removeEventListener("keyup", this._ctrlReleaseHandler);
  }

  _ctrlPressHandler = (e) => {
    if (e.keyCode === 17 && !this.state.isCtrlPressed) {
      this.setState({ isCtrlPressed: true });
    }
  };
  _ctrlReleaseHandler = (e) => {
    if (e.keyCode === 17) {
      this.setState({ isCtrlPressed: false });
    }
  };

  calculateSelectionRange(currentPose) {
    const { isCtrlPressed } = this.state;

    if (isCtrlPressed) {
      if (currentPose < this.selectionRange.beginPose) {
        this.selectionRange.endPose = this.selectionRange.beginPose;
        this.selectionRange.beginPose = currentPose;
      } else {
        this.selectionRange.endPose = currentPose;
      }
    } else if (this.selectionRange.endPose !== currentPose) {
      this.selectionRange.beginPose = currentPose;
    }
  }

  _handleFocus = () => {
    this.props.onInputFocus(true);
  };

  _handleBlur = () => {
    this.props.onInputFocus(false);
  };

  // _handleChange = (value, id) => {
  //   if (String(value).includes(".")) return;
  //   value = Number(value);
  //   if (!Number.isInteger(value)) return;
  //   if (value < 0) return;
  //   this.setState({ [id]: value });
  // };

  _handleClearInputs = () => {
    this.selectionRange.beginPose = 0;
    this.selectionRange.endPose = 0;
    this.setState({});
  };

  _removeKeyFrames = () => {
    const { beginPose, endPose } = this.selectionRange;
    const { selectedChannel, maxFrames, removeKeyFrameRange } = this.props;
    if (selectedChannel === null) {
      console.log("a channel must be selected to remove its keyframes");
      return;
    } else if (
      beginPose >= endPose ||
      endPose > maxFrames ||
      endPose - beginPose === 1
    ) {
      console.log("remove range is not valid");
      return;
    } else {
      removeKeyFrameRange(beginPose, endPose, selectedChannel, maxFrames);
    }
  };

  _pasteKeyFrames = () => {
    const {
      currentPos,
      selectedChannel,
      pasteKeyFrames,
      maxFrames,
    } = this.props;

    if (currentPos === "" || currentPos >= maxFrames) {
      console.log("Paste To keyframe must be lower than ", maxFrames);
      return;
    }
    pasteKeyFrames(currentPos, selectedChannel, maxFrames);
  };

  _copyKeyframes = () => {
    const { selectedChannel, copyKeyFrames } = this.props;
    const { beginPose, endPose } = this.selectionRange;

    if (beginPose >= endPose) {
      console.log("endPose must be greater than beginPose");
      return;
    } else if (selectedChannel === null) {
      console.log("A channel must be selected first to copy");
      return;
    }
    copyKeyFrames(beginPose, endPose, selectedChannel);
  };

  render() {
    const { currentPos } = this.props;
    this.calculateSelectionRange(currentPos);

    return (
      <div className={"CAR_Container"}>
        <form>
          <label>
            <strong>Copy&nbsp;&nbsp;</strong>
            <i>from </i>
            <input
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              readOnly={true}
              // onChange={(e) => this._handleChange(e.target.value, "copyFrom")}
              value={this.selectionRange.beginPose}
            />
            <i>&nbsp;To&nbsp; </i>
            <input
              // onChange={(e) => this._handleChange(e.target.value, "copyTo")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.selectionRange.endPose}
              readOnly={true}
            />
          </label>

          <label>
            <strong>Paste </strong>
            <i>to &nbsp;&nbsp;&nbsp;&nbsp;</i>
            <input
              // onChange={(e) => this._handleChange(e.target.value, "pasteFrom")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={currentPos}
              readOnly={true}
            />
            <Button value={"Clear"} onClick={this._handleClearInputs} />
          </label>
        </form>
        <Button value={"Copy  KeyFrames"} onClick={this._copyKeyframes} />
        <Button value={"Paste KeyFrames"} onClick={this._pasteKeyFrames} />
        <div className={"CAR_HorizontalLine"} />

        <form>
          <label>
            <strong>Remove&nbsp;&nbsp;</strong>
            <i>from </i>
            <input
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              // onChange={(e) => this._handleChange(e.target.value, "removeFrom")}
              value={this.selectionRange.beginPose}
              readOnly={true}
            />
            <i>&nbsp;To&nbsp; </i>
            <input
              // onChange={(e) => this._handleChange(e.target.value, "removeTo")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.selectionRange.endPose}
              readOnly={true}
            />
          </label>
        </form>
        <Button value={"Remove"} onClick={this._removeKeyFrames} />
      </div>
    );
  }
}

const mapStateToProps = (newState) => ({
  fps: newState.app.fps,
  maxFrames: newState.app.maxFrames,
  selectedChannel: newState.app.selectedChannel,
  currentPos: newState.app.currentFramePos,
});

const mapDispatchToProps = (dispatch) => ({
  copyKeyFrames: (copyFrom, copyTo, channelName) =>
    dispatch(copyKeyFrames(copyFrom, copyTo, channelName)),
  pasteKeyFrames: (pasteTo, channelName, maxFrames) =>
    dispatch(pasteKeyFrames(pasteTo, channelName, maxFrames)),
  removeKeyFrameRange: (removeFrom, removeTo, channelName, maxFrames) =>
    dispatch(removeKeyFrameRange(removeFrom, removeTo, channelName, maxFrames)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyAndRemove);
