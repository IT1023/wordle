import { useTranslation } from "react-i18next";
import type { TLanguages } from "../../config/i18n";
import { useEffect } from "react";

export default function Language() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  }, [i18n.language, t]);

  return (
    <select
      name="languages"
      id="languages"
      className="border-2 px-3 py-1 rounded-md cursor-pointer"
      onChange={(e) => i18n.changeLanguage(e.target.value as TLanguages)}
      value={i18n.language}
    >
      <option value="en">🇺🇸</option>
      <option value="ja">🇯🇵</option>
    </select>
  );
}
