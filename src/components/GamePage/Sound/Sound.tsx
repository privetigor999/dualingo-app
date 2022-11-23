import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { setToggleSound } from "./../../../store/features/soundSlice";

import styles from "./styles.module.scss";
import soundOn from "./../../../assets/images/sound/soundOn.png";
import soundOff from "./../../../assets/images/sound/soundOff.png";

export const Sound: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toggleSound } = useAppSelector((state) => state.sound);

  const clickSoundIcon: React.MouseEventHandler<HTMLDivElement> = (): void => {
    dispatch(setToggleSound(!toggleSound));
  };
  return (
    <div className={styles.soundContainer}>
      <div className={styles.soundBlock} onClick={clickSoundIcon}>
        <img src={toggleSound ? soundOn : soundOff} alt="sound" />
      </div>
    </div>
  );
};
