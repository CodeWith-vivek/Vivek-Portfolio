import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const THEME_COLORS = { dark: "#060605", light: "#f6f6f0" };

// index.html sets data-theme before first paint; this only flips and persists it.
const ThemeToggle = ({ className = "" }) => {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[next]);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage blocked: theme still applies for this visit
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`flex-center size-10 rounded-full border border-line bg-black-300 text-white-50 hover:border-lime hover:text-blue-50 transition-colors duration-300 cursor-pointer ${className}`}
    >
      {isDark ? <FiSun className="size-5" /> : <FiMoon className="size-5" />}
    </button>
  );
};

export default ThemeToggle;
