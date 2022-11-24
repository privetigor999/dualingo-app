import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks";
import { getData } from "../../store/features/questionSlice";
import { setStatus } from "../../store/features/questionSlice";
import { setStartGame } from "../../store/features/statusGameSlice";
import styles from "./styles.module.scss";

export const Error: React.FC = () => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.question);

  const clickMenuHandle = () => {
    dispatch(setStatus(""));
    dispatch(setStartGame("choice"));
  };

  return (
    <div className={styles.errorContainer}>
      <h3>{errorMessage}</h3>
      <div className={styles.buttons}>
        <button onClick={() => dispatch(getData())}>try again</button>
        <button onClick={clickMenuHandle}>start menu</button>
      </div>
    </div>
  );
};
