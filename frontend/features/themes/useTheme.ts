import { useEffect, useMemo, useState } from "react";
import { throttle } from "../../shared/lib/constants";

const THEME_STORAGE_KEY = "theme";

type TTheme = "light" | "dark";

interface UseThemeProps {
  THROTTLE_DELAY?: number;
}

export interface UseThemeReturns {
  currentTheme: TTheme;
  toggleTheme: () => void;
}

const fetchInitialTheme = (): TTheme => {
  try {
    const localTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (localTheme && ["light", "dark"].includes(localTheme))
      return localTheme as TTheme;
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (matchMedia.matches) return "dark";
    return "light";
  } catch (err) {
    console.log(err);
    return "light";
  }
};

export default function useTheme(props: UseThemeProps | void): UseThemeReturns {
  const [currentTheme, setCurrentTheme] = useState<TTheme>(fetchInitialTheme);
  const { THROTTLE_DELAY = 1000 } = props || { THROTTLE_DELAY: 1000 };

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
      document.documentElement.classList.toggle(
        "dark",
        currentTheme === "dark",
      );
    } catch (err) {
      console.warn(err);
    }
  }, [currentTheme]);

  const toggleTheme = useMemo(
    () =>
      throttle(
        () =>
          setCurrentTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark",
          ),
        THROTTLE_DELAY,
      ),
    [THROTTLE_DELAY],
  );

  return { currentTheme, toggleTheme };
}
