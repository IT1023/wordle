import { useSelector } from "react-redux";
import { selectGameState } from "./game.slice";

export default function Attempts() {
  const gameState = useSelector(selectGameState);
  const { attemptLeft } = gameState || {
    attemptLeft: undefined,
  };
  return (
    <p
      role="status"
      className="w-full flex justify-center font-mono font-bold italic text-xl dark:text-white"
    >
      {`Attempts Left: ${attemptLeft}`}
    </p>
  );
}
