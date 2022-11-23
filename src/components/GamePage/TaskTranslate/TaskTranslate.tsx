import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";

import styles from "./styles.module.scss";

export const TaskTranslate = () => {
  const { currentQuestion } = useAppSelector((state) => state.question);

  return (
    <div className={styles.taskTranslate}>{currentQuestion?.question}</div>
  );
};
