import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

const initialState = {
  status: "welcome",
  name: "nick",
  lang: null,
};

const startSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStartGame(state, action) {
      state.status = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setLanguage(state, action) {
      state.lang = action.payload;
    },
  },
});

export const { setStartGame, setName, setLanguage } = startSlice.actions;
export default startSlice.reducer;
