import React from "react";
import { useTheme } from "@/components/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeSwitcher: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      {isDarkMode ? (
        <FiSun size={24} color="#FFA500" />
      ) : (
        <FiMoon size={24} color="#00008B" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
