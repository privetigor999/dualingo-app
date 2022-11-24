import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
//@ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

import styles from "./styles.module.scss";

export const Description = () => {
  const { currentQuestion } = useAppSelector((state) => state.question);
  const { toggleSound } = useAppSelector((state) => state.sound);
  const { speak } = useSpeechSynthesis();

  React.useEffect(() => {}, [currentQuestion]);
  return (
    <div className={styles.description}>
      <img src={currentQuestion?.image} />
      <div
        onClick={
          toggleSound
            ? () =>
                speak({
                  text: currentQuestion?.description,
                  rate: 0.9,
                })
            : undefined
        }
      >
        {currentQuestion?.description}
      </div>
    </div>
  );
};
