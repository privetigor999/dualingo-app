import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setStartGame } from "../../store/features/statusGameSlice";
import useSound from "use-sound";
import styles from "./styles.module.scss";
import clickSound from "./../../assets/sounds/clickMenu.mp3";

export const WelcomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toggleSound } = useAppSelector((state) => state.sound);
  const volume = toggleSound ? { volume: 0.6 } : { volume: 0 };

  const [click] = useSound(clickSound, volume);

  const clickStartBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
    dispatch(setStartGame("choice"));
  };
  return (
    <div className={styles.welcomePage}>
      <div>
        <h6>dualingo</h6>
        <h6>with Rilakkuma</h6>
      </div>

      <p>free language education for the world</p>
      <button onClick={clickStartBtn}>GET STARTED</button>
    </div>
  );
};
