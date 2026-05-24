import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { GameState } from "../../../shared/types";
import type { RootState } from "../../config/store";
import { gameStateSchema, wordSchema } from "../../../shared/schemas";
import z from "zod";

const responseSchema = z.object({
  game: gameStateSchema,
});

const base: string = import.meta.env.VITE_BASE_API_URL;

/*------------------------------------------- State -------------------------------------------*/
type Status = "idle" | "loading" | "failure" | "success";

export type Reject =
  | "ABORT"
  | "SYSTEM"
  | "DOWN"
  | "MISMATCH"
  | "INVALID"
  | "UNPROCESSABLE"
  | "RESOLVED";

export type LetterState = GameState["words"][number]["state"][number] | "idle";

type SliceState = {
  initializationStatus: Status;
  postwordStatus: Status;
  error: Reject | null;
  gameState: GameState | null;
  activeWord: string[];
  submittedLetters: Record<string, LetterState>;
};

const initialState: SliceState = {
  initializationStatus: "idle",
  postwordStatus: "idle",
  error: null,
  gameState: null,
  activeWord: [],
  submittedLetters: {},
};

/*------------------------------------------- Thunks -------------------------------------------*/

export const initiateGame = createAsyncThunk<
  GameState,
  void,
  { rejectValue: Reject }
>("initiate-game", async (_, { signal, rejectWithValue }) => {
  try {
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
  void,
  { rejectValue: Reject }
>("post-word", async (_, { signal, rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const { gameState, activeWord } = state.game;
    // checking if user tries to submit another word when game has already been resolved
    const { status } = gameState ?? {
      status: "running",
    };
    if (status === "won" || status === "failed")
      return rejectWithValue("RESOLVED");

    if (activeWord.length < 5) return rejectWithValue("INVALID");

    const postWord = { word: activeWord.join("") };

    // building request resource
    const argsParsed = wordSchema.safeParse(postWord);
    if (!argsParsed.success) return rejectWithValue("MISMATCH");
    const { word } = argsParsed.data;
    const url: URL = new URL("/word", base);
    const options: RequestInit = {
      method: "POST",
      signal,
      credentials: "include",
      body: JSON.stringify({ word }),
      headers: {
        "Content-Type": "application/json",
      },
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

export const resetGame = createAsyncThunk<
  GameState,
  void,
  { rejectValue: Reject }
>("reset/game", async (_, { signal, rejectWithValue }) => {
  try {
    const url: URL = new URL("/reset-game", base);
    const options: RequestInit = {
      method: "GET",
      signal,
      credentials: "include",
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      return rejectWithValue("DOWN");
    }
    const data = await response.json();
    const parsed = responseSchema.safeParse(data);
    if (!parsed.success) return rejectWithValue("MISMATCH");
    return parsed.data.game;
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
    // optimistic is for debugging only, as the game state is preserved through token in cookie
    optimisticReset: () => initialState,
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.activeWord.length >= 5) return;
      state.activeWord.push(action.payload);
    },
    popLetter: (state) => {
      state.activeWord = state.activeWord.slice(0, -1);
    },
    resetLetter: (state) => {
      state.activeWord = [];
    },
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
          const { words } = action.payload;
          const lastWord = words[words.length - 1];
          for (let i = 0; i < lastWord.word.length; i++) {
            const char = lastWord.word[i];
            if (state.submittedLetters[char] === "correct") continue;
            state.submittedLetters[char] = lastWord.state[i];
          }
          state.postwordStatus = "success";
          state.gameState = action.payload;
        },
      )
      .addCase(resetGame.pending, (state) => {
        state.initializationStatus = "loading";
        state.error = null;
      })
      .addCase(
        resetGame.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.initializationStatus = "failure";
          state.error = action.payload || "SYSTEM";
        },
      )
      .addCase(
        resetGame.fulfilled,
        (state, action: PayloadAction<GameState>) => {
          state.initializationStatus = "success";
          state.gameState = action.payload;
          state.submittedLetters = {};
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

export const selectActiveWord = (state: RootState) => state.game.activeWord;

export const selectSubmittedLetters = (state: RootState) =>
  state.game.submittedLetters;

export default gameSlice.reducer;
export const { optimisticReset, addLetter, popLetter, resetLetter } =
  gameSlice.actions;
