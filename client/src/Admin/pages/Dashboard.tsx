import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";
import HomePage from "../Home/HomePage";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex mt-[68px] max-sm:mt-0">
        <Sidebar />
        <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
          <HomePage />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
