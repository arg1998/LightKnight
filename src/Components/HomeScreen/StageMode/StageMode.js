import React, { Component } from "react";
import Button from "../../GeneralComponents/Button";
import { connect } from "react-redux";
import { loadProject } from "../../../redux/actions/Channels.actions";
import { exist, readJsonFile, readMusicBlob } from "../../../utils/IO";
const Dialog = require("electron").remote.dialog;
const pathResolver = window.require("path");

export class StageMode extends Component {
  state = {
    projectPath: "/home/arg_1998/LightKnightProjects/saveTest"
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

  _onLoadStage = async () => {
    const { projectPath } = this.state;
    if (projectPath === "") {
      console.log("invalid input, must select a folder");
      return;
    }
    const configFilePath = pathResolver.join(projectPath, "config.json");
    if (!exist(configFilePath)) {
      console.log(
        "cant load config file. did you select the right project folder? "
      );
      return;
    }

    const config = await readJsonFile(projectPath, "config.json");
    const channelsData = await readJsonFile(projectPath, "channelsData.json");
    if (config && channelsData) {
      const { projectName, musicName } = config;
      const musicBlob = await readMusicBlob(projectPath, musicName);
      this.props.loadProject(
        projectName,
        projectPath,
        null,
        musicName,
        musicBlob,
        channelsData,
        "stage"
      );
    } else {
      console.log("Error reading config file");
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
  loadProject: (
    projectName,
    projectPath,
    musicPath,
    musicName,
    musicFile,
    channelsData,
    pageName
  ) =>
    dispatch(
      loadProject(
        projectName,
        projectPath,
        musicPath,
        musicName,
        musicFile,
        channelsData,
        pageName
      )
    )
});

export default connect(
  null,
  mapDispatchToProps
)(StageMode);
