import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Country = (props) => {
  const { name } = useParams();
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);

  const countryContainer = document.querySelector(".countryContainer");
  const backBtn = document.querySelector(".back-btn");
  const brdrs = document.querySelectorAll(".border");

  if (props.theme === false) {
    if (countryContainer !== null) {
      countryContainer.classList.add("light-theme");
    }
    if (backBtn !== null) {
      backBtn.classList.add("light-theme");
    }
    if (brdrs !== null) {
      brdrs.forEach((border) => border.classList.add("light-theme"));
    }
  } else {
    if (countryContainer !== null) {
      countryContainer.classList.remove("light-theme");
    }
    if (backBtn !== null) {
      backBtn.classList.remove("light-theme");
    }
    if (brdrs !== null) {
      brdrs.forEach((border) => border.classList.remove("light-theme"));
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchSingleCountry = async () => {
    let newBorders = [];
    const response = await fetch(
      `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    );
    const data = await response.json();
    //console.log(data[0].borders);
    const borders = data[0].borders;
    borders.map(async (border) => {
      const response = await fetch(
        `https://restcountries.eu/rest/v2/alpha/${border}`
      );
      const data = await response.json();
      newBorders.push(data.name);

      setTimeout(() => {
        setBorders(newBorders);
      }, 100);
    });

    setCountry(data[0]);
  };

  useEffect(() => {
    fetchSingleCountry();
  }, [name]);

  if (Object.keys(country).length === 0) {
    return <h1>Loading....</h1>;
  } else {
    const {
      alpha3Code,
      flag,
      region,
      subregion,
      population,
      nativeName,
      capital,
      topLevelDomain,
      languages,
      currencies,
    } = country;

    return (
      <div className="countryContainer">
        <div className="profile-container">
          <Link to="/">
            <div className="back-btn">
              <FaArrowLeft /> Back
            </div>
          </Link>
          <div>
            <div className="country-data">
              <div className="flag_img">
                <img src={flag} alt={name}></img>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="country-info">
                  <div className="left-data">
                    <h2 className="countryName">{name}</h2>
                    <h5>
                      Native Name : <span>{nativeName}</span>
                    </h5>
                    <h5>
                      Population : <span>{numberWithCommas(population)}</span>
                    </h5>
                    <h5>
                      Region : <span>{region}</span>
                    </h5>
                    <h5>
                      Sub Region : <span>{subregion}</span>
                    </h5>
                    <h5>
                      Capital : <span>{capital}</span>
                    </h5>
                  </div>
                  <div className="right-data">
                    <h5>
                      Top Level Domain : <span>{topLevelDomain}</span>
                    </h5>
                    <h5>
                      Currencies : <span>{currencies[0].name}</span>
                    </h5>
                    <h5>
                      Languages :{" "}
                      {languages.map((l) => {
                        return <span key={l.name}>{l.name} </span>;
                      })}
                    </h5>
                  </div>
                </div>
                {borders.length === 0 ? (
                  <div> </div>
                ) : (
                  <div className="border-countries">
                    <h5>Border Countries : </h5>
                    {borders.map((b) => {
                      return (
                        <Link to={`/${b}`}>
                          <button className="border" key={b}>
                            {b}
                            <span> </span>
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Country;
