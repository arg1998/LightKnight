import React, { Component } from "react";
import Button from "../../GeneralComponents/Button";
import { connect } from "react-redux";
import { loadStage } from "../../../redux/actions/App.actions";
const Dialog = require("electron").remote.dialog;

export class StageMode extends Component {
  state = {
    projectPath: ""
  };

  _onOpenFolderHandler = () => {
    Dialog.showOpenDialog(
      {
        properties: ["openDirectory"]
      },
      dirs => {
        if (dirs) {
          this.setState({ projectPath: dirs[0] });
        } else {
          this.setState({ projectPath: "" });
        }
      }
    );
  };

  _onLoadStage = () => {
    const { projectPath } = this.state;
    if (projectPath === "") {
      console.log("fill the input first you fuck");
      return;
    }
  };

  render() {
    return (
      <>
        <div className={"NP_Container"}>
          <label>
            {"Project Path : "}
            <input type="text" value={this.state.projectPath} readOnly />
            <button
              className={"Input_Button"}
              onClick={this._onOpenFolderHandler}
            >
              Open Folder
            </button>
          </label>
        </div>
        <Button value={"Load"} onClick={this._onLoadStage} />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadStage: (musicFileBuffer, channelsData) =>
    dispatch(loadStage(musicFileBuffer, channelsData))
});

export default connect(
  null,
  mapDispatchToProps
)(StageMode);
