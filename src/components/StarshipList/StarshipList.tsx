import React, { useState } from "react";
import spinner from "../../assets/spinner.svg";
import { StarshipItem, StarshipListResponse } from "../../model/interfaces";
import { lowToHighSort } from "../../utilities/lowToHighSort";
import { Starship } from "../Starship/Starship";
import styles from "./StarshipList.module.scss";
import yoda from "../../assets/yoda.svg";

export const StarshipList = () => {
  const [isLoading, setLoading] = useState(false);
  const [starships, setStarships] = useState<StarshipListResponse>();

  const fetchStarshipsHandler = (): void => {
    setLoading(true);

    fetch("https://swapi.dev/api/starships/")
      .then((response: Response) => response.json())
      .then((data: StarshipListResponse) =>
        setStarships(transformStarships(data))
      )
      .finally(() => setLoading(false));
  };

  const transformStarships = (
    data: StarshipListResponse
  ): StarshipListResponse => {
    const filteredData = filterStarships(data);
    return sortStarships(filteredData);
  };

  const calcHighestFilmAppearances = (data: StarshipItem[]): number => {
    return Math.max(
      ...data.reduce((accumulator: number[], currentValue: StarshipItem) => {
        accumulator.push(currentValue.films.length);
        return accumulator;
      }, [])
    );
  };

  const filterStarships = (
    data: StarshipListResponse
  ): StarshipListResponse => {
    const results: StarshipItem[] = data.results.filter(
      (item: StarshipItem) => {
        // Remove commas, periods and hyphens from crew count & convert to number
        const crewCount = Number(item.crew.replace(/[,.-]/g, ""));
        return crewCount < 10 ? item : false;
      }
    );

    const highestFilmAppearances = calcHighestFilmAppearances(results);

    return {
      ...data,
      count: results.length,
      results: results.map((starship: StarshipItem) => {
        return {
          ...starship,
          appeared_in_most_films:
            Number(starship.films.length) === highestFilmAppearances,
        };
      }),
    };
  };

  const sortStarships = (data: StarshipListResponse) => {
    return {
      ...data,
      results: data.results.sort(lowToHighSort("crew")),
    };
  };

  return (
    <article>
      <div
        className={` ${styles.header} grid justifySpaceBetween alignItemsCenter`}
      >
        <div className="flex alignItemsCenter">
          <h3>
            The starship that appears in the most films shows a yoda image
          </h3>
          <img className={styles.yoda} src={yoda} alt="Yoda Head" height="50" width="50" />
        </div>

        <button className={styles.button} onClick={fetchStarshipsHandler}>
          {isLoading ? "Fetching..." : "Get starships"}
        </button>
      </div>

      {isLoading && (
        <div className="textCenter">
          <img src={spinner} className={styles.spinner} alt="spinner" />
        </div>
      )}

      {!isLoading && (
        <ul className={styles.list}>
          {starships?.results.map((item: StarshipItem) => (
            <Starship key={item.name} {...item} />
          ))}

          {starships?.results && (
            <h3>
              <strong>Results:</strong> {starships?.results.length}
            </h3>
          )}
        </ul>
      )}
    </article>
  );
};
