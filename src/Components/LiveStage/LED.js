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
    const isSelected = this.props.selectedChannel === this.props.channelName;
    return (
      <div
        onClick={this._handleLedClick}
        ref={this.led}
        className={["LED", isSelected ? "LED_selected" : null].join(" ")}
      />
    );
  }
}

export default LED;
