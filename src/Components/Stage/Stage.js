import React, { Component } from "react";
import { connect } from "react-redux";
// import serialPort from "serialport";
const { ipcRenderer } = require("electron");
// const serialPort = require("serialport");

export class Stage extends Component {
  state = {
    port: null,
    r: 0,
    b: 0,
    g: 0
  };

  _handleChange = (value, id) => {
    this.setState({ [id]: Number(value) });
  };
  componentDidMount() {
    ipcRenderer.on("fetch_serial_port", (e, port) => {
      if (port !== null) {
        this.setState({ port });
      }
    });

    ipcRenderer.send("request_serial_port", {});
  }
  render() {
    if (this.state.port !== null) {
      console.log(this.state.port);

      this.state.port.write(
        Buffer.from([this.state.r, this.state.g, this.state.b])
      );
    }
    console.log("wrote: ", this.state);

    return (
      <div>
        <input
          type="range"
          min="0"
          max="255"
          value={this.state.r}
          onChange={e => this._handleChange(e.target.value, "r")}
        />
        <input
          type="range"
          min="0"
          max="255"
          value={this.state.g}
          onChange={e => this._handleChange(e.target.value, "g")}
        />
        <input
          type="range"
          min="0"
          max="255"
          value={this.state.b}
          onChange={e => this._handleChange(e.target.value, "b")}
        />
      </div>
    );
  }
}

const mapStateToProps = newState => ({
  musicFileBlob: newState.app.musicFileBlob,
  channelsData: newState.channels
});

export default connect(
  mapStateToProps,
  null
)(Stage);
