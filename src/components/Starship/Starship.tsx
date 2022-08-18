import { useEffect, useState } from "react";
import yoda from "../../assets/yoda.svg";
import { StarshipItem } from "../../model/interfaces";
import styles from "./Starship.module.scss";

export const Starship = (props: StarshipItem) => {
  const [img, setImg] = useState<string>("x-wing");

  // generate and set random img name due to no control over BE response
  // i.e starship names could and may change
  useEffect(() => {
    const starShips: string[] = [
      "death-star",
      "dreadnought",
      "x-wing",
      "y-wing",
    ];
    const randomStarShip: string =
      starShips[Math.floor(Math.random() * starShips.length)];

    setImg(randomStarShip);
  }, []);

  return (
    <>
      <li className={styles.card}>
        <div className={` ${styles.container} grid alignItemsCenter`}>
          <div>
            <img
              src={require(`./../../assets/starships/${img}.png`)}
              alt="Death Star"
              height="50"
              width="50"
            />
          </div>
          <div>
            <div>
              <strong>Name:</strong> {props.name}
            </div>
            <div>
              <strong>Model:</strong> {props.model}
            </div>
            <div>
              <strong>Film count:</strong> {props.films.length}
            </div>
            <div>
              <strong>Crew count:</strong> {props.crew}
            </div>
          </div>
          <div>
            {props.appeared_in_most_films && (
              <img src={yoda} alt="Yoda Head" height="50" width="50" />
            )}
          </div>
        </div>
      </li>
    </>
  );
};
