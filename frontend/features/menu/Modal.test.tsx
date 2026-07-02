import { afterEach, beforeEach, describe, expect, test } from "vitest";
import type { UseModalReturn } from "./useModal";
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import useModal from "./useModal";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

describe("<Modal />", () => {
  beforeEach(() => {
    render(<Modal trigger={<div>Open</div>} component={<nav>Menu</nav>} />);
  });

  afterEach(() => {
    cleanup();
  });

  test("component at mount point", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  test("menu behavior", async () => {
    // opening menu
    userEvent.setup();
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // closing menu on click outside
    fireEvent.click(document.body);
    await waitFor(() =>
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument(),
    );

    // testing on keydown
    await userEvent.click(screen.getByRole("button"));
    fireEvent.keyDown(window, {
      key: "Escape",
    });
    await waitFor(() =>
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument(),
    );
  });
});

describe("useModal.ts", () => {
  let result: { current: UseModalReturn };
  beforeEach(() => {
    result = renderHook(() => useModal()).result;
  });

  afterEach(() => {
    cleanup();
  });

  test("hook at mount point", () => {
    expect(result.current.isOpen).toBe(false);
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpen).toBe(true);
  });
});
