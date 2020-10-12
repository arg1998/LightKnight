import React, { Component } from "react";

export class LED extends Component {
  led = React.createRef();

  componentDidMount() {
    const { propagateRef, channelName } = this.props;

    if (propagateRef) {
      propagateRef(channelName, this.led.current);
    }
  }

  _handleLedClick = () => {
    const { selectedChannel, selectChannel, channelName } = this.props;
    if (selectedChannel !== channelName) {
      selectChannel(channelName);
    }
  };

  render() {
    const { channelName: chn, selectedChannel } = this.props;
    const isSelected = selectedChannel === chn;

    let LedName = "";
    if (chn.includes("rgb")) {
      LedName = "RGB" + chn.slice(chn.length - 3, chn.length);
    } else if (chn.includes("bin")) {
      LedName = "BIN" + chn.slice(chn.length - 3, chn.length);
    }else if (chn.includes("opa")) {
      LedName = "OPA" + chn.slice(chn.length - 3, chn.length);
    }
    return (
      <>
        <div
          onClick={this._handleLedClick}
          ref={this.led}
          className={["LED", isSelected ? "LED_selected" : null].join(" ")}
        />
        <div className={"LS_LED_INFO"}>
          <p>{LedName}</p>
        </div>
      </>
    );
  }
}

export default LED;
