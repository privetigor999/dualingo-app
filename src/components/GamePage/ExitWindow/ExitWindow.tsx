import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { setIsShowExitWindow } from "../../../store/features/questionSlice";
import { setStartGame } from "../../../store/features/statusGameSlice";
import useSound from "use-sound";

import styles from "./styles.module.scss";
import exitPng from "./../../../assets/images/exitWindow.png";
import hoverSound from "./../../../assets/sounds/hover.mp3";
import clickSound from "./../../../assets/sounds/clickMenu.mp3";

export const ExitWindow: React.FC = () => {
  const { toggleSound } = useAppSelector((state) => state.sound);

  const volume = toggleSound ? { volume: 0.6 } : { volume: 0 };
  const dispatch = useAppDispatch();
  const [play] = useSound(hoverSound, volume);
  const [click] = useSound(clickSound, volume);
  const clickNoneBtn = () => {
    click();
    dispatch(setIsShowExitWindow(false));
  };

  const clickYesBtn = () => {
    click();
    dispatch(setIsShowExitWindow(false));
    dispatch(setStartGame("choice"));
  };

  return (
    <>
      <div className={styles.exitWindow} />
      <div className={styles.exitContainer}>
        <div className={styles.alertQuestion}>
          <h3>Вы действительно хотите выйти?</h3>
          <p>Весь ваш прогресс сохранится</p>
        </div>

        <div className={styles.buttons}>
          <button onClick={clickYesBtn} onMouseEnter={() => play()}>
            да
          </button>
          <button onClick={clickNoneBtn} onMouseEnter={() => play()}>
            нет
          </button>
        </div>
        <img src={exitPng} alt="exit" className={styles.exitPng} />
      </div>
    </>
  );
};
