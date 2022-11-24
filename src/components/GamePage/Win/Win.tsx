import React from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  checkIsCorrect,
  updateExperience,
} from "../../../store/features/questionSlice";
import useSound from "use-sound";

import styles from "./styles.module.scss";
import ruFlag from "./../../../assets/images/flagIcons/ru.png";
import enFlag from "./../../../assets/images/flagIcons/en.png";
import lvlPng from "./../../../assets/images/level.png";
import onePng from "./../../../assets/images/levels/one.png";
import twoPng from "./../../../assets/images/levels/two.png";
import threePng from "./../../../assets/images/levels/three.png";
import fourPng from "./../../../assets/images/levels/four.png";
import fivePng from "./../../../assets/images/levels/five.png";
import sixPng from "./../../../assets/images/levels/six.png";
import sevenPng from "./../../../assets/images/levels/seven.png";
import eightPng from "./../../../assets/images/levels/eight.png";
import ninePng from "./../../../assets/images/levels/nine.png";
import levelUpPng from "./../../../assets/images/level-up.png";

import lvlCompletedSound from "./../../../assets/sounds/level-completed.mp3";
import clickMenuUrl from "./../../../assets/sounds/clickMenu.mp3";

export const Win = () => {
  const dispatch = useAppDispatch();
  const { experience, level, data, currentIndexQuestion } = useAppSelector(
    (state) => state.question
  );
  const { toggleSound } = useAppSelector((state) => state.sound);
  const volume = { volume: Number(toggleSound ? 0.2 : 0) };
  const [play] = useSound(lvlCompletedSound, volume);
  play();
  const [click] = useSound(clickMenuUrl, volume);
  const [levelImg, setLevelImg] = React.useState(false);

  const levels = [
    { level: 1, img: onePng },
    { level: 2, img: twoPng },
    { level: 3, img: threePng },
    { level: 4, img: fourPng },
    { level: 5, img: fivePng },
    { level: 6, img: sixPng },
    { level: 7, img: sevenPng },
    { level: 8, img: eightPng },
    { level: 9, img: ninePng },
  ];

  const takeLevelPng = () => {
    return levels.find((obj) => obj.level === level);
  };

  const clickNextBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
    dispatch(checkIsCorrect(false));
  };

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(updateExperience());
    }, 0);
  }, []);

  React.useEffect(() => {
    setLevelImg((prev) => !prev);
  }, [level]);

  return (
    <>
      <div className={styles.win} />
      <div className={styles.container}>
        <div className={styles.taskBlock}>
          <div className={styles.task}>
            <img src={ruFlag} alt="ru" />
            <p>{data[currentIndexQuestion - 1].question}</p>
          </div>
          <div className={styles.task}>
            <img src={enFlag} alt="flag" />
            <p>{data[currentIndexQuestion - 1].answer}</p>
          </div>
        </div>
        <div className={styles.progress}>
          <ProgressBar
            completed={experience}
            bgColor="#6db2ff"
            height="10px"
            borderRadius="8px"
            isLabelVisible={true}
            labelColor="#f9f7f7"
            labelSize="8px"
            maxCompleted={100}
          />
          <div className={styles.lvl}>
            <img
              src={levelImg ? lvlPng : levelUpPng}
              alt="lvl"
              className={levelImg ? styles.lvlImg : styles.lvlUp}
            />
            <img src={takeLevelPng()?.img} alt="num" />
          </div>
        </div>
        <button onClick={clickNextBtn}>CONTINUE</button>
      </div>
    </>
  );
};
