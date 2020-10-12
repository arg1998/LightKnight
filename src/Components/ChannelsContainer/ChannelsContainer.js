import React, { Component } from "react";
import "./ChannelsContainer.css";
import RgbChannel from "../RgbChannel/RgbChannel";
import BinaryChannel from "../BinaryChannel/BinaryChannel";
import OpacityChannel from '../OpacityChannel/OpacityChannel';

class ChannelsContainer extends Component {
  containerScrollBar = React.createRef();
  state = {
    updateToggle: false
  };

  syncedScroll = false;

  /** *************************** WARNING ********************************
   * #WARNING01
   * THIS FUNCTION WORKS CORRECTLY. BUT BECAUSE OF POOR PERFORMANCE DUE TO
   * EXTREMELY LARGE CHANNEL DATA OBJECT, THIS FUNCTION WILL NOT BE USED
   * UNTIL I'LL FIND A BETTER SOLUTION TO THIS
   */
  // _initializeChannels = (maxFrames, fps, clear) => {
  //   const channel_data = clone(this.channelData, false, 2);
  //   const rgb_c = channel_data.rgbChannels;
  //   const bin_c = channel_data.binaryChannels;
  //   const frame_interval = Math.floor(1000 / fps);

  //   for (
  //     let i = 0;
  //     i <= maxFrames * (frame_interval + 1);
  //     i += frame_interval
  //   ) {
  //     for (const channel of rgb_c) {
  //       let val = channel_data[channel][i];
  //       if (clear) {
  //         channel_data[channel][i] = null;
  //       } else if (val === undefined) {
  //         channel_data[channel][i] = null;
  //       }
  //     }
  //     for (const channel of bin_c) {
  //       let val = channel_data[channel][i];
  //       if (clear) {
  //         channel_data[channel][i] = false;
  //       } else if (val === undefined) {
  //         channel_data[channel][i] = false;
  //       }
  //     }
  //   }
  //   return channel_data;
  // };

  componentDidMount() {
    // const { maxFrames, fps } = this.props;
    this.containerScrollBar.current.visible = false;

    // SEE #WARNING01 FOR MORE INFORMATION
    // this.channelData = this._initializeChannels(maxFrames, fps, false);
    // this.setState(prevState => ({ updateToggle: !prevState.updateToggle }));
  }
  componentDidUpdate() {
    if (!this.syncedScroll) {
      const { waveFormRef } = this.props;
      if (!waveFormRef) return;

      waveFormRef.on("scroll", ({ target }) => {
        this.containerScrollBar.current.scrollLeft = target.scrollLeft;
      });
      this.syncedScroll = true;
    }
  }

  render() {
    const {
      zoomLevel,
      duration,
      fps,
      channelsData,
      selectChannel,
      selectedChannel,
      setCurrentFramePosition,
      currentFramePos
    } = this.props;
    let channels = [];
    
    const keyFrameWidth = zoomLevel / fps;

    for (let bin of channelsData.binaryChannels) {
      channels.push(
        <BinaryChannel
          key={bin}
          zoomLevel={zoomLevel}
          duration={duration}
          fps={fps}
          keyFrameWidth={keyFrameWidth}
          channelName={bin}
          framesData={channelsData[bin]}
          selectChannel={selectChannel}
          isSelected={selectedChannel === bin}
          setCurrentFramePosition={setCurrentFramePosition}
        />
      );
    }

    for (let opa of channelsData.opacityChannels) {
      channels.push(
        <OpacityChannel
          key={opa}
          zoomLevel={zoomLevel}
          duration={duration}
          fps={fps}
          keyFrameWidth={keyFrameWidth}
          channelName={opa}
          framesData={channelsData[opa]}
          selectChannel={selectChannel}
          isSelected={selectedChannel === opa}
          setCurrentFramePosition={setCurrentFramePosition}
        />
      );
    }
    for (let rgb of channelsData.rgbChannels) {
      channels.push(
        <RgbChannel
          key={rgb}
          zoomLevel={zoomLevel}
          duration={duration}
          fps={fps}
          keyFrameWidth={keyFrameWidth}
          channelName={rgb}
          framesData={channelsData[rgb]}
          selectChannel={selectChannel}
          isSelected={selectedChannel === rgb}
          setCurrentFramePosition={setCurrentFramePosition}
        />
      );
    }

    return (
      <div
        ref={this.containerScrollBar}
        className="ChannelsContainer_Container"
      >
        <div
          style={{
            width: zoomLevel * (duration / 1000),
            height: "100%",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: currentFramePos * keyFrameWidth,
              width: keyFrameWidth,
              height: "100%",
              zIndex: 5,
              backgroundColor: "rgba(255,255,255,0.2)"
            }}
          />
          {channels}
        </div>
      </div>
    );
  }
}

export default ChannelsContainer;
