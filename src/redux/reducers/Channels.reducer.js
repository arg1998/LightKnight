import * as actionTypes from "../actions/ActionTypes";
import clone from "clone";
import tinyColor from "tinycolor2";
import tinyGradient from "tinygradient";

const initialState = {
  clipBoard: {},
  rgbChannels: ["rgb0", "rgb1"],
  binaryChannels: ["bin0", "bin1", "bin2"],
  rgb0: {},
  rgb1: {},
  bin0: {},
  bin1: {},
  bin2: {}
};

const _placeGradients = (state, data) => {
  const {
    placeFrom,
    placeTo,
    colorFrom,
    colorTo,
    channelName,
    maxFrames
  } = data;

  let gradient = tinyGradient(colorFrom, colorTo)
    .rgb(placeTo - placeFrom + 1)
    .map(val => val.toHexString());

  const newState = clone(state, false, 2);

  for (let i = placeFrom, colorIndex = 0; i <= placeTo; i++, colorIndex++) {
    if (i > maxFrames) {
      break;
    } else {
      newState[channelName][i * 40] = gradient[colorIndex];
    }
  }

  return newState;
};

const _remove = (state, data) => {
  const { removeFrom, removeTo, channelName, maxFrames } = data;
  const newState = clone(state, false, 2);
  for (let i = removeFrom; i <= removeTo; i++) {
    if (i > maxFrames) {
      break;
    }
    const ri = i * 40;
    delete newState[channelName][ri];
  }
  return newState;
};

const _paste = (state, data) => {
  const { clipBoard, rgbChannels, binaryChannels } = state;
  const { pasteTo, channelName, maxFrames } = data;

  const copyChannel = Object.keys(clipBoard)[0];

  if (
    (copyChannel.startsWith("rgb") && !channelName.startsWith("rgb")) ||
    (copyChannel.startsWith("bin") && !channelName.startsWith("bin"))
  ) {
    console.log(
      "Can not paste a RGB channel into a BINARY channel and vice versa"
    );
    return state;
  } else {
    const ch = Object.keys(clipBoard[copyChannel]);

    if (ch.length <= 1) {
      console.log("at least 2 frames must be copied first, clipboard is empty");
      return state;
    }
    const first_copy_frame_pos = ch[0] / 40;
    const last_copy_frame_pos = ch[ch.length - 1] / 40;

    let paste_index = pasteTo;
    const newState = clone(state, false, 2);
    for (let i = first_copy_frame_pos; i <= last_copy_frame_pos; i++) {
      if (paste_index > maxFrames) {
        break;
      }
      const ci = i * 40;
      const pi = paste_index * 40;

      if (
        clipBoard[copyChannel][ci] === undefined ||
        clipBoard[copyChannel][ci] === null ||
        clipBoard[copyChannel][ci] === false
      ) {
        delete newState[channelName][pi];
      } else {
        newState[channelName][pi] = clipBoard[copyChannel][ci];
      }
      paste_index++;
    }

    return newState;
  }
};

const ChannelsReducer = (oldState = initialState, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.PLACE_KEYFRAME:
      const { channelName, framePos, data } = action.payload;
      if (data === null || data === undefined || channelName === null) {
        newState = oldState;
        break;
      } else if (oldState[channelName][framePos * 40] === data) {
        newState = oldState;
      } else {
        newState = clone(oldState, false, 2);
        newState[channelName][framePos * 40] = data;
      }
      break;

    case actionTypes.REMOVE_KEYFRAME:
      newState = clone(oldState, false, 2);
      delete newState[action.payload.channelName][action.payload.framePos * 40];
      break;

    case actionTypes.COPY_KEYFRAMES:
      let { copyFrom, copyTo, channel } = action.payload;

      let temp_clip_board = { [channel]: {} };

      for (let i = copyFrom; i <= copyTo; i++) {
        const pos = i * 40;
        if (
          oldState[channel][pos] === undefined ||
          oldState[channel][pos] === null
        ) {
          continue;
        } else {
          temp_clip_board[channel][pos] = oldState[channel][pos];
        }
      }
      newState = oldState;
      newState.clipBoard = clone(temp_clip_board, false, 2);
      break;

    case actionTypes.PASTE_FRAMES:
      if (oldState.clipBoard === null) break;
      newState = _paste(oldState, action.payload);
      break;
    case actionTypes.REMOVE_KEYFRAME_RANGE:
      newState = _remove(oldState, action.payload);
      break;
    case actionTypes.PLACE_GRADIENT:
      newState = _placeGradients(oldState, action.payload);
      break;

    case actionTypes.LOAD_PROJECT:
      const { channelsData } = action.payload;
      newState = clone(channelsData, false, 2);
      break;

    case actionTypes.LOAD_STAGE:
      const { channelsData: chData } = action.payload;
      newState = chData;
      break;

    default:
      newState = oldState;
      break;
  }

  return newState;
};

export default ChannelsReducer;
