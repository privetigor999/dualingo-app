import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IQuestions } from "../../types/question";

export const getData = createAsyncThunk(
  "question/getData",
  async (_, { dispatch }) => {
    // const rootState = getState() as RootState;
    // const currentQ = rootState.question.currentQuestion;
    try {
      dispatch(setErrorMessage(""));
      dispatch(setStatus("loading"));
      const response = await axios.get(
        "https://637b40d110a6f23f7fa3655a.mockapi.io/dualingo"
      );
      const data = await response.data[0];
      const questions = await data.questions;
      dispatch(setData(questions));
      dispatch(setStatus("fulfilled"));
    } catch (e) {
      const error = e as AxiosError;
      dispatch(setData([]));
      dispatch(setErrorMessage(error.message));
      dispatch(setStatus("error"));
    }
  }
);

const initialState: IQuestions = {
  data: [],
  currentIndexQuestion: 0,
  currentQuestion: null,
  status: "",
  errorMessage: "",
  isCorrect: false,
  isFinished: false,
  isShowExitWindow: false,
  level: 1,
  experience: 0,
  countError: 0,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      state.currentQuestion = action.payload[state.currentIndexQuestion];
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    updateCurentQuestion(state, action) {
      const filtered = state.currentQuestion.words.find(
        (word: { id: number }) => word.id === action.payload
      );
      filtered.isPicked = !filtered.isPicked;
    },
    checkIsCorrect(state, action) {
      if (Array.isArray(action.payload)) {
        if (
          state.currentQuestion.correctAnswer.every(
            (val: any, i: number) => val === action.payload[i]
          )
        ) {
          state.isCorrect = true;
          state.currentIndexQuestion = state.currentIndexQuestion + 1;
          state.currentQuestion = state.data[state.currentIndexQuestion];
          if (state.currentIndexQuestion === 10) {
            state.isFinished = true;
          }
        }
        if (
          !state.isCorrect &&
          state.currentQuestion.correctAnswer.length === action.payload.length
        ) {
          state.countError += 1;
        }
      }

      if (typeof action.payload === "boolean") {
        state.isCorrect = false;
      }
    },
    updateExperience(state) {
      switch (state.level) {
        case 1:
          state.experience += 40;
          break;
        case 2:
          state.experience += 35;
          break;
        case 3:
          state.experience += 30;
          break;
        case 4:
          state.experience += 25;
          break;
        case 5:
          state.experience += 20;
          break;
        case 6:
          state.experience += 18;
          break;
        case 7:
          state.experience += 15;
          break;
        case 8:
          state.experience += 10;
          break;
        case 9:
          state.experience += 10;
          break;
      }
      if (state.experience >= 100 && state.level !== 9) {
        state.level += 1;
        state.experience -= 100;
      }
      if (state.experience >= 100 && state.level === 9) {
        state.experience = 100;
      }
    },
    setIsShowExitWindow(state, action) {
      state.isShowExitWindow = action.payload;
    },
  },
});

export const {
  setData,
  setStatus,
  setErrorMessage,
  updateCurentQuestion,
  checkIsCorrect,
  updateExperience,
  setIsShowExitWindow,
} = questionSlice.actions;
export default questionSlice.reducer;
