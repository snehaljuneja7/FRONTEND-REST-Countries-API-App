import React from "react";
import { FaSearch } from "react-icons/fa";

const Form = (props) => {
  const search = document.querySelector(".search");
  const select = document.querySelector("select");
  const inputField = document.querySelector("input");

  if (props.theme === false) {
    if (search !== null) {
      search.classList.add("light-theme");
    }
    if (select !== null) {
      select.classList.add("light-theme");
    }
    if (inputField !== null) {
      inputField.classList.add("light-theme");
    }
  } else {
    if (search !== null) {
      search.classList.remove("light-theme");
    }
    if (select !== null) {
      select.classList.remove("light-theme");
    }
    if (inputField !== null) {
      inputField.classList.remove("light-theme");
    }
  }

  return (
    <div className="form">
      <div className="search">
        <FaSearch className="search-icon" />
        <input
          className="searchTerm"
          type="text"
          name="search"
          placeholder="Search Country"
          value={props.input}
          onChange={(e) => props.onSearchChange(e.target.value)}
        ></input>
      </div>
      <select
        className="select"
        name="region"
        value={props.region}
        onChange={(e) => props.onRegionChange(e.target.value)}
      >
        <option style={{ display: "none" }} value="none">
          Filter By Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Form;
