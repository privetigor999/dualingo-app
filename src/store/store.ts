import { configureStore, combineReducers } from "@reduxjs/toolkit";
import statusGameSlice from "./features/statusGameSlice";
import questionSlice from "./features/questionSlice";
import soundSlice from "./features/soundSlice";

const rootReducer = combineReducers({
  start: statusGameSlice,
  question: questionSlice,
  sound: soundSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
