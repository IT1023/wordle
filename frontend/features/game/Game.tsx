import Attempts from "./Attempts";
import Board from "./Board";
import Input from "./Input";
import Keyboard from "./Keyboard";

export default function Game() {
  return (
    <div className="w-full flex flex-col justify-center p-4">
      <Attempts />
      <Board />
      <Input />
      <Keyboard />
    </div>
  );
}
