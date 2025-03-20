import React from "react";
import styles from "./Tag.module.css";
import X from "../asset/image/ic_X.png";

function Tag({ tag, handleClickDelete }) {
  return (
    <div className={styles.tag}>
      <p className={styles.name}>#{tag}</p>
      <img
        className={styles.delete}
        onClick={() => handleClickDelete(tag)}
        src={X}
      />
    </div>
  );
}

export default Tag;
