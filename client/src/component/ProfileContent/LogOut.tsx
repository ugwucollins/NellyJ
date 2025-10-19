import { UserAuth } from "../../context/UserContext";
import { buttonClassName } from "../Animation";

const LogOut = () => {
  const { LogOut }: any = UserAuth();
  return (
    <div>
      <h1 className="font-bold text-xl">LogOut</h1>
      <p className="font-semibold text-base opacity-75">
        Are you sure you want to Log Out?
      </p>

      <button
        onClick={LogOut}
        className={`outline-1 my-4 px-5 py-3 ${buttonClassName}`}
      >
        <p>Yes, LogOut</p>
      </button>
    </div>
  );
};

export default LogOut;
