import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import styles from "./styles.module.scss";

export const Description = () => {
  const { currentQuestion } = useAppSelector((state) => state.question);

  React.useEffect(() => {}, [currentQuestion]);
  return (
    <div className={styles.description}>
      <img src={currentQuestion?.image} />
      <div>{currentQuestion?.description}</div>
    </div>
  );
};
