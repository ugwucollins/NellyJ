import { Link } from "react-router-dom";
import { buttonClassName } from "../../component/Animation";
import AdminChiefsCard from "./AdminChiefsCard";
import { ModelForm } from "../sellers/CreateSeller";
import AddChief from "./AddChief";
import { BiPlus } from "react-icons/bi";
import { UserAdminAuth } from "../context/AdminContext";

const AllChiefs = () => {
  const { teams, open, setOpen }: any = UserAdminAuth();

  function handleClose() {
    setOpen(!open);
  }
  return (
    <div>
      <div className="bg-primary max-[170px]:px-1 py-4 px-2 max-md:px-10 max-sm:px-5 dark:text-primary1 min-h-[95vh] dark:bg-secondary">
        <div className="flex flex-col w-full">
          <div
            className={`flex justify-between px-3 flex-wrap gap-2 pb-5 gap-y-4 items-center ${
              teams.length === 0 ? "pt-0" : "pt-10"
            }`}
          >
            <h1 className="text-[min(5vw,32px)] font-bold">
              Meet With Our Team
            </h1>

            <Link to={``}>
              <button
                onClick={() => setOpen(!open)}
                className={`ml-2 whitespace-nowrap ${buttonClassName}`}
              >
                <div className="flex gap-0.5 items-center text-center">
                  <BiPlus className="text-xl pt-1" />
                  <p>Create Team</p>
                </div>
              </button>
            </Link>
          </div>
          <AdminChiefsCard />
        </div>
      </div>
      {open && (
        <ModelForm onClose={handleClose}>
          <AddChief />
        </ModelForm>
      )}
    </div>
  );
};

export default AllChiefs;
