import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "../features/game/game.slice.ts";
import toastSlice from "../features/toast/toast.slice.ts";

export const WordleStore = configureStore({
  reducer: {
    game: gameSlice,
    toast: toastSlice,
  },
});

export type RootState = ReturnType<typeof WordleStore.getState>;
export type AppDispatch = typeof WordleStore.dispatch;
