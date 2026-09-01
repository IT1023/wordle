import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function Burger() {
  const { t } = useTranslation("common");
  return (
    <button
      aria-label={t("openMenu")}
      className="w-fit h-full flex items-center cursor-pointer hover:scale-110 transition-all duration-400 text-black dark:text-white"
    >
      <FontAwesomeIcon icon={faBars} fontSize={22} />
    </button>
  );
}
