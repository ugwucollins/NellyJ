import { Link } from "react-router-dom";
import { lazy, useState } from "react";
import toast from "react-hot-toast";
import { buttonClassName } from "../Animation";
const InputField = lazy(() => import("../../context/InputField"));

const PasswordM = () => {
  const [password, setpassword] = useState("");
  const [Newpassword, setNewpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");

  const handleSubumit = (e: any) => {
    e.preventDefault();
    if (Newpassword.trim() && Confirmpassword.trim() && password.trim()) {
      if (password === Newpassword) {
        toast.error("Password Already Exist, Please Add A new One");
      }

      if (Newpassword === Confirmpassword) {
        console.log("yes");
        setConfirmpassword("");
        setNewpassword("");
        setpassword("");
        toast.success("Password Has been Changed successfully");
      } else {
        console.log("NO");
        toast.error("New Password and Confirm Password must Match", {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Please Enter The Correct Password");
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full gap-y-4">
        <div className="relative">
          <InputField
            label="Password*"
            type="password"
            value={password}
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <Link to={""}>
            <p className="font-semibold hover:font-bold text-sm underline w-full transition-all duration-200 text-right py-3">
              Forgot Password?
            </p>
          </Link>
        </div>

        <form onSubmit={handleSubumit} className="flex flex-col gap-4">
          <InputField
            label="New Password*"
            type="password"
            value={Newpassword}
            name="Newpassword"
            placeholder="Enter Password"
            onChange={(e) => setNewpassword(e.target.value)}
          />

          <InputField
            label="Confirm New Password*"
            type="password"
            value={Confirmpassword}
            name="Confirmpassword"
            placeholder="Enter Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          <div className="w-full justify-start py-2">
            <button
              type="submit"
              disabled={!Newpassword || !Confirmpassword}
              className={`outline-1 disabled:line-through disabled:text-sm font-medium hover:font-semibold ${buttonClassName}`}
            >
              <p>Update Password</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordM;
