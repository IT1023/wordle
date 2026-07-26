import { configureStore } from "@reduxjs/toolkit";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, test } from "vitest";
import Toast from "./Toast";
import toastSlice from "./toast.slice";

const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      toast: toastSlice,
    },
    preloadedState,
  });
  render(
    <Provider store={store}>
      <Toast />
    </Provider>,
  );
};

describe("<Toast />", () => {
  afterEach(() => {
    cleanup();
  });

  test("initial mount and no toast", () => {
    renderWithStore();
    const toasts = screen.getByTestId("toasts");
    expect(toasts).toBeInTheDocument();
    expect(toasts.childNodes).toHaveLength(0);
  });

  test("dispatching toasts", async () => {
    renderWithStore({
      toast: {
        toasts: [
          { id: "test_one", error: "ABORT", type: "warning" },
          { id: "test_two", error: "SYSTEM", type: "error" },
        ],
      },
    });
    const toasts = screen.getByTestId("toasts");
    expect(toasts).toBeInTheDocument();
    await waitFor(() => {
      expect(toasts.children).toHaveLength(2);
    });
  });
});
