import React from "react";
import logo from "../../assets/star-wars-logo.png";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header
      className={` ${styles.header} grid justifySpaceBetween alignItemsCenter`}
    >
      <img
        className={styles.logo}
        src={logo}
        alt="star wars logo"
        height="100"
      />
      <div>
        <h1>
          Star Wars project using SWAPI API by{" "}
          <a
            className={styles.link}
            href="https://www.linkedin.com/in/omarcreativedev/"
            target="_blank"
            rel="noreferrer"
          >
            Omar Mirza
          </a>
        </h1>
        <h2>
          Starships are filtered by crews less than 10 and sorted (low - high)
        </h2>
      </div>
    </header>
  );
};
