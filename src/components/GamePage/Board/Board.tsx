import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  updateCurentQuestion,
  checkIsCorrect,
} from "../../../store/features/questionSlice";
import useSound from "use-sound";

import styles from "./styles.module.scss";
import clickSound from "./../../../assets/sounds/click.mp3";
import cancelSound from "./../../../assets/sounds/cancel.mp3";
import wrongAnswerSound from "./../../../assets/sounds/wrong-answer.mp3";

import { ICurrentQuestion, IWords } from "./../../../types/question";
import { Sound } from "../Sound/Sound";

export const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toggleSound } = useAppSelector((state) => state.sound);
  const volume = { volume: Number(toggleSound ? 0.3 : 0) };
  const [playDataWord] = useSound(clickSound, volume);
  const [playPlayerWord] = useSound(cancelSound, volume);
  const [playWrongAnswer] = useSound(wrongAnswerSound, volume);

  const { currentQuestion, isCorrect, countError } = useAppSelector(
    (state) => state.question
  );

  const [playerBoard, setPlayerBoard] = React.useState<ICurrentQuestion[]>([]);

  const clickWordDataHandle = (id: ICurrentQuestion["id"]) => {
    dispatch(updateCurentQuestion(id));
    if (currentQuestion.words.length - 1 !== playerBoard.length) {
      playDataWord();
    }
    const findedWordIndex = currentQuestion?.words
      .map((word: { id: ICurrentQuestion["id"] }) => word.id)
      .indexOf(id);

    const sliced: ICurrentQuestion[] = currentQuestion?.words.slice(
      findedWordIndex,
      findedWordIndex! + 1
    );

    setPlayerBoard([...playerBoard, ...sliced]);
  };

  const clickWordTableHandle = (id: ICurrentQuestion["id"]) => {
    playPlayerWord();

    dispatch(updateCurentQuestion(id));

    setPlayerBoard(playerBoard.filter((w) => w.id !== id));
  };

  React.useEffect(() => {
    if (playerBoard.length > 0) {
      dispatch(checkIsCorrect(playerBoard.map((w) => w.id)));
    }
  }, [playerBoard]);

  React.useEffect(() => {
    setPlayerBoard([]);
  }, [isCorrect]);

  React.useEffect(() => {
    if (countError > 0) {
      playWrongAnswer();
    }
  }, [countError]);
  return (
    <div className={styles.board}>
      <div className={styles.playerBoard}>
        <ul>
          {playerBoard?.map((word: any) => (
            <li key={word.id} onClick={() => clickWordTableHandle(word.id)}>
              {word.word}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.dataBoard}>
        <ul>
          {currentQuestion?.words.map((word: IWords) => (
            <li
              className={
                word.isPicked ? styles.pickedItemList : styles.itemList
              }
              key={word.id}
              onClick={() => clickWordDataHandle(word.id)}
            >
              {word.word}
            </li>
          ))}
        </ul>
      </div>
      <Sound />
    </div>
  );
};
