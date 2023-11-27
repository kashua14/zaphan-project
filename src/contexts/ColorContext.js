import React from "react";

// const ThemeContext = React.createContext("white");

export const themes = {
  light: {
    color: "#000",
    background: "#FFF",
    memoView: "#D3D3D3",
    memoOpen: "#f0f0f0",
    shadow: "5px 5px 25px #999",
  },
  dark: {
    color: "#ffffff",
    background: "rgb(37, 37, 37)",
    shadow: "5px 5px 25px #000",
    memoView: "rgb(37, 37, 37)",
    memoOpen: "rgb(37, 37, 37)",
  },
};

export const ThemeContext2 = React.createContext(
  themes.light
  // default value
);

// export  ThemeContext2;
