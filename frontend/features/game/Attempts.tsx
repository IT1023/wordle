import { useSelector } from "react-redux";
import { selectGameState } from "./game.slice";

export default function Attempts() {
  const gameState = useSelector(selectGameState);
  const { attemptLeft } = gameState || { attemptLeft: undefined };
  return (
    <div className="w-full flex justify-center font-mono font-bold italic text-2xl dark:text-white">
      {attemptLeft && `Attempts Left: ${attemptLeft}`}
    </div>
  );
}
