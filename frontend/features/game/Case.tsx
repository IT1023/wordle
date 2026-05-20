import type { GameState } from "../../../shared/types";

type LetterState = GameState["words"][number]["state"][number];

interface CaseProps {
  letter: string;
  state?: LetterState;
}

const letterColors: Record<LetterState, string> = {
  correct: "bg-green-500 text-black dark:bg-green-300 dark:text-white",
  misplaced: "bg-yellow-300 text-black dark:bg-yellow-500 dark:text-white",
  incorrect: "text-black dark:text-white",
};

export default function Case({ letter, state = "incorrect" }: CaseProps) {
  return (
    <div
      className={`letter transition-all duration-500 ease-in-out aspect-square w-15 border border-gray-300 dark:border-gray-600 ${letterColors[state]} flex justify-center items-center capitalize font-mono font-bold text-xl`}
    >
      {letter}
    </div>
  );
}
