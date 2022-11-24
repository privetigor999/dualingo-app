import React from "react";
import useSound from "use-sound";
import { ReactComponent as CloudSvg } from "../../assets/images/cloud.svg";
import { useAppSelector } from "../../hooks/redux-hooks";

import helloImage from "./../../assets/images/hello.png";
import styles from "./styles.module.scss";
import rilakkumaSound from "./../../assets/sounds/rilakkuma.mp3";

export const Cloud: React.FC = () => {
  const { toggleSound } = useAppSelector((state) => state.sound);
  const volume = toggleSound ? { volume: 1 } : { volume: 0 };
  const [play] = useSound(rilakkumaSound, volume);

  return (
    <>
      <CloudSvg className={styles.cloud} />
      <CloudSvg
        className={styles.cloud}
        style={{ animationDelay: "7s", top: "300px", height: "170px" }}
      />
      <CloudSvg
        className={styles.cloud}
        style={{ animationDelay: "15s", top: "130px", height: "130px" }}
      />
      <img
        src={helloImage}
        alt="hello"
        className={styles.hello}
        onClick={() => play()}
      />
    </>
  );
};
