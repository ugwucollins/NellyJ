import { useParams } from "react-router-dom";
import HeaderProp from "../../context/HeaderProp";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import OrderStatus from "./OrderStatus";
const TrackOrderById = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <HeaderProp
        LinkText1="Home"
        LinkPath="/tack-orders"
        LinkText2="Track Your Order"
        AnText="Track Your Order"
      />
      <OrderStatus orderID={id} />
      <div
        className={` w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 pb-3 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArryMap />
      </div>
    </div>
  );
};

export default TrackOrderById;
