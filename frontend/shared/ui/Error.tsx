import { useTranslation } from "react-i18next";
import type { Reject } from "../../features/game/game.slice";

interface ErrorProps {
  error: Reject;
}

export default function Error({ error }: ErrorProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex-1 py-12 flex justify-center font-mono italic text-red-500 text-2xl dark:text-red-400">
      {t(`errors.${error}`)}
    </div>
  );
}
