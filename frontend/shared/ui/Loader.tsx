import { HashLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="loader w-full h-full flex justify-center items-center">
      <HashLoader color="#e74c3c" />
    </div>
  );
}
