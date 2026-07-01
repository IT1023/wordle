import { cleanup, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import Theme from "./Theme";
import type { UseThemeReturns } from "./useTheme";
import useTheme from "./useTheme";
import { act } from "react";

describe("<Theme />", () => {
  let button: HTMLButtonElement;
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("theme", "dark");
    render(<Theme />);
    button = screen.getByRole("button");
    userEvent.setup();
  });
  afterEach(() => {
    cleanup();
  });

  test("testing button and default theme at mount point", () => {
    expect(button).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
  });

  test("testing toggling theme, throttle and then toggling theme again", async () => {
    // switching to light mode
    await userEvent.click(button);
    expect(document.documentElement).not.toHaveClass("dark");

    // testing throttle
    await userEvent.click(button);
    expect(document.documentElement).not.toHaveClass("dark");

    // testing toggling back to dark mode
    await new Promise((res) => setTimeout(() => res("done"), 1100));
    await userEvent.click(button);
    expect(document.documentElement).toHaveClass("dark");
  });
});

describe("useTheme.ts", () => {
  let result: { current: UseThemeReturns };
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("theme", "dark");
    result = renderHook(() => useTheme()).result;
  });

  test("initial value", () => {
    expect(result.current.currentTheme).toBe("dark");
    act(() => result.current.toggleTheme());
    expect(result.current.currentTheme).toBe("light");
  });
});
