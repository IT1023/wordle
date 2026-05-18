import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { GameState, PostWord } from "../../../shared/types";
import type { RootState } from "../../config/store";
import { gameStateSchema, wordSchema } from "../../../shared/schemas";
import z from "zod";

const responseSchema = z.object({
  game: gameStateSchema,
});

/*------------------------------------------- State -------------------------------------------*/
type Status = "idle" | "loading" | "failure" | "success";

type Reject =
  | "ABORT"
  | "SYSTEM"
  | "DOWN"
  | "MISMATCH"
  | "INVALID"
  | "UNPROCESSABLE";

type SliceState = {
  initializationStatus: Status;
  postwordStatus: Status;
  error: Reject | null;
  gameState: GameState | null;
};

const initialState: SliceState = {
  initializationStatus: "idle",
  postwordStatus: "idle",
  error: null,
  gameState: null,
};

/*------------------------------------------- Thunks -------------------------------------------*/

export const initiateGame = createAsyncThunk<
  GameState,
  void,
  { rejectValue: Reject }
>("initiate-game", async (_, { signal, rejectWithValue }) => {
  try {
    const base: string = import.meta.env.VITE_BASE_API_URL;
    const url: URL = new URL("/game", base);
    const options: RequestInit = {
      method: "GET",
      signal,
      credentials: "include",
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status >= 500) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }
    const data = await response.json();
    const parsed = responseSchema.safeParse(data);
    if (!parsed.success) return rejectWithValue("MISMATCH");
    const { game } = parsed.data;
    return game;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

export const postWord = createAsyncThunk<
  GameState,
  PostWord,
  { rejectValue: Reject }
>("post-word", async (_args, { signal, rejectWithValue }) => {
  try {
    const argsParsed = wordSchema.safeParse(_args);
    if (!argsParsed.success) return rejectWithValue("MISMATCH");
    const { word } = argsParsed.data;
    const base: string = import.meta.env.VITE_BASE_API_URL;
    const url: URL = new URL("/word", base);
    const options: RequestInit = {
      method: "POST",
      signal,
      credentials: "include",
      body: JSON.stringify({ word }),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 400) return rejectWithValue("MISMATCH");
      if (response.status === 409) return rejectWithValue("UNPROCESSABLE");
      if (response.status === 422) return rejectWithValue("INVALID");
      if (response.status >= 500) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }
    const data = await response.json();
    const parsed = responseSchema.safeParse(data);
    if (!parsed.success) return rejectWithValue("MISMATCH");
    const { game } = parsed.data;
    return game;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

/*------------------------------------------- Slice -------------------------------------------*/

const gameSlice = createSlice({
  name: "game/slice",
  initialState,
  reducers: {
    optimisticReset: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(initiateGame.pending, (state) => {
        state.initializationStatus = "loading";
        state.error = null;
      })
      .addCase(
        initiateGame.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.initializationStatus = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        initiateGame.fulfilled,
        (state, action: PayloadAction<GameState>) => {
          state.initializationStatus = "success";
          state.gameState = action.payload;
        },
      )
      .addCase(postWord.pending, (state) => {
        state.postwordStatus = "loading";
        state.error = null;
      })
      .addCase(
        postWord.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.postwordStatus = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        postWord.fulfilled,
        (state, action: PayloadAction<GameState>) => {
          state.postwordStatus = "success";
          state.gameState = action.payload;
        },
      ),
});

/*------------------------------------------- Selectors -------------------------------------------*/
export const selectInitializationStatus = (state: RootState) =>
  state.game.initializationStatus;

export const selectPostWordStatus = (state: RootState) =>
  state.game.postwordStatus;

export const selectError = (state: RootState) => state.game.error;

export const selectGameState = (state: RootState) => state.game.gameState;

export default gameSlice.reducer;
export const { optimisticReset } = gameSlice.actions;
