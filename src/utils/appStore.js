import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connect: connectReducer,
    requests: requestReducer,
  },
});

export default appStore;
