import { useTranslation } from "react-i18next";
import type { GameState } from "../../../shared/types";

interface GameOverProps {
  status: GameState["status"];
}

export default function GameOver({ status }: GameOverProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col p-4 items-center gap-2 font-mono font-bold text-2xl text-black dark:text-white transition-all duration-300 ease-in-out">
      {t(`gameOver.${status}`)}
    </div>
  );
}
