import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import useSound from "use-sound";

import styles from "./styles.module.scss";
import finishPng from "./../../../assets/images/finish.png";
import img1 from "./../../../assets/images/drum/1.png";
import img2 from "./../../../assets/images/drum/2.png";
import img3 from "./../../../assets/images/drum/3.png";
import img4 from "./../../../assets/images/drum/4.png";
import img5 from "./../../../assets/images/drum/5.png";
import img6 from "./../../../assets/images/drum/6.png";
import sound1 from "./../../../assets/sounds/drum/sound1.wav";
import sound2 from "./../../../assets/sounds/drum/sound2.wav";
import sound3 from "./../../../assets/sounds/drum/sound3.wav";
import sound4 from "./../../../assets/sounds/drum/sound4.wav";
import sound5 from "./../../../assets/sounds/drum/sound5.wav";
import sound6 from "./../../../assets/sounds/drum/sound6.wav";

export const Finish: React.FC = () => {
  const { countError } = useAppSelector((state) => state.question);
  const sounds = [
    {
      id: 1,
      sound: sound1,
      image: img1,
    },
    {
      id: 2,
      sound: sound2,
      image: img2,
    },
    {
      id: 3,
      sound: sound3,
      image: img3,
    },
    {
      id: 4,
      sound: sound4,
      image: img4,
    },
    {
      id: 5,
      sound: sound5,
      image: img5,
    },
    {
      id: 6,
      sound: sound6,
      image: img6,
    },
  ];

  let [play1] = useSound(sounds[0].sound);
  let [play2] = useSound(sounds[1].sound);
  let [play3] = useSound(sounds[2].sound);
  let [play4] = useSound(sounds[3].sound);
  let [play5] = useSound(sounds[4].sound);
  let [play6] = useSound(sounds[5].sound);

  return (
    <div className={styles.finishContainer}>
      <h2>you have passed 10 levels!</h2>
      <p>
        На протяжении всей игры вы допустили {countError}{" "}
        {countError === 1
          ? "ошибку"
          : countError === 2
          ? "ошибки"
          : countError === 3
          ? "ошибки"
          : countError === 4
          ? "ошибки"
          : "ошибок"}
      </p>
      <div className={styles.description}>
        <img src={finishPng} alt="img" />
        <p className={styles.title}>
          Рилаккуме понравилось с тобой иметь дело! Он научился разговаривать
          по-английски вместе с тобой! В честь этого Рилаккума предлагает тебе
          сыграть на своих инструментах! Сыграй для Рилаккумы мелодию!
        </p>
      </div>
      <div className={styles.sounds}>
        <div className={styles.sound} onClick={() => play1()}>
          <img src={sounds[0].image} />
        </div>
        <div className={styles.sound} onClick={() => play2()}>
          <img src={sounds[1].image} />
        </div>
        <div className={styles.sound} onClick={() => play3()}>
          <img src={sounds[2].image} />
        </div>
        <div className={styles.sound} onClick={() => play4()}>
          <img src={sounds[3].image} />
        </div>
        <div className={styles.sound} onClick={() => play5()}>
          <img src={sounds[4].image} />
        </div>
        <div className={styles.sound} onClick={() => play6()}>
          <img src={sounds[5].image} />
        </div>
      </div>
    </div>
  );
};
