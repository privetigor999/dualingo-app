import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISound } from "./../../types/sound";

const initialState: ISound = {
  toggleSound: true,
};

const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    setToggleSound(state, action: PayloadAction<boolean>) {
      if (typeof action.payload !== "boolean") {
        state.toggleSound = !state.toggleSound;
      } else {
        state.toggleSound = action.payload;
      }
    },
  },
});

export const { setToggleSound } = soundSlice.actions;
export default soundSlice.reducer;
