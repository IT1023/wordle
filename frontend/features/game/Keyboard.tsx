import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../config/redux.helper";
import { addLetter, popLetter, postWord, resetLetter } from "./game.slice";

const Layers: string[] = ["azertyuiop←", "qsdfghjklm↩", "wxcvbn"];

export default function Keyboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onTrigger = (letter: string) => {
    if (letter === "←") {
      dispatch(popLetter());
    } else if (letter === "↩") {
      dispatch(postWord());
      dispatch(resetLetter());
    } else {
      dispatch(addLetter(letter));
    }
  };

  return (
    <div
      className="w-full flex flex-col gap-2 items-center"
      aria-label={t("keyboard")}
    >
      {Layers.map((layer, idx) => {
        return (
          <div className="w-full flex gap-2 justify-center" key={idx}>
            {layer.split("").map((letter) => {
              return (
                <button
                  key={letter}
                  className="w-10 md:w-14 lg:w-16 text-md md:text-xl lg:text-2xl cursor-pointer bg-gray-300 dark:bg-gray-600 font-mono font-bold aspect-square border flex justify-center items-center border-gray-300 dark:border-gray-700 capitalize transition-all duration-500 ease-in-out active:scale-150"
                  onClick={() => onTrigger(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
