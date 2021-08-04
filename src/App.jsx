import React, { useState, useEffect } from "react";
import Countries from "./Components/Countries";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Country from "./Components/Country";
import { BrowserRouter as Router, Route } from "react-router-dom";

const url = "https://restcountries.eu/rest/v2/all";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [input, setInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [region, setRegion] = useState("none");
  const [isDark, setIsDark] = useState(true);

  let invalidSearch = false;

  const body = document.querySelector("body");

  if (isDark === false) {
    if (body !== null) {
      body.classList.add("light-theme");
    }
  } else {
    if (body !== null) {
      body.classList.remove("light-theme");
    }
  }

  const onThemeChange = () => {
    setIsDark(!isDark);
    // if (isDark === false) {
    //   document.body.classList.add("light-theme");
    // } else {
    //   document.body.classList.remove("light-theme");
    // }
  };

  const handleSearchChange = async (input) => {
    const filtered = countryList.filter((country) => {
      return country.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setFilteredList(filtered);
    setRegion("none");
    if (filteredList.length === 0) {
      invalidSearch = true;
    } else {
      invalidSearch = false;
    }
    console.log(invalidSearch);
  };

  const handleRegionChange = async (region) => {
    let regionFiltered = [];
    if (region === "none") {
      regionFiltered = countryList;
    }
    regionFiltered = countryList.filter((country) => {
      return country.region.toLowerCase().includes(region.toLowerCase());
    });
    setRegion(region);
    setFilteredList(regionFiltered);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          setIsLoaded(true);
          setFilteredList(res);
          setCountryList(res);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [isDark]);

  if (error) {
    return (
      <>
        <h1 className="error">{error.message}</h1>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <h1 className="loading">Loading...</h1>
      </>
    );
  } else {
    return (
      <Router>
        <Header onThemeChange={onThemeChange} theme={isDark} />
        <div className="main-container">
          <Route exact path="/">
            <Form
              input={input}
              onSearchChange={handleSearchChange}
              region={region}
              onRegionChange={handleRegionChange}
              theme={isDark}
            />
            {invalidSearch ? (
              <h1>No such country exists</h1>
            ) : (
              <Countries countryList={filteredList} theme={isDark} />
            )}
          </Route>
          <Route path="/:name">
            <Country theme={isDark} />
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
