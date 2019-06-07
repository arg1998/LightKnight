import React, { Component } from "react";
import "./GradientEffect.css";
import Button from "../GeneralComponents/Button";
import { placeGradient } from "../../redux/actions/Channels.actions";
import { connect } from "react-redux";
import tinyColor from "tinycolor2";

export class GradientEffect extends Component {
  state = {
    fromColor: "",
    toColor: "",
    fromFrame: "",
    toFrame: ""
  };

  _placeGradient = () => {
    const { fromColor, toColor, fromFrame, toFrame } = this.state;
    const { selectedChannel, maxFrames, placeGradient } = this.props;

    if (selectedChannel === null || selectedChannel.startsWith("bin")) {
      console.log("a RGB channel must be selected to place gradient");
      return;
    } else if (
      !tinyColor(fromColor).isValid() ||
      !tinyColor(toColor).isValid()
    ) {
      console.log("color input is invalid");
      return;
    } else if (
      fromFrame >= toFrame ||
      toFrame > maxFrames ||
      toFrame - fromFrame === 1
    ) {
      console.log("invalid input frame position");
      return;
    } else {
      placeGradient(
        fromFrame,
        toFrame,
        fromColor,
        toColor,
        selectedChannel,
        maxFrames
      );
    }
  };

  _handleFocus = () => {
    this.props.onInputFocus(true);
  };

  _handleBlur = () => {
    this.props.onInputFocus(false);
  };

  _handleColorChange = (value, id) => {
    if (String(value).includes(".")) return;
    this.setState({ [id]: value });
  };

  _handleFrameChange = (value, id) => {
    if (String(value).includes(".")) return;
    value = Number(value);
    if (!Number.isInteger(value)) return;
    if (value < 0) return;
    this.setState({ [id]: value });
  };

  _handleClearInputs = () => {
    this.setState({
      fromColor: "",
      toColor: "",
      fromFrame: "",
      toFrame: ""
    });
  };

  render() {
    return (
      <div className={"GE_Container"}>
        <form>
          <label>
            <strong>Color&nbsp;&nbsp;</strong>
            <i>from &nbsp;&nbsp;</i>
            <input
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              onChange={e =>
                this._handleColorChange(e.target.value, "fromColor")
              }
              value={this.state.fromColor}
            />
            <i>&nbsp;To&nbsp;&nbsp;&nbsp; </i>
            <input
              onChange={e => this._handleColorChange(e.target.value, "toColor")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.state.toColor}
            />
          </label>
          <label>
            <strong>Place </strong>
            <i> from &nbsp;&nbsp;&nbsp; </i>
            <input
              onChange={e =>
                this._handleFrameChange(e.target.value, "fromFrame")
              }
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.state.fromFrame}
            />
            <i>&nbsp;To&nbsp;&nbsp;&nbsp; </i>
            <input
              onChange={e => this._handleFrameChange(e.target.value, "toFrame")}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.state.toFrame}
            />
          </label>
        </form>
        <Button value={"Clear"} onClick={this._handleClearInputs} />
        <Button value={"Place Gradient"} onClick={this._placeGradient} />
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
  placeGradient: (
    fromFrame,
    toFrame,
    fromColor,
    toColor,
    channelName,
    maxFrames
  ) =>
    dispatch(
      placeGradient(
        fromFrame,
        toFrame,
        fromColor,
        toColor,
        channelName,
        maxFrames
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientEffect);
