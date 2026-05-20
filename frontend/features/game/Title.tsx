import { useTranslation } from "react-i18next";

export default function Title() {
  const { t } = useTranslation();
  return (
    <div className="game-title w-full flex justify-center font-mono font-bold italic text-2xl dark:text-white">
      {t("gameTitle")}
    </div>
  );
}
