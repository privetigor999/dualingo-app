import React from "react";
import useSound from "use-sound";
import {
  setName,
  setLanguage,
  setStartGame,
} from "../../store/features/statusGameSlice";
import { setNewGame, setIsFinished } from "../../store/features/questionSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setToggleSound } from "../../store/features/soundSlice";

import styles from "./styles.module.scss";
import ruFlag from "./../../assets/images/flagIcons/ru.png";
import frFlag from "./../../assets/images/flagIcons/fr.png";
import enFlag from "./../../assets/images/flagIcons/en.png";

import soundUrl from "./../../assets/sounds/hover.mp3";
import clickMenuUrl from "./../../assets/sounds/clickMenu.mp3";

interface ICountries {
  id: number;
  title: string;
  img: string;
  isPicked: boolean;
}

export const ChoisePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [valueSound, setValueSound] = React.useState(1);
  const [inputName, setInputName] = React.useState("");
  const [langError, setLangError] = React.useState(false);
  const [maxLengthName, setMaxLengthName] = React.useState(false);
  const { toggleSound } = useAppSelector((state) => state.sound);
  const { lang } = useAppSelector((state) => state.start);
  const volume = toggleSound ? { volume: 0.6 } : { volume: 0 };
  const [play] = useSound(soundUrl, volume);
  const [click] = useSound(clickMenuUrl, volume);
  const [pickedCountry, setPickedCountry] = React.useState<
    ICountries["id"] | null
  >(null);

  const soundsItems = [
    {
      id: 1,
      title: "on",
      bool: true,
    },
    {
      id: 2,
      title: "off",
      bool: false,
    },
  ];

  const clickSoundBtn = (bool: boolean, id: number): void => {
    if (id === 1) {
      click();
    }
    dispatch(setToggleSound(bool));
    setValueSound(id);
  };

  const changeSetName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxLengthName(false);
    if (e.target.value.length === 15) {
      return setMaxLengthName(true);
    }
    if (e.target.value.trim()) {
      return setInputName(e.target.value);
    }

    setInputName("");
  };

  const countries = [
    {
      id: 1,
      title: "Russia",
      img: ruFlag,
      isPicked: false,
    },
    {
      id: 2,
      title: "English",
      img: enFlag,
      isPicked: false,
    },
    {
      id: 3,
      title: "France",
      img: frFlag,
      isPicked: false,
    },
  ];

  const clickStartBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
    if (pickedCountry === 2) {
      dispatch(setNewGame());
      dispatch(setLanguage(pickedCountry));
      dispatch(setName(inputName));
      dispatch(setStartGame("game"));
      dispatch(setIsFinished());
    } else {
      setLangError(true);
    }
  };

  const clickContinueBtn = () => {
    click();
    dispatch(setStartGame("game"));
  };

  const clickCountry = (id: number) => {
    click();
    setPickedCountry(id);
  };

  return (
    <div className={styles.choice}>
      <div>
        <h6 className={styles.title}>choose a language to study:</h6>
        <ul className={styles.listCountries}>
          {countries.map((country) => (
            <li
              className={
                pickedCountry === country.id
                  ? `${styles.listItem} ${styles.activeCountry}`
                  : styles.listItem
              }
              onClick={() => clickCountry(country.id)}
              key={country.id}
              onMouseEnter={() => {
                play();
              }}
            >
              <img
                src={country.img}
                alt={country.title}
                className={styles.flagIcon}
              />
              {country.title}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.nameBlock}>
        <h6>enter your name:</h6>
        <div className={styles.name}>
          <input
            type="text"
            placeholder="for new game..."
            value={inputName}
            onChange={changeSetName}
          />
        </div>
        {maxLengthName && <p>Maximum length is 15 characters</p>}
      </div>
      <div className={styles.soundBlock}>
        <h6>Sound</h6>
        <div className={styles.soundButton}>
          {soundsItems.map((soundItem) => (
            <button
              onClick={() => clickSoundBtn(soundItem.bool, soundItem.id)}
              key={soundItem.id}
              onMouseEnter={() => {
                play();
              }}
              className={
                valueSound === soundItem.id ? styles.activeSoundBtn : ""
              }
            >
              {soundItem.title}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.buttonBlock}>
        {langError && (
          <p className={styles.langError}>Only English is working now</p>
        )}
        <div className={styles.buttons}>
          {lang && (
            <button onClick={clickContinueBtn} onMouseEnter={() => play()}>
              continue
            </button>
          )}
          <button
            disabled={!inputName || !pickedCountry}
            onClick={clickStartBtn}
            onMouseEnter={() => play()}
          >
            new game
          </button>
        </div>
      </div>
    </div>
  );
};
