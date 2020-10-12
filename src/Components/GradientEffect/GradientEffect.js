import React, { Component } from "react";
import "./GradientEffect.css";
import Button from "../GeneralComponents/Button";
import IconButton from "../GeneralComponents/IconButton";
import { placeGradient } from "../../redux/actions/Channels.actions";
import { connect } from "react-redux";
import tinyColor from "tinycolor2";
import interChangeIcon from "./interchange.png";
import beginicon from "./begin.png";
import endIcon from "./end.png";

class GradientEffect extends Component {
  state = {
    fromColor: "",
    toColor: "",
    isCtrlPressed: false,
  };

  selectionRange = {
    beginPose: 0,
    endPose: 0,
  };

  componentDidMount() {
    document.addEventListener("keydown", this._ctrlPressEventHandler);
    document.addEventListener("keyup", this._ctrlReleaseEventHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this._ctrlPressEventHandler);
    document.removeEventListener("keyup", this._ctrlReleaseEventHandler);
  }

  _ctrlPressEventHandler = (e) => {
    if (e.keyCode === 17 && !this.state.isCtrlPressed) {
      this.setState({ isCtrlPressed: true });
    }
  };
  _ctrlReleaseEventHandler = (e) => {
    if (e.keyCode === 17) {
      this.setState({ isCtrlPressed: false });
    }
  };

  _interchangePositionHandler = () => {
    const from = this.state.fromColor;
    const to = this.state.toColor;
    this.setState({ fromColor: to, toColor: from });
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

  _placeGradient = () => {
    const { fromColor, toColor } = this.state;
    const { selectedChannel, maxFrames, placeGradient } = this.props;
    const { beginPose, endPose } = this.selectionRange;

    if (selectedChannel === null) {
      console.log("a channel must be selected to place gradient");
    } else if (selectedChannel.startsWith("rgb")) {
      if (!tinyColor(fromColor).isValid() || !tinyColor(toColor).isValid()) {
        console.log("color input is invalid");
      } else if (
        beginPose >= endPose ||
        endPose > maxFrames ||
        endPose - beginPose === 1
      ) {
        console.log("invalid input frame position");
      } else {
        placeGradient(
          beginPose,
          endPose,
          fromColor,
          toColor,
          selectedChannel,
          maxFrames
        );
      }
    } else if (selectedChannel.startsWith("opa")) {
      let from = 0;
      let to = 0;
      try {
        from = Number.parseInt(fromColor);
        to = Number.parseInt(toColor);
        if (from < 0 || to > 255) {
          console.log(
            "for opacity channel, gradient range must be between 0 and 255 (inclusive)"
          );
        } else {
          placeGradient(
            beginPose,
            endPose,
            from,
            to,
            selectedChannel,
            maxFrames
          );
        }
      } catch (error) {
        console.log("error parsing fromColor or toColor.");
        return;
      }
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

  // _handleFrameChange = (value, id) => {
  //   if (String(value).includes(".")) return;
  //   value = Number(value);
  //   if (!Number.isInteger(value)) return;
  //   if (value < 0) return;
  //   this.setState({ [id]: value });
  // };

  _handleClearInputs = () => {
    this.setState({
      fromColor: "",
      toColor: "",
    });
    this.selectionRange.beginPose = 0;
    this.selectionRange.endPose = 0;
  };

  _btnSampleColorBegin = () => {
    if (this.props.currentColor) {
      this.setState({ fromColor: this.props.currentColor });
    }
  };

  _btnSampleColorEnd = () => {
    if (this.props.currentColor) {
      this.setState({ toColor: this.props.currentColor });
    }
  };

  render() {
    const { currentPos } = this.props;
    this.calculateSelectionRange(currentPos);

    return (
      <div className={"GE_Container"}>
        <form>
          <label>
            <strong>Color&nbsp;&nbsp;</strong>
            <i>from &nbsp;&nbsp;</i>
            <input
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              onChange={(e) =>
                this._handleColorChange(e.target.value, "fromColor")
              }
              value={this.state.fromColor}
            />

            <i>&nbsp;To&nbsp;&nbsp;&nbsp; </i>
            <input
              onChange={(e) =>
                this._handleColorChange(e.target.value, "toColor")
              }
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.state.toColor}
            />
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div style={{ flex: 5 }} />
            <IconButton
              icon={beginicon}
              rounded={true}
              iconSize={48}
              iconRatio={70}
              onClick={this._btnSampleColorBegin}
            />
            <IconButton
              icon={interChangeIcon}
              rounded={true}
              iconSize={36}
              iconRatio={80}
              onClick={this._interchangePositionHandler}
            />
            <IconButton
              icon={endIcon}
              rounded={true}
              iconSize={48}
              iconRatio={70}
              onClick={this._btnSampleColorEnd}
            />
            <div style={{ flex: 1 }} />
          </div>
          <label>
            <strong>Place </strong>
            <i> from &nbsp;&nbsp;&nbsp; </i>
            <input
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.selectionRange.beginPose}
              readOnly={true}
            />
            <i>&nbsp;To&nbsp;&nbsp;&nbsp; </i>
            <input
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              value={this.selectionRange.endPose}
              readOnly={true}
            />
          </label>
        </form>

        <Button value={"Clear"} onClick={this._handleClearInputs} />
        <Button value={"Place Gradient"} onClick={this._placeGradient} />
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
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(GradientEffect);
