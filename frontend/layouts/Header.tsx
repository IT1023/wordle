import Language from "../features/languages/Language";
import Burger from "../features/menu/Burger";
import Menu from "../features/menu/Menu";
import Modal from "../features/menu/Modal";
import Theme from "../features/themes/Theme";

export default function Header() {
  return (
    <header className="w-screen h-14 flex justify-center border-b-2 border-[#DFDFDF] dark:border-[#424242]">
      <div className="w-full h-full max-w-7xl flex justify-between items-center px-4">
        <Modal trigger={<Burger />} modal={<Menu />} />
        <div className="h-[60%] flex items-center gap-4 dark:text-white">
          <Theme />
          <Language />
        </div>
      </div>
    </header>
  );
}
