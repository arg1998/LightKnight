import { createStore, combineReducers } from "redux";
import AppReducer from "./reducers/App.reducer";
import channels from "./reducers/Channels.reducer";

const rootReducer = combineReducers({
  app: AppReducer,
  channels: channels
});

const store = createStore(rootReducer);

export default store;
