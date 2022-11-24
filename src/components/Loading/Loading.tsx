import React from "react";
import DotLoader from "react-spinners/DotLoader";

import styles from "./styles.module.scss";

export const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}>
        <h3>loading</h3>
        <DotLoader color="#6db2ff" />
      </div>
    </div>
  );
};
