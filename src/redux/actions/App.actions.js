import * as actionsTypes from "./ActionTypes";

export const zoomTo = level => {
  return {
    type: actionsTypes.ZOOM,
    payload: {
      zoomLevel: level
    }
  };
};

export const play = () => ({
  type: actionsTypes.PLAY
});

export const pause = () => ({
  type: actionsTypes.PAUSE
});

export const setDuration = duration => ({
  type: actionsTypes.SET_DURATION,
  payload: {
    duration
  }
});

export const setCurrentFramePos = position => ({
  type: actionsTypes.SET_CURRENT_FRAME_POSITION,
  payload: {
    position
  }
});

export const moveFramePos = jump => ({
  type: actionsTypes.MOVE_FRAME_POS,
  payload: {
    jump
  }
});

export const selectChannel = channelName => ({
  type: actionsTypes.SELECT_CHANNEL,
  payload: {
    channelName
  }
});

export const changePage = pageName => ({
  type: actionsTypes.CHANGE_PAGE,
  payload: {
    pageName
  }
});

export const createNewProject = (
  projectName,
  projectPath,
  musicPath,
  musicFileBlob
) => ({
  type: actionsTypes.CREATE_NEW_PROJECT,
  payload: {
    projectName,
    projectPath,
    musicPath,
    musicFileBlob
  }
});

export const loadStage = (musicFileBuffer, channelsData) => ({
  type: actionsTypes.LOAD_STAGE,
  payload: {
    musicFileBuffer,
    channelsData
  }
});
