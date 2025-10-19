import { UserAdminAuth } from "../context/AdminContext";

const Dashboard = () => {
  const { admin, HandleLogOut }: any = UserAdminAuth();

  return (
    <div className="p-4">
      <h1 className="capitalize font-bold py-1">
        Dashboard {admin && admin.email.split("@gmail.com")}
      </h1>

      <button
        onClick={HandleLogOut}
        className="px-6 py-3 bg-red-800 rounded-lg hover:rounded-full text-white font-semibold hover:font-bold shadow-md hover:shadow-lg hover:bg-transparent hover:outline hover:outline-2 hover:outline-red-800 hover:text-red-800 transition-all duration-200"
      >
        <p>LogOut</p>
      </button>
    </div>
  );
};

export default Dashboard;
