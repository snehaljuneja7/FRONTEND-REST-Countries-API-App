import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = (props) => {
  const moon = document.querySelector(".dark");
  const header = document.querySelector(".header");
  const button = document.querySelector("button");

  if (props.theme === false) {
    if (button !== null) {
      button.classList.add("light-theme");
    }
    if (header !== null) {
      header.classList.add("light-theme");
    }
    if (moon !== null) {
      moon.classList.add("light-theme");
    }
  } else {
    if (button !== null) {
      button.classList.remove("light-theme");
    }
    if (header !== null) {
      header.classList.remove("light-theme");
    }
    if (moon !== null) {
      moon.classList.remove("light-theme");
    }
  }

  return (
    <>
      <header className="header">
        <div>
          <h1>Where in the world?</h1>
        </div>
        <div>
          <div className="dark">
            {props.theme === false ? (
              <button onClick={() => props.onThemeChange()}>
                <FaMoon />
                <span> Dark Mode</span>
              </button>
            ) : (
              <button onClick={() => props.onThemeChange()}>
                <FaSun />
                <span> Light Mode</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
