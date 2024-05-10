// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { ConfigProvider, theme as AntDTheme } from "antd";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const { defaultAlgorithm, darkAlgorithm } = AntDTheme;
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(`${theme}`);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme == "dark" ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
