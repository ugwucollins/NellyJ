import { BiX } from "react-icons/bi";
import HeaderProp from "../../context/HeaderProp";
import { currency, UserProduct } from "../../context/ProductContext";
import { EmptyItems } from "../ShoppingCart";
import { useEffect, useState } from "react";
import { UseSaveAuth } from "../../context/WishListContext";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import { buttonClassName } from "../Animation";
import { BsCassetteFill } from "react-icons/bs";
import DateFormater from "../../context/DateFormat";

const WishList = () => {
  return (
    <div>
      <HeaderProp
        AnText="WishList"
        LinkPath="/wishlist"
        LinkText1="Home"
        LinkText2="Saved"
      />
      <ShowSavedItems />
      <div className={` dark:max-sm:-mt-0 max-sm:-mt-20 ${DarkModeClass}`}>
        <FeatureArryMap />
      </div>
    </div>
  );
};

export default WishList;

export const ShowSavedItems = () => {
  const { AddtoCart, products }: any = UserProduct();
  const { saveItem, RemovesavedItem }: any = UseSaveAuth();
  const [savedArray, setsavedArray] = useState([]);

  const getTotalSavedItems = () => {
    let temSaved: any = [];
    for (const key in saveItem) {
      const Items = products.find((item: any) => item._id === key);
      temSaved.push(Items);
    }
    setsavedArray(temSaved);
  };

  useEffect(() => {
    getTotalSavedItems();
  }, [saveItem]);

  return (
    <div className="w-full overflow-hidden gap-8 py-10 flex items-center flex-col justify-center px-16 max-md:px-10 mb-5 max-sm:px-8 max-[200px]:px-1 max-[750px]:flex-col">
      <div className="flex w-full gap-y-7  items-center justify-center gap-x-2 flex-row max-sm:flex-col">
        <div className="overflow-hidden  w-full">
          <div className="flex flex-col gap-2 overflow-auto px-2 py-2">
            <table className="w-full overflow-auto">
              <thead className="text-left bg-yellow-700 px-4 py-6 capitalize h-10 rounded-3xl w-full">
                <th className="pl-2">Product</th>
                <th>price</th>
                <th className="pl-2.5">Date Added</th>
                <th>stock Status</th>
                <th className="pr-2 text-end">Action</th>
              </thead>
              <tbody className="w-full overflow-x-auto">
                {savedArray.map((item: any, index: number) => {
                  const even = index % 2 === 0;
                  return (
                    <tr key={index}>
                      <td className="pr-4">
                        <div className="flex w-full items-center justify-start gap-2 py-2">
                          <BiX
                            className="text-3xl cursor-pointer"
                            onClick={() => RemovesavedItem(item._id)}
                          />
                          <div
                            className={`bg-neutral-100  p-4 rounded-md w-20 ${
                              even
                                ? "dark:bg-neutral-600"
                                : "dark:bg-neutral-300"
                            }`}
                          >
                            <img
                              src={item && item.image}
                              className="size-12 rounded-md object-cover"
                              alt={`${item.name} photo`}
                            />
                          </div>
                          <div className="whitespace-nowrap">
                            <p className="font-semibold text-base capitalize">
                              {item.name}
                            </p>
                            <span className="text-sm font-semibold opacity-60 capitalize">
                              Instock:{" "}
                              {item.instock === true ? "true" : "false"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="pr-4">
                        <div className="flex gap-0.5 items-center font-semibold text-base w-full whitespace-nowrap">
                          <p>{currency}</p>
                          <span> {item.price}</span>
                        </div>
                      </td>

                      <td className="pr-4 pl-2">
                        <div className=" opacity-80 capitalize font-semibold text-base whitespace-nowrap">
                          {DateFormater({
                            date: item && item.createdAt,
                            monthType: "short",
                          })}
                        </div>
                      </td>

                      <td className="pr-1 max-sm:pr-10  pl-2 whitespace-nowrap">
                        <div className="font-semibold text-base whitespace-nowrap">
                          <span
                            className={`${
                              item.instock ? "text-teal-800" : "text-red-800"
                            }`}
                          >
                            {item.instock ? "Instock" : "OutStock"}
                          </span>
                        </div>
                      </td>

                      <td className="pl-2 text-end pr-1">
                        <div className="w-full whitespace-nowrap">
                          <button
                            disabled={!item.instock}
                            onClick={() => AddtoCart(item._id)}
                            className={` disabled:line-through disabled:opacity-85 text-sm outline-1 ${buttonClassName}`}
                          >
                            <p>Add to Cart</p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!savedArray.length && (
              <EmptyItems
                title="No Saved Items"
                icon={<BsCassetteFill />}
                LinkPath="/product"
                Text="Save More Items"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
