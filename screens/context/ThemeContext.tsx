import React, { createContext, useContext, useState } from "react";
import { darkColors, lightColors } from "./theme";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof lightColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
