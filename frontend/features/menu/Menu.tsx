import { useAppDispatch } from "../../config/redux.helper";
import { resetGame } from "../game/game.slice";

export default function Menu() {
  const dispatch = useAppDispatch();
  return (
    <nav className="w-full h-full rounded-2xl p-2 text-dark dark:text-white flex flex-col gap-2">
      <button onClick={() => dispatch(resetGame())}>Rest Game</button>
    </nav>
  );
}
