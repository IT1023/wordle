import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

type TTheme = "light" | "dark";

const fetchInitialTheme = (): TTheme => {
  try {
    const localTheme = localStorage.getItem("theme") || "";
    if (["light", "dark"].includes(localTheme)) return localTheme as TTheme;
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (matchMedia.matches) return "dark";
    return "light";
  } catch (err) {
    console.log(err);
    return "light";
  }
};

export default function Theme() {
  const [currentTheme, setCurrentTheme] = useState<TTheme>(fetchInitialTheme);
  const { t } = useTranslation("");

  useEffect(() => {
    try {
      localStorage.setItem("theme", currentTheme);
      if (currentTheme === "dark")
        document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch (err) {
      console.log(err);
    }
  }, [currentTheme]);

  const changeTheme = () => {
    setCurrentTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  return (
    <div
      onClick={changeTheme}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;
        changeTheme();
      }}
      role="button"
      aria-label={t(`theme.${currentTheme}`)}
      className="w-fit h-full flex items-center cursor-pointer hover:scale-110 transition-all duration-400"
      tabIndex={0}
    >
      {currentTheme === "dark" ? (
        <FontAwesomeIcon icon={faSun} fontSize={18} />
      ) : (
        <FontAwesomeIcon icon={faMoon} fontSize={18} />
      )}
    </div>
  );
}
