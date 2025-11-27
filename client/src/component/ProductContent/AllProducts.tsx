import { UserProduct } from "../../context/ProductContext";
import TextAnimation, { YSlideIn } from "../Animation";
import { motion } from "framer-motion";
import { Category } from "../assets";
import ProductCards from "./ProductCards";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PagenationFun } from "../../context/pagenation";
import Loader from "../../context/Loader";

const AllProducts = () => {
  return (
    <div>
      <ProductHeader />
    </div>
  );
};

export default AllProducts;

export const ProductHeader = () => {
  const { category: cartegory, setcategory, products }: any = UserProduct();
  const [current, setcurrent] = useState(1);
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center text-center">
        <div className="w-full flex pb-16 justify-center items-center text-center flex-col">
          <div
            className={`bg-primary1 dark:bg-gray-900 dark:shadow-gray-700 dark:shadow-lg drop-shadow-md min-h-[30vh] flex text-center justify-center items-center flex-col w-full`}
          >
            <>
              {TextAnimation(
                "-- Our Foods --",
                20,
                0.3,
                "flex  gap-1 flex-wrap px-8",
                "text-[min(2vw,13px)] font-bold"
              )}
            </>
            <h1 className="">
              {TextAnimation(
                "Our  Menu",
                -22,
                0.2,
                "flex  gap-1 flex-wrap",
                "text-[min(10vw,30px)] font-bold"
              )}
            </h1>

            <div className="flex gap-1 flex-wrap">
              <Link to={"/"}>
                <p className=" cursor-pointer font-bold capitalize">Home/</p>
              </Link>
              <Link to={"/product"}>
                <p className=" cursor-pointer font-bold capitalize text-blue-900">
                  Menu
                </p>
              </Link>
            </div>
          </div>

          <div
            className={`w-full pt-10 max-sm:justify-center  px-20 max-md:px-16 max-sm:px-5 max-[170px]:px-1 items-center align-middle text-center capitalize flex gap-5  flex-wrap flex-row`}
          >
            {Category.map((item: any, index: number) => (
              <motion.div
                variants={YSlideIn(100, index, 0.5, 0.5)}
                whileInView={"show"}
                initial={"hidden"}
                whileHover={{
                  scale: 1.15,
                }}
                key={item._id}
                onClick={() => {
                  setcategory(item.path);
                }}
                className={`px-5 py-2 cursor-pointer  dark:outline dark:outline-white  ${
                  item.path === cartegory
                    ? "bg-secondary font-bold text-primary rounded-full dark:bg-primary1 dark:text-secondary dark:font-bold"
                    : "rounded-lg hover:bg-secondary hover:text-primary font-semibold outline outline-1"
                }`}
              >
                <p>{item.title}</p>
              </motion.div>
            ))}
          </div>

          {products &&
            !products.length &&
            !PagenationFun(products, 8, current).datas.length && (
              <div className="w-full flex items-center justify-center max-sm:mt-[150px] mt-[200px] ">
                <Loader />
              </div>
            )}

          <div className="flex overflow-hidden flex-row pb-10 py-8 px-16 gap-8 max-md:gap-4 max-sm:px-10 max-[170px]:px-1 max-[400px]:px-3 flex-wrap h-auto w-full justify-start max-[735px]:justify-center">
            {PagenationFun(products, 8, current)
              .datas.filter(
                (item: any) =>
                  (item &&
                    item.category.toLowerCase() === cartegory.toLowerCase()) ||
                  cartegory === ""
              )
              .map((item: any, index: number) => (
                <ProductCards product={item} index={index} key={index} />
              ))}
          </div>

          <div className="flex w-full  bg-slate-300 dark:bg-yellow-50/10 justify-center items-center gap-3">
            {PagenationFun(products, 8, current).pages.map(
              (no: any) =>
                no && (
                  <div
                    key={no}
                    onClick={() => setcurrent(no)}
                    className={`w-10 h-1 cursor-pointer rounded-2xl bg-secondary ${
                      current === no
                        ? "bg-yellow-800 dark:bg-yellow-800"
                        : "bg-secondary dark:bg-primary1"
                    }`}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
