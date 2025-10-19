import Products from "../ProductContent/Products";
import SecondBanner from "./SecondBanner";
import {
  DarkModeClass,
  FeatureArryMap,
  VideoCom,
  VideoHeader,
} from "./HomeExportComponent";
import FlashSaleTimer from "../FlashSales/FlashSaleTimer";
import { UserProduct } from "../../context/ProductContext";
import ChiefSection from "./ChiefSection";
import Testimonial from "./Testimonial";
import NewsLetter from "./NewsLetter";
import { Link } from "react-router-dom";
import { buttonClassName } from "../Animation";
import { UserAuth } from "../../context/UserContext";

const HomeBanner = () => {
  const { promo }: any = UserProduct();
  const { user }: any = UserAuth();
  return (
    <>
      {!user && (
        <div className="fixed bottom-5 right-10 z-40">
          <Link to={"/faqs"}>
            <button className={buttonClassName}>
              <p>FAQs</p>
            </button>
          </Link>
        </div>
      )}

      {/* First Banner */}
      <div className="min-h-[90vh] max-[900px]:min-h-[120vh] max-[328px]:min-h-screen w-full  absolute">
        <div className="absolute w-full h-full z-[1] dark:bg-secondary dark:opacity-90 bg-black opacity-75" />
        <VideoCom className="absolute z-0 w-full h-full object-cover object-center" />
      </div>

      {/* Header Banner */}
      <VideoHeader />

      {/* second Banner */}
      <div
        className={` w-full py-2 overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArryMap />
      </div>

      {/* Product Banner */}
      <div className="py-4 w-full h-auto min-h-screen bg-primary1 dark:bg-transparent">
        <Products />
      </div>

      {/* KeyFeature Banner */}
      <SecondBanner />

      {/* Promo Section Banner */}
      {promo && <FlashSaleTimer />}

      {/* Chiefs Sections */}
      <ChiefSection />

      {/* Testimonial Sections */}
      <Testimonial />

      {/* NewsLetter Sections */}
      <NewsLetter />
    </>
  );
};

export default HomeBanner;
