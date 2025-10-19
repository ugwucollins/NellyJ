import SellerDashboard from "../DashboardFolder/SellerDashboard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex mt-[68px] max-sm:mt-0">
        <Sidebar />
        <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
          <SellerDashboard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
