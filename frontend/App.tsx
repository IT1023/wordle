import { useAppDispatch } from "./config/redux.helper";
import Header from "./layouts/Header";
import { initiateGame } from "./features/game/game.slice";
import { useEffect } from "react";
import Game from "./features/game/Game";
import Toast from "./features/toast/Toast";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const gameStateRequest = dispatch(initiateGame());
    return () => {
      gameStateRequest.abort();
    };
  }, [dispatch]);

  return (
    <div className="w-screen h-screen overflow-hidde flex flex-col">
      <Header />
      <Game />
      <Toast />
    </div>
  );
}

export default App;
