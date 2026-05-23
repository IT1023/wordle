import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../config/redux.helper";
import {
  addLetter,
  popLetter,
  postWord,
  resetLetter,
  selectGameState,
  selectSubmittedLetters,
  type LetterState,
} from "./game.slice";
import { useSelector } from "react-redux";
import GameOver from "./GameOver";

const letterColors: Record<LetterState, string> = {
  correct: "bg-green-500 text-black dark:bg-green-300 dark:text-white",
  misplaced: "bg-yellow-300 text-black dark:bg-yellow-500 dark:text-white",
  incorrect: "text-black dark:text-white",
  idle: "bg-gray-300 dark:bg-gray-600",
};

const Layers: string[] = ["azertyuiop←", "qsdfghjklm↩", "wxcvbn"];

export default function Keyboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectGameState) || { status: "idle" };
  const submittedLetters = useSelector(selectSubmittedLetters);

  if (status === "failed" || status === "won")
    return <GameOver status={status} />;

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
              const state = submittedLetters[letter] || "idle";
              return (
                <button
                  key={letter}
                  className={`w-10 md:w-14 lg:w-16 ${letterColors[state]} text-md md:text-xl lg:text-2xl cursor-pointer font-mono font-bold aspect-square border flex justify-center items-center border-gray-300 dark:border-gray-700 capitalize transition-all duration-500 ease-in-out active:scale-150`}
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
