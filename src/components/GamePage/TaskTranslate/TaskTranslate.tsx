import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
//@ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

import styles from "./styles.module.scss";

export const TaskTranslate: React.FC = () => {
  const { currentQuestion } = useAppSelector((state) => state.question);
  const { toggleSound } = useAppSelector((state) => state.sound);
  const { speak } = useSpeechSynthesis();
  return (
    <div
      className={styles.taskTranslate}
      onClick={
        toggleSound
          ? () => speak({ text: currentQuestion?.question, rate: 0.9 })
          : undefined
      }
    >
      {currentQuestion?.question}
    </div>
  );
};
