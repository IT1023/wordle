import { useSelector } from "react-redux";
import {
  selectActiveWord,
  selectGameState,
  selectPostWordStatus,
} from "./game.slice";
import Case from "./Case";

export default function Board() {
  const postStatus = useSelector(selectPostWordStatus);
  const activeWord = useSelector(selectActiveWord);
  const gameState = useSelector(selectGameState);
  const { words, status, attemptLeft } = gameState || {
    words: [],
    status: "idle",
    attemptLeft: 6,
  };

  return (
    <div className="w-full flex flex-col p-4 items-center gap-2">
      {words.map((w) => {
        return (
          <div className="flex gap-2" key={w.word}>
            {Array.from({ length: 5 }).map((_, idx) => {
              return (
                <Case
                  key={`${w.word}-${idx}`}
                  letter={w.word[idx]}
                  state={w.state[idx]}
                />
              );
            })}
          </div>
        );
      })}
      {status === "running" && (
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, idx) => {
            return postStatus === "loading" ? (
              <div
                key={idx}
                className="letter transition-all duration-500 ease-in-out aspect-square w-15 bg-gray-200 dark:bg-gray-500"
              ></div>
            ) : (
              <Case key={idx} letter={activeWord[idx]} active={true} />
            );
          })}
        </div>
      )}
      {!!attemptLeft &&
        Array.from({
          length: status === "running" ? attemptLeft - 1 : attemptLeft,
        }).map((_, idx) => {
          return (
            <div key={idx} className="flex gap-2">
              {Array.from({ length: 5 }).map((_, idx) => {
                return <Case key={idx} letter={""} />;
              })}
            </div>
          );
        })}
    </div>
  );
}
