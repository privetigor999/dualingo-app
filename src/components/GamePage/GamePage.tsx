import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getData } from "../../store/features/questionSlice";
import { Board } from "./Board/Board";
import { Description } from "./Description/Description";
import { Progress } from "./Progress/Progress";
import { Win } from "./Win/Win";
import { Sound } from "./Sound/Sound";

import styles from "./styles.module.scss";
import { TaskTranslate } from "./TaskTranslate/TaskTranslate";
import { Finish } from "./Finish/Finish";
import { ExitWindow } from "./ExitWindow/ExitWindow";

export const GamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCorrect, isFinished, isShowExitWindow } = useAppSelector(
    (state) => state.question
  );

  React.useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <div className={styles.gamePage}>
      <Progress />
      <Description />
      <TaskTranslate />
      {!isFinished && <Board />}
      {isFinished && <Finish />}
      {isCorrect && <Win />}
      {isShowExitWindow && <ExitWindow />}
    </div>
  );
};
