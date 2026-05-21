import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Reject } from "../game/game.slice";
import type { RootState } from "../../config/store";

export interface IToast {
  id: string;
  error: Reject;
  type: "warning" | "error" | "info";
}

interface ToastState {
  toasts: IToast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast/slice",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<IToast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.toasts = state.toasts.filter((t) => t.id !== id);
    },
  },
});

export const selectToasts = (state: RootState) => state.toast.toasts;

export default toastSlice.reducer;
export const { addToast, removeToast } = toastSlice.actions;
