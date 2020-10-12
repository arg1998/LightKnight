import * as actionTypes from "./ActionTypes";

export const placeKeyframe = (channelName, framePos, data) => ({
  type: actionTypes.PLACE_KEYFRAME,
  payload: {
    channelName,
    framePos,
    data,
  },
});

export const removeKeyframe = (channelName, framePos) => ({
  type: actionTypes.REMOVE_KEYFRAME,
  payload: {
    channelName,
    framePos,
  },
});

export const copyKeyFrames = (copyFrom, copyTo, channelName) => ({
  type: actionTypes.COPY_KEYFRAMES,
  payload: {
    copyFrom,
    copyTo,
    channel: channelName,
  },
});

export const pasteKeyFrames = (pasteTo, channelName, maxFrames) => ({
  type: actionTypes.PASTE_FRAMES,
  payload: {
    pasteTo,
    channelName,
    maxFrames,
  },
});

export const removeKeyFrameRange = (
  removeFrom,
  removeTo,
  channelName,
  maxFrames
) => ({
  type: actionTypes.REMOVE_KEYFRAME_RANGE,
  payload: {
    removeFrom,
    removeTo,
    channelName,
    maxFrames,
  },
});

export const placeGradient = (
  placeFrom,
  placeTo,
  colorFrom,
  colorTo,
  channelName,
  maxFrames
) => ({
  type: actionTypes.PLACE_GRADIENT,
  payload: {
    placeFrom,
    placeTo,
    colorFrom,
    colorTo,
    channelName,
    maxFrames,
  },
});

export const loadProject = (
  projectName,
  projectPath,
  musicPath,
  musicName,
  musicFile,
  channelsData,
  pageName = "new_project"
) => ({
  type: actionTypes.LOAD_PROJECT,
  payload: {
    projectName,
    projectPath,
    musicPath,
    musicName,
    musicFile,
    channelsData,
    pageName,
  },
});

export const addRgbChannel = () => ({
  type: actionTypes.ADD_RGB_CHANNEL,
});

export const addBinChannel = () => ({
  type: actionTypes.ADD_BIN_CHANNEL,
});

export const addOpacityChannel = () => ({
  type: actionTypes.ADD_OPACITY_CHANNEL,
});


export const removeSelectedChannel = (channelID) => ({
  type: actionTypes.REMOVE_SELECTED_CHANNEL,
  payload: {
    channelID,
  },
});
