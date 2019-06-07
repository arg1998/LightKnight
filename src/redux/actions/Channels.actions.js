import * as actionTypes from "./ActionTypes";

export const placeKeyframe = (channelName, framePos, data) => ({
  type: actionTypes.PLACE_KEYFRAME,
  payload: {
    channelName,
    framePos,
    data
  }
});

export const removeKeyframe = (channelName, framePos) => ({
  type: actionTypes.REMOVE_KEYFRAME,
  payload: {
    channelName,
    framePos
  }
});

export const copyKeyFrames = (copyFrom, copyTo, channelName) => ({
  type: actionTypes.COPY_KEYFRAMES,
  payload: {
    copyFrom,
    copyTo,
    channel: channelName
  }
});

export const pasteKeyFrames = (pasteTo, channelName, maxFrames) => ({
  type: actionTypes.PASTE_FRAMES,
  payload: {
    pasteTo,
    channelName,
    maxFrames
  }
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
    maxFrames
  }
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
    maxFrames
  }
});

export const loadProject = (
  projectName,
  projectPath,
  musicPath,
  musicName,
  musicFile,
  channelsData
) => ({
  type: actionTypes.LOAD_PROJECT,
  payload: {
    projectName,
    projectPath,
    musicPath,
    musicName,
    musicFile,
    channelsData
  }
});
