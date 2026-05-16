import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "../features/game/game.slice.ts";

export const WordleStore = configureStore({
  reducer: {
    game: gameSlice,
  },
});

export type RootState = ReturnType<typeof WordleStore.getState>;
export type AppDispatch = typeof WordleStore.dispatch;
