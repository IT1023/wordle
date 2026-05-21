import { useSelector } from "react-redux";
import { selectGameState } from "./game.slice";
import { useTranslation } from "react-i18next";
import type { TLanguages } from "../../config/i18n";
import { numbersMap } from "../../shared/lib/constants";

export default function Attempts() {
  const { t, i18n } = useTranslation();
  const gameState = useSelector(selectGameState);
  const { attemptLeft } = gameState || {
    attemptLeft: 6,
  };
  const lang = i18n.language as TLanguages;
  return (
    <p
      role="status"
      className="w-full flex justify-center font-mono font-bold italic text-xl dark:text-white"
    >
      {`${t("attemptsLeft")}: ${numbersMap[lang][attemptLeft]}`}
    </p>
  );
}
