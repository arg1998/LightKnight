import * as actionTypes from "../actions/ActionTypes";
import clone from "clone";

const initialState = {
  pageName: "home", // home , new_project ,stage
  projectName: null,
  projectPath: null,
  musicPath: null,
  musicFileBlob: null,
  fps: 25, // *** DO NOT TOUCH THIS ***
  zoomLevel: 500,
  play: false,
  duration: 0, // in milliseconds
  currentFramePos: 0,
  maxFrames: 0,
  loading: true,
  selectedChannel: null
};

const AppReducer = (oldState = initialState, action) => {
  let newState;

  switch (action.type) {
    case actionTypes.ZOOM:
      let zoom = 80; // min zoom (there's a problem preventing me to use zoom lower than 80 )
      if (action.payload.zoomLevel === "min") {
        zoom = 80;
      } else if (action.payload.zoomLevel === "max") {
        zoom = 500;
      }
      if (zoom === oldState.zoomLevel) {
        return oldState;
      }
      newState = clone(oldState, false, 1);
      newState.zoomLevel = zoom;

      break;

    case actionTypes.PLAY:
      newState = clone(oldState, false, 1);
      newState.play = true;
      break;

    case actionTypes.PAUSE:
      newState = clone(oldState, false, 1);
      newState.play = false;
      break;

    case actionTypes.SET_DURATION:
      if (oldState.duration !== 0) {
        newState = oldState;
        break;
      }
      newState = clone(oldState, false, 1);
      newState.duration = Math.floor(action.payload.duration * 1000);
      newState.maxFrames =
        Math.floor(newState.duration / (1000 / newState.fps)) - 1;
      newState.loading = false;
      break;
    case actionTypes.SET_CURRENT_FRAME_POSITION:
      if (
        oldState.play ||
        action.payload.position === oldState.currentFramePos
      ) {
        newState = oldState;
        break;
      }
      newState = clone(oldState, false, 1);
      if (action.payload.position > newState.maxFrames) {
        newState.currentFramePos = newState.maxFrames;
      } else {
        newState.currentFramePos = action.payload.position;
      }
      break;

    case actionTypes.MOVE_FRAME_POS:
      let newPos = oldState.currentFramePos + action.payload.jump;
      if (newPos > oldState.maxFrames) newPos = oldState.maxFrames;
      else if (newPos < 0) newPos = 0;
      newState = clone(oldState, false, 1);
      newState.currentFramePos = newPos;
      break;
    case actionTypes.SELECT_CHANNEL:
      if (action.payload.channelName === oldState.selectedChannel) {
        newState = oldState;
        break;
      }
      newState = clone(oldState, false, 1);
      newState.selectedChannel = action.payload.channelName;
      break;

    case actionTypes.CHANGE_PAGE:
      if (action.payload.pageName === oldState.pageName) {
        newState = oldState;
      } else {
        newState = clone(oldState, false, 1);
        newState.pageName = action.payload.pageName;
      }
      break;
    case actionTypes.CREATE_NEW_PROJECT:
      newState = clone(oldState, false, 1);
      newState.projectName = action.payload.projectName;
      newState.projectPath = action.payload.projectPath;
      newState.musicPath = action.payload.musicPath;
      newState.musicFileBlob = action.payload.musicFileBlob;
      newState.pageName = "new_project";
      break;

    case actionTypes.LOAD_PROJECT:
      const {
        projectName,
        projectPath,
        musicPath,
        musicName,
        musicFile
      } = action.payload;
      newState = clone(oldState, false, 1);
      newState.projectName = projectName;
      newState.projectPath = projectPath;
      newState.musicPath = musicPath;
      newState.musicName = musicName;
      newState.musicFileBlob = musicFile;
      newState.pageName = "new_project";
      break;

    case actionTypes.LOAD_STAGE:
      const {musicFileBuffer} = action.payload;
      newState = clone(oldState, false, 1);
      newState.pageName = "stage";
      newState.musicFileBlob = new Blob([new Uint8Array(musicFileBuffer)]);
      break;

    default:
      newState = oldState;
      break;
  }

  return newState;
};

export default AppReducer;
