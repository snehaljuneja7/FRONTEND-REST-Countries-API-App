import React from "react";
import { Link } from "react-router-dom";

const Countries = (props) => {
  const countryList = props.countryList;

  const details = document.querySelectorAll(".details");
  const countryCard = document.querySelectorAll(".country-card");

  if (props.theme === false) {
    if (details !== null) {
      details.forEach((detail) => detail.classList.add("light-theme"));
    }
    if (countryCard !== null) {
      countryCard.forEach((country) => country.classList.add("light-theme"));
    }
  } else {
    if (details !== null) {
      details.forEach((detail) => detail.classList.remove("light-theme"));
    }
    if (countryCard !== null) {
      countryCard.forEach((country) => country.classList.remove("light-theme"));
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="grid">
      {countryList.map((country) => {
        const { name, population, flag, capital, region, alpha3Code } = country;
        return (
          <Link to={`/${name}`}>
            <article key={alpha3Code} className="country-card">
              <div className="flag">
                <img src={flag} alt={name}></img>
              </div>
              <div className="details">
                <h4 className="country-name">{name}</h4>
                <h4>
                  Population : <span>{numberWithCommas(population)}</span>
                </h4>
                <h4>
                  Region : <span>{region}</span>
                </h4>
                <h4>
                  Capital : <span>{capital}</span>
                </h4>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default Countries;
