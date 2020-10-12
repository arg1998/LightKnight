import React, { Component } from "react";
import "./LiveStage.css";
import LED from "./LED";
import Draggable from "react-draggable";
import tinyColor from "tinycolor2";
import { toAlpha } from "../../utils/OpacityToAlphaScalar";

export class LiveStage extends Component {
  LedColors = {};
  isAudioProcessSynced = false;
  lastProgress = -1; // holds the last progressed audio time in millisecond
  opacityBaseColor = tinyColor("#FFF");

  componentDidUpdate(prevProps, prevState) {
    if (!this.isAudioProcessSynced) {
      const { waveFormRef } = this.props;
      if (!waveFormRef) return;
      waveFormRef.on("audioprocess", this._handleAudioProgress);
      this.isAudioProcessSynced = true;
    }
  }

  _handleAudioProgress = (p) => {
    // const msp = Math.floor(p * 1000); // MilliSecondProgress
    const corrected = this._roundTo40(p * 1000);
    if (corrected !== this.lastProgress) {
      this.lastProgress = corrected;
      for (const ch in this.LedColors) {
        let color = this.props.channelsData[ch][corrected];
        if (color) {
          if (ch.startsWith("bin")) {
            //binary
            this.LedColors[ch].backgroundColor = "#FFF";
          } else if (ch.startsWith("opa")) {
            //opacity
            this.LedColors[ch].backgroundColor = this.opacityBaseColor
              .setAlpha(toAlpha(color))
              .toHex8String();
          } else {
            //rgb
            this.LedColors[ch].backgroundColor = color;
          }
        } else {
          this.LedColors[ch].backgroundColor = "#2b2e30";
        }
      }
    }
  };

  _roundTo40 = (num) => Math.ceil(num / 40) * 40;

  _handleReceiveLedRefs = (channelName, ref) => {
    this.LedColors[channelName] = ref.style;
  };

  render() {
    const { channelsData, selectChannel, selectedChannel } = this.props;
    const rgb_channels = channelsData.rgbChannels.map((ch) => (
      <Draggable grid={[64, 64]} key={ch} bounds={".LS_LED_container"}>
        <div className={"DRAG_BOX"}>
          <LED
            selectedChannel={selectedChannel}
            selectChannel={selectChannel}
            channelName={ch}
            propagateRef={this._handleReceiveLedRefs}
          />
        </div>
      </Draggable>
    ));

    const opa_channels = channelsData.opacityChannels.map((ch) => (
      <Draggable grid={[64, 64]} key={ch} bounds={".LS_LED_container"}>
        <div className={"DRAG_BOX"}>
          <LED
            selectedChannel={selectedChannel}
            selectChannel={selectChannel}
            channelName={ch}
            propagateRef={this._handleReceiveLedRefs}
          />
        </div>
      </Draggable>
    ));

    const bin_channels = channelsData.binaryChannels.map((ch) => (
      <Draggable grid={[64, 64]} key={ch} bounds={".LS_LED_container"}>
        <div className={"DRAG_BOX"}>
          <LED
            selectedChannel={selectedChannel}
            selectChannel={selectChannel}
            channelName={ch}
            propagateRef={this._handleReceiveLedRefs}
          />
        </div>
      </Draggable>
    ));

    return (
      <div className={"LS_container"}>
        <div className={"LS_LED_container"}>
          {[...rgb_channels, ...bin_channels, ...opa_channels]}
        </div>
      </div>
    );
  }
}

export default LiveStage;
