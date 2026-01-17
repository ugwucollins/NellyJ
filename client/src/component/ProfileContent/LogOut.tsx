import { useState } from "react";
import { UserAuth } from "../../context/UserContext";
import { buttonClassName } from "../Animation";
import Modal from "../../context/Modal";
import { LuLogOut } from "react-icons/lu";
import { UserAuthInfo } from "../../App";

const LogOut = () => {
  const { LogOut }: any = UserAuth();
  const { user }: any = UserAuthInfo();

  const [open, setOpen] = useState<boolean>(false);

  function handleToggle() {
    setOpen(!open);
  }
  function handleAction() {
    setOpen(!open);
    LogOut();
  }

  return (
    <div>
      <h1 className="font-bold text-xl">LogOut</h1>
      <p className="font-semibold text-base opacity-75">
        Are you sure you want to Log Out?
      </p>

      <button
        onClick={handleToggle}
        className={`outline-1 my-4 px-5 py-3 ${buttonClassName}`}
      >
        <p>Yes, LogOut</p>
      </button>

      {open && (
        <div>
          <Modal
            Title={
              user?.firstName.toString().toLocaleUpperCase() +
              ", " +
              "Are you sure you want to logOut"
            }
            Icon={<LuLogOut />}
            CancelBtn="No"
            Progress={handleAction}
            OkayBtn="Yes"
            Cancel={handleToggle}
          />
        </div>
      )}
    </div>
  );
};

export default LogOut;
