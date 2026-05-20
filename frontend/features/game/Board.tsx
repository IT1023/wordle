import { useSelector } from "react-redux";
import Case from "./Case";
import { selectActiveWord, selectGameState } from "./game.slice";
import { useEffect } from "react";

export default function Board() {
  const activeWord = useSelector(selectActiveWord);
  const gameState = useSelector(selectGameState);
  const { words, status, attemptLeft } = gameState || {
    words: [],
    status: "idle",
    attemptLeft: 1,
  };

  useEffect(() => {
    if (status === "idle" || status === "running") return;
    if (status === "failed") console.log("failed");
    if (status === "won") console.log("Won");
  }, [status]);

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
            return <Case key={idx} letter={activeWord[idx]} />;
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
