import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../config/redux.helper";
import { resetGame } from "../game/game.slice";

export default function Menu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <nav className="w-full h-full rounded-2xl p-4 text-dark dark:text-white flex flex-col gap-2 justify-between">
      <ul className="w-full p-4 flex flex-col gap-2 items-center [&>li]:w-[75%] [&>li]:p-2 [&>li]:bg-gray-700 [&>li]:rounded-md">
        <li className="flex justify-center [:hover]:bg-gray-800 transition-all duration-150 ease-in-out">
          <button
            className="w-full h-full cursor-pointer font-mono font-bold"
            onClick={() => dispatch(resetGame())}
          >
            {t("menu.resetGame")}
          </button>
        </li>
        <li className="flex justify-center [:hover]:bg-gray-800 transition-all duration-150 ease-in-out">
          <a
            className="w-full h-full cursor-pointer font-mono font-bold flex justify-center"
            href="https://github.com/mohammedtahahalim/wordle"
            target="_blank"
          >
            {t("menu.sourceCode")}
          </a>
        </li>
        <li className="flex justify-center [:hover]:bg-gray-800 transition-all duration-150 ease-in-out">
          <a
            className="w-full h-full cursor-pointer font-mono font-bold flex justify-center"
            href="https://github.com/mohammedtahahalim"
            target="_blank"
          >
            {t("menu.github")}
          </a>
        </li>
        <li className="flex justify-center [:hover]:bg-gray-800 transition-all duration-150 ease-in-out">
          <a
            className="w-full h-full cursor-pointer font-mono font-bold flex justify-center"
            href="https://www.linkedin.com/in/mohammedtahahalim/"
            target="_blank"
          >
            {t("menu.linkedin")}
          </a>
        </li>
        <li className="flex justify-center [:hover]:bg-gray-800 transition-all duration-150 ease-in-out">
          <a
            className="w-full h-full cursor-pointer font-mono font-bold flex justify-center"
            href="https://zenn.dev/taha"
            target="_blank"
          >
            {t("menu.zenn")}
          </a>
        </li>
      </ul>
      <span className="w-full flex justify-center font-mono font-bold italic">
        {t("menu.signature")}
      </span>
    </nav>
  );
}
