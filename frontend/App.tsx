import { useAppDispatch } from "./config/redux.helper";
import Header from "./layouts/Header";
import { initiateGame } from "./features/game/game.slice";
import { useEffect } from "react";
import Game from "./features/game/Game";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const gameStateRequest = dispatch(initiateGame());
    return () => {
      gameStateRequest.abort();
    };
  }, [dispatch]);

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll no-scrollbar">
      <Header />
      <Game />
    </div>
  );
}

export default App;
