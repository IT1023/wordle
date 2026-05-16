import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Burger() {
  return (
    <div className="w-fit h-full flex items-center cursor-pointer hover:scale-110 transition-all duration-400 text-black dark:text-white">
      <FontAwesomeIcon icon={faBars} fontSize={22} />
    </div>
  );
}
