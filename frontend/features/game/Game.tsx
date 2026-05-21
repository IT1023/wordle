import { useSelector } from "react-redux";
import Attempts from "./Attempts";
import Board from "./Board";
import Keyboard from "./Keyboard";
import {
  addLetter,
  popLetter,
  postWord,
  resetGame,
  resetLetter,
  selectError,
  selectInitializationStatus,
} from "./game.slice";
import Error from "../../shared/ui/Error";
import Loader from "../../shared/ui/Loader";
import Title from "./Title";
import { useAppDispatch } from "../../config/redux.helper";
import { useEffect } from "react";
import { addTempToast } from "../toast/toast.helper";

export default function Game() {
  const status = useSelector(selectInitializationStatus);
  const error = useSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        dispatch(popLetter());
        return;
      }
      if (e.key === "Enter") {
        dispatch(postWord());
        dispatch(resetLetter());
      }
      if (/^[a-zA-Z]$/.test(e.key)) {
        dispatch(addLetter(e.key));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    if (error !== "INVALID" && error !== "UNPROCESSABLE") return;
    const type = error === "INVALID" ? "warning" : "info";
    dispatch(addTempToast({ error, type }));
  }, [error, dispatch]);

  return (
    <div
      className="w-full flex-1 flex flex-col justify-center"
      aria-describedby="game-title"
    >
      {status === "loading" && <Loader />}
      {status === "success" && (
        <div className="game-wrapper py-4 w-full h-full flex flex-col items-center gap-y-4 overflow-y-scroll scrollbar-none">
          <Title />
          <Attempts />
          <Board />
          <Keyboard />
        </div>
      )}
      {status === "failure" && error && <Error error={error} />}
      <button
        className="border p-4 cursor-pointer"
        onClick={() => dispatch(resetGame())}
      >
        Reset Game
      </button>
    </div>
  );
}
