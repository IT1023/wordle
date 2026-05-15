import Language from "../features/languages/Language";
import Theme from "../features/themes/Theme";

export default function Header() {
  return (
    <header className="w-screen h-14 flex justify-between items-center px-6 border-b-2 border-[#DFDFDF] dark:border-[#424242]">
      <div></div>
      <div className="h-[60%] flex items-center gap-4 dark:text-white">
        <Theme />
        <Language />
      </div>
    </header>
  );
}
