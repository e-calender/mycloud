import { configureStore } from "@reduxjs/toolkit";
import { typingSlice } from "./typingSlice";

const store = configureStore({
  reducer: { typing: typingSlice.reducer },
});

export default store;
