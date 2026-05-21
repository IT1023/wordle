import { nanoid } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../config/store";
import { addToast, removeToast, type IToast } from "./toast.slice";

export const addTempToast =
  (toast: Omit<IToast, "id">, ttl: number = 5000) =>
  (dispatch: AppDispatch): void => {
    const id = nanoid();
    dispatch(addToast({ id, ...toast }));
    setTimeout(() => {
      dispatch(removeToast(id));
    }, ttl);
  };
