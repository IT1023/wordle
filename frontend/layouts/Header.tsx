import { useTranslation } from "react-i18next";
import Language from "../features/languages/Language";
import Burger from "../features/menu/Burger";
import Menu from "../features/menu/Menu";
import Modal from "../features/menu/Modal";
import Theme from "../features/themes/Theme";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="w-screen h-14 flex justify-center border-b-2 border-[#DFDFDF] dark:border-[#424242]">
      <div className="w-full h-full max-w-7xl flex justify-between items-center px-4">
        <div className="h-full flex items-center">
          <Modal trigger={<Burger />} component={<Menu />} />
          <div className="logo h-full aspect-video p-1 flex justify-center overflow-hidden">
            <img className="h-full" src="img/logo.png" alt={t("logo")} />
          </div>
        </div>
        <div className="h-[60%] flex items-center gap-4 dark:text-white">
          <Theme />
          <Language />
        </div>
      </div>
    </header>
  );
}
