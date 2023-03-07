import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import drawReducer from "./store/drawSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    draw: drawReducer,
  },
});
