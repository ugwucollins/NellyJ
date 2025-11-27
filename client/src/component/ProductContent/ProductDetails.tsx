import { Link, NavLink, useParams } from "react-router-dom";
import TextAnimation from "../Animation";
import { currency, UserProduct } from "../../context/ProductContext";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import ProductCards from "./ProductCards";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import { UserAuth } from "../../context/UserContext";
import toast from "react-hot-toast";
import { UseSaveAuth } from "../../context/WishListContext";
import {
  BsHeart,
  BsHeartFill,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import Loader from "../../context/Loader";
import { UserAuthInfo } from "../../App";

const ProductDetails = () => {
  const { id: _id }: any = useParams();
  const { products }: any = UserProduct();
  const product = products && products.find((item: any) => item._id === _id);

  const [eachProduct, seteachProduct] = useState(product && product);
  seteachProduct;

  const RelatedProduct =
    products &&
    products.filter(
      (item: any) =>
        item &&
        item.category === eachProduct &&
        eachProduct.category.toLowerCase()
    );

  return (
    <div className="pb-10 min-h-screen flex flex-col justify-center items-center w-full px-0">
      <ProductDetailsHeader eachProduct={eachProduct} />
      <ProductDisplay
        eachProduct={eachProduct}
        RelatedProduct={RelatedProduct}
      />
    </div>
  );
};

export default ProductDetails;

export const ProductDetailsHeader = ({ eachProduct }: any) => {
  return (
    <div
      className={`bg-primary1 relative pb-10 dark:bg-gray-900 dark:shadow-gray-700 dark:shadow-lg drop-shadow-md min-h-[30vh] flex text-center justify-center items-center flex-col w-full`}
    >
      <Link to={"/product"}>
        <button className="font-bold w-auto mt-3 text-secondary absolute left-4 top-0">
          <div className="flex px-4 rounded-3xl shadow-md drop-shadow-lg py-2 items-center font-bold bg-white">
            <BiArrowBack /> Back
          </div>
        </button>
      </Link>

      <h1 className="pt-5">
        {TextAnimation(
          "Our  Menu",
          -22,
          0.2,
          "flex  gap-1 flex-wrap",
          "text-[min(10vw,30px)] font-bold"
        )}
      </h1>

      <div className="flex gap-1 justify-center items-center text-center flex-wrap">
        <NavLink to={"/"}>
          <span className=" cursor-pointer font-bold capitalize">Home/</span>
        </NavLink>
        <NavLink to={"/product"}>
          <span className=" cursor-pointer font-bold capitalize">Menu/</span>
        </NavLink>
        <p className="cursor-pointer font-bold capitalize">
          {eachProduct && eachProduct.category}/
        </p>
        <NavLink to={`/product/${eachProduct && eachProduct._id}`}>
          <span className=" cursor-pointer font-bold capitalize text-blue-900">
            Product Details
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export const ProductDisplay = ({ eachProduct, RelatedProduct }: any) => {
  const { AddtoCart, promo }: any = UserProduct();
  const { router }: any = UserAuth();
  const { user }: any = UserAuthInfo();
  const { saveItem, AddsaveItem, RemovesavedItem }: any = UseSaveAuth();

  return (
    <>
      <div className="flex flex-col px-20 py-8 max-md:px-16 max-sm:px-5 max-[170px]:px-1 justify-center w-full text-left items-center">
        <div className="flex w-full pb-10 max-sm:flex-wrap justify-center gap-5 gap-y-10 items-center">
          <div className="w-[60%] max-lg:w-[80%] max-md:w-full px-20 max-[1200px]:px-2 flex justify-end max-sm:justify-start bg-primary1/50 rounded-2xl py-2">
            <div className=" h-[450px] w-full relative">
              {/* max-w-[min(30vw,250px)] */}
              <div
                className={`absolute top-3 right-4 p-2 text-center w-fit  cursor-pointer m-0 rounded-full text-xl ${
                  saveItem[eachProduct && eachProduct._id]
                    ? "bg-neutral-100 text-red-800"
                    : "bg-white text-black"
                }`}
              >
                {saveItem[eachProduct && eachProduct._id] ? (
                  <BsHeartFill
                    onClick={() =>
                      user
                        ? RemovesavedItem(eachProduct && eachProduct._id)
                        : toast.error("Please Login and Continue")
                    }
                  />
                ) : (
                  <BsHeart
                    onClick={() =>
                      user
                        ? AddsaveItem(eachProduct && eachProduct._id)
                        : toast.error("Please Login and Continue")
                    }
                  />
                )}
              </div>
              <img
                src={
                  (eachProduct && eachProduct.imageUrl) ||
                  (eachProduct && eachProduct.image)
                }
                loading="lazy"
                className="rounded-3xl w-full h-full"
                alt={eachProduct && eachProduct.name + "photo"}
              />
            </div>
          </div>

          <div className="flex w-full gap-1 flex-col text-left">
            <div className="flex items-center flex-wrap gap-2">
              <p className="font-bold text-lg">
                {eachProduct && eachProduct.name}
              </p>
              <span className="px-4 w-auto outline outline-1 font-bold bg-blue-100 outline-blue-900 py-1.5 rounded-full dark:text-secondary dark:bg-blue-200">
                {eachProduct && eachProduct.instock
                  ? "instock"
                  : "Out of stock"}
              </span>
            </div>

            <div className="flex font-bold text-lg flex-row text-yellow-800">
              {(eachProduct && eachProduct.icon === 5) || "5" ? (
                <>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </>
              ) : eachProduct.icon === 4 || "4" ? (
                <>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStar />
                </>
              ) : eachProduct.icon === 3 || "3" ? (
                <>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStar />
                  <BsStar />
                </>
              ) : eachProduct.icon === 2 || "2" ? (
                <>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStar />
                  <BsStar />
                  <BsStar />
                </>
              ) : eachProduct.icon === 1 || "1" ? (
                <>
                  <BsStarFill />
                  <BsStar />
                  <BsStar />
                  <BsStar />
                  <BsStar />
                </>
              ) : (
                <>
                  <BsStarHalf />
                  <BsStar />
                  <BsStar />
                  <BsStar />
                  <BsStar />
                </>
              )}
            </div>
            <div className="font-bold text-lg py-4 pt-8">
              MRP:&nbsp;
              {promo && eachProduct && eachProduct.offerprice && (
                <span> {eachProduct && eachProduct.offerprice}</span>
              )}
              <span className={`${promo && "line-through"}`}>
                {currency}
                {eachProduct && eachProduct.price}
              </span>
            </div>

            <h2 className="text-lg font-bold pt-2">About Product</h2>
            <div className="flex text-left flex-col gap-y-1 pt-2 opacity-80 font-semibold text-balance">
              {eachProduct &&
                eachProduct.description.map((text: any, index: number) => (
                  <p key={index}>{text}</p>
                ))}
            </div>
            <div className="flex w-full pt-10 pb-2 max-[400px]:flex-wrap flex-row gap-4 items-center justify-start">
              <div className="flex w-full flex-row items-center gap-4">
                {/* <div className="flex w-[40%]  gap-0.5 items-center flex-row">
                <p className="outline outline-1 p-2 font-bold rounded-l-3xl">
                  <GrSubtract className="text-xl" />
                </p>
                <p className="outline outline-1 px-2 py-1.5 font-bold">
                  <span>4</span>
                </p>
                <p className="outline outline-1 p-2 font-bold rounded-r-3xl">
                  <BiPlus className="text-xl" />
                </p>
              </div> */}
                <button
                  disabled={eachProduct && !eachProduct.instock}
                  onClick={() => {
                    if (user) {
                      AddtoCart(eachProduct && eachProduct._id);
                    } else {
                      toast.error("Please Login First");
                    }
                  }}
                  className="py-4 w-full bg-gray-200 text-secondary outline outline-2 outline-gray-50 disabled:line-through font-bold rounded-lg"
                >
                  <p>Add to Cart</p>
                </button>
              </div>

              <NavLink
                to={`${
                  eachProduct && eachProduct.instock && user ? "/cart" : ""
                }`}
                onClick={() => {
                  if (user) {
                    AddtoCart(eachProduct && eachProduct._id);
                  } else {
                    toast.error("Please Login First");
                    router("/auth/sigin");
                  }
                }}
                className={"w-full"}
              >
                <button
                  disabled={eachProduct && !eachProduct.instock}
                  className="py-4 bg-secondary dark:outline text-white disabled:bg-secondary/80 disabled:line-through font-bold rounded-lg w-full flex justify-center text-center items-center
              "
                >
                  <span>
                    {" "}
                    {eachProduct && eachProduct.instock
                      ? "Buy Now"
                      : "Out of stock"}
                  </span>
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="w-full mt-20 py-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-sm shadow text-balance font-semibold">
            Related Products
          </h1>
          <h1 className="pb-10">
            {TextAnimation(
              "Explore Related Products",
              -22,
              0.2,
              "flex  gap-1 flex-wrap",
              "text-[min(10vw,30px)] text-balance font-bold"
            )}
          </h1>

          {RelatedProduct.length ? (
            <div className="flex overflow-hidden flex-row pt-8 px-16 gap-8 max-md:gap-4 max-sm:px-10 max-[170px]:px-1 max-[400px]:px-3 flex-wrap h-auto w-full justify-center">
              {RelatedProduct.slice(0, 4).map((item: any, index: number) => (
                <ProductCards product={item} index={index} key={index} />
              ))}
            </div>
          ) : (
            <>
              <Loader />
              <h1 className="text-2xl font-bold darK:text-primary text-secondary">
                Loading ...
              </h1>
            </>
          )}
        </div>

        <div className="w-full flex justify-end pr-8">
          <Link to={"/product"}>
            <button className=" capitalize px-6 py-3 my-2 dark:bg-neutral-600 bg-secondary text-primary font-semibold hover:font-bold hover:rounded-full rounded-md">
              <p>See more</p>
            </button>
          </Link>
        </div>
      </div>

      <div
        className={` w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArryMap />
      </div>
    </>
  );
};
