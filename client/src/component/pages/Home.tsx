import { lazy } from "react";
const HomeBanner = lazy(() => import("../HomeContent/HomeBanner"));

const Home = () => {
  return (
    <div className="relative w-full">
      <HomeBanner />
    </div>
  );
};

export default Home;
