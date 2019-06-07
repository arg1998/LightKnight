import React, { Component } from "react";
import "./CopyAndRemove.css";
import Button from "../GeneralComponents/Button";
import { connect } from "react-redux";
import {
  copyKeyFrames,
  pasteKeyFrames,
  removeKeyFrameRange
} from "../../redux/actions/Channels.actions";

class CopyAndRemove extends Component {
  state = {
    copyFrom: "",
    copyTo: "",
    pasteFrom: "",
    removeFrom: "",
    removeTo: ""
  };

  _handleFocus = () => {
    this.props.onInputFocus(true);
  };

  _handleBlur = () => {
    this.props.onInputFocus(false);
  };

  _handleChange = (value, id) => {
    if (String(value).includes(".")) return;
    value = Number(value);
    if (!Number.isInteger(value)) return;
    if (value < 0) return;
    this.setState({ [id]: value });
  };

  _handleClearInputs = () => {
    this.setState({
      copyFrom: "",
      copyTo: "",
      pasteFrom: "",
      removeFrom: "",
      removeTo: ""
    });
  };

  _removeKeyFrames = () => {
    const { removeFrom, removeTo } = this.state;
    const { selectedChannel, maxFrames, removeKeyFrameRange } = this.props;
    if (selectedChannel === null) {
      console.log("a channel must be selected to remove its keyframes");
      return;
    } else if (
      removeFrom >= removeTo ||
      removeTo > maxFrames ||
      removeTo - removeFrom === 1
    ) {
      console.log("remove range is not valid");
      return;
    } else {
      removeKeyFrameRange(removeFrom, removeTo, selectedChannel, maxFrames);
    }
  };

  _pasteKeyFrames = () => {
    const { pasteFrom } = this.state;
    const { selectedChannel, pasteKeyFrames, maxFrames } = this.props;

    if (pasteFrom === "" || pasteFrom >= maxFrames) {
      console.log("Paste To keyframe must be lower than ", maxFrames);
      return;
    }
    pasteKeyFrames(pasteFrom, selectedChannel, maxFrames);
  };

  _copyKeyframes = () => {
    const { copyFrom, copyTo } = this.state;
    const { selectedChannel, copyKeyFrames } = this.props;

    if (copyFrom >= copyTo) {
      console.log("CopyTo must be greater than CopyFrom");
      return;
    } else if (selectedChannel === null) {
      console.log("A channel must be selected first to copy");
      return;
    }
    copyKeyFrames(copyFrom, copyTo, selectedChannel);
  };

  render() {
    return (
      <div className={"CAR_Container"}>
        <form>
          <label>
            <strong>Copy&nbsp;&nbsp;</strong>
            <i>from </i>
            <input
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              onChange={e => this._handleChange(e.target.value, "copyFrom")}
              value={this.state.copyFrom}
            />
            <i>&nbsp;To&nbsp; </i>
            <input
              onChange={e => this._handleChange(e.target.value, "copyTo")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.state.copyTo}
            />
          </label>

          <label>
            <strong>Paste </strong>
            <i>to &nbsp;&nbsp;&nbsp;&nbsp;</i>
            <input
              onChange={e => this._handleChange(e.target.value, "pasteFrom")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.state.pasteFrom}
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
              onChange={e => this._handleChange(e.target.value, "removeFrom")}
              value={this.state.removeFrom}
            />
            <i>&nbsp;To&nbsp; </i>
            <input
              onChange={e => this._handleChange(e.target.value, "removeTo")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.state.removeTo}
            />
          </label>
        </form>
        <Button value={"Remove"} onClick={this._removeKeyFrames} />
      </div>
    );
  }
}

const mapStateToProps = newState => ({
  fps: newState.app.fps,
  maxFrames: newState.app.maxFrames,
  selectedChannel: newState.app.selectedChannel
});

const mapDispatchToProps = dispatch => ({
  copyKeyFrames: (copyFrom, copyTo, channelName) =>
    dispatch(copyKeyFrames(copyFrom, copyTo, channelName)),
  pasteKeyFrames: (pasteTo, channelName, maxFrames) =>
    dispatch(pasteKeyFrames(pasteTo, channelName, maxFrames)),
  removeKeyFrameRange: (removeFrom, removeTo, channelName, maxFrames) =>
    dispatch(removeKeyFrameRange(removeFrom, removeTo, channelName, maxFrames))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyAndRemove);
