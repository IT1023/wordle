import { describe, beforeEach, afterEach, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Language from "./Language";

describe("<Language />", () => {
  let select: HTMLElement;
  beforeEach(() => {
    localStorage.clear();
    render(<Language />);
    select = screen.getByRole("combobox");
  });
  afterEach(() => {
    cleanup();
  });

  test("status at mount point", () => {
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("en");
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);

    const { values, labels } = (options as HTMLOptionElement[]).reduce(
      (acc: { values: string[]; labels: string[] }, val: HTMLOptionElement) => {
        acc["values"].push(val.getAttribute("value") ?? "");
        acc["labels"].push(val.textContent ?? "");
        return acc;
      },
      { values: [], labels: [] },
    );
    expect(values).toEqual(["en", "ja"]);
    expect(labels).toEqual(["🇺🇸", "🇯🇵"]);
  });

  test("on language change", async () => {
    userEvent.setup();
    await userEvent.selectOptions(select, "ja");
    expect(select).toHaveValue("ja");
    expect(document.title).toBe("ワードル");
  });
});
