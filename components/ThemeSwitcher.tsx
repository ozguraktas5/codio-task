import React from "react";
import { useTheme } from "@/components/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeSwitcher;
