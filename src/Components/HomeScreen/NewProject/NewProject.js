import React, { Component } from "react";
import Button from "../../GeneralComponents/Button";
import { mkdir, copyFile, writeJsonFile } from "../../../utils/IO";
const electron = require("electron");
const Dialog = electron.remote.dialog;
const pathResolver = window.require("path");

export class NewProject extends Component {
  musicFileImporter = React.createRef();

  state = {
    projectName: "",
    projectPath: "",
    musicPath: "",
    musicName: "",
    musicFileBlob: null
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
  _onFileChanged = e => {
    const { files } = e.target;
    if (files.length > 0) {
      const music = files[0];
      this.setState({
        musicFileBlob: music,
        musicPath: music.path,
        musicName: music.name
      });
    } else {
      this.setState({ musicFileBlob: null, musicPath: "", musicName: "" });
    }
  };

  _onChange = (value, type) => {
    this.setState({ [type]: value });
  };

  _onCreateNewProject = async () => {
    const {
      projectName,
      projectPath,
      musicPath,
      musicFileBlob,
      musicName
    } = this.state;

    if (
      projectName === "" ||
      projectPath === "" ||
      musicPath === "" ||
      musicName === "" ||
      musicFileBlob === null
    ) {
      console.log(
        "invalid inputs, must fill Project Name and Project path  and select a music file"
      );
      return;
    }

    const finalProjectPath = pathResolver.join(projectPath, projectName);
    mkdir(finalProjectPath);

    const finalMusicPath = pathResolver.join(finalProjectPath, musicName);
    await copyFile(musicPath, finalMusicPath);

    await writeJsonFile(finalProjectPath, "config.json", {
      projectName,
      musicName
    });

    await writeJsonFile(finalProjectPath, "channelsData.json", {
      clipBoard: {},
      rgbChannels: ["rgb0", "rgb1"],
      binaryChannels: ["bin0", "bin1", "bin2"],
      rgb0: {},
      rgb1: {},
      bin0: {},
      bin1: {},
      bin2: {}
    });
    if (this.props.onCreate) {
      this.props.onCreate(projectName, projectPath, musicPath, musicFileBlob);
    }
  };

  render() {
    return (
      <>
        <div className={"NP_Container"}>
          <div className={"NP_Labels"}>
            <p>Project Name: </p>
            <p>Project Path: </p>
            <p>Music File :</p>
          </div>
          <div className={"NP_Labels"}>
            <input
              type="text"
              value={this.state.projectName}
              onChange={event =>
                this._onChange(event.target.value, "projectName")
              }
            />
            <div>
              <input type="text" value={this.state.projectPath} readOnly />
              <button
                className={"Input_Button"}
                onClick={this._onOpenFolderHandler}
              >
                Open Folder
              </button>
            </div>
            <input
              className={"Input_Button"}
              type="file"
              id="file"
              ref={this.musicFileImporter}
              onChange={this._onFileChanged}
              accept=".mp3"
            />
          </div>
        </div>
        <Button
          value={"Create New Project"}
          onClick={this._onCreateNewProject}
        />
      </>
    );
  }
}

export default NewProject;
