import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import useTheme from "./useTheme";

export default function Theme() {
  const { currentTheme, toggleTheme } = useTheme();
  const { t } = useTranslation("");

  return (
    <div
      onClick={toggleTheme}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;
        toggleTheme();
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
