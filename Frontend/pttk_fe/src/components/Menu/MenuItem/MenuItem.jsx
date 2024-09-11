import React from "react";
import styles from "./MenuItem.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MenuItem = ({ to, title}) => {
  return (
    <li className={styles.overlayMenuItem}>
      <Link to={to} className={styles.overlayMenuLink}>
        <span className={styles.textTypeMenu}>{title}</span>
        <FontAwesomeIcon icon={faAngleRight} className={styles.iconRight} />
      </Link>
    </li>
  );
};

export default MenuItem;
