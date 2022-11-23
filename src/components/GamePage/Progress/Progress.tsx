import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { setIsShowExitWindow } from "../../../store/features/questionSlice";
import useSound from "use-sound";

import styles from "./styles.module.scss";
import { ReactComponent as CloseSvg } from "./../../../assets/images/close.svg";
import enFlag from "./../../../assets/images/flagIcons/en.png";
import onePng from "./../../../assets/images/levels/one.png";
import twoPng from "./../../../assets/images/levels/two.png";
import threePng from "./../../../assets/images/levels/three.png";
import fourPng from "./../../../assets/images/levels/four.png";
import fivePng from "./../../../assets/images/levels/five.png";
import sixPng from "./../../../assets/images/levels/six.png";
import sevenPng from "./../../../assets/images/levels/seven.png";
import eightPng from "./../../../assets/images/levels/eight.png";
import ninePng from "./../../../assets/images/levels/nine.png";

import clickSound from "./../../../assets/sounds/clickMenu.mp3";

export const Progress: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.start);
  const { experience, level } = useAppSelector((state) => state.question);
  const { toggleSound } = useAppSelector((state) => state.sound);
  const volume = toggleSound ? { volume: 0.6 } : { volume: 0 };
  const [click] = useSound(clickSound, volume);

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

  const clickCloseBtn = () => {
    click();
    dispatch(setIsShowExitWindow(true));
  };

  return (
    <div className={styles.progressBlock}>
      <CloseSvg className={styles.closeBtn} onClick={clickCloseBtn} />
      <div className={styles.progress}>
        <ProgressBar
          completed={experience}
          bgColor="#6db2ff"
          height="10px"
          borderRadius="8px"
          isLabelVisible={false}
          labelColor="#f9f7f7"
          labelSize="8px"
          maxCompleted={100}
        />
        <div className={styles.nameAndLevelBlock}>
          <div className={styles.nameBlock}>
            <p>{name}</p>
            <img src={enFlag} />
          </div>
          <div className={styles.lvlBlock}>
            <p>lvl</p>
            <img src={takeLevelPng()?.img} alt="lvl" />
          </div>
        </div>
      </div>
    </div>
  );
};
