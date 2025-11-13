import { BiPlus } from "react-icons/bi";
import { currency, UserProduct } from "../../context/ProductContext";
import { GrSubtract } from "react-icons/gr";
import { motion } from "framer-motion";
import TextAnimation, {
  checkEvenNumbers as even,
  XSlideIn,
} from "../Animation";
import { NotAuth, UserAuth } from "../../context/UserContext";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { UseSaveAuth } from "../../context/WishListContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const ProductCards = ({ product, index }: any) => {
  const { AddtoCart, cartItem, RemoveFromeCart }: any = UserProduct();
  const { saveItem, AddsaveItem, RemovesavedItem }: any = UseSaveAuth();
  const { user }: any = UserAuth();
  const [open, setopen] = useState<boolean>();

  return (
    product && (
      <motion.div
        variants={XSlideIn(even(index) ? 150 : -150, 0.5, index && index, 0.5)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full max-w-[18.5rem] max-sm:max-w-xs"
      >
        <div>
          <NavLink to={`${open ? `/product/${product?._id}` : ""}`}>
            <div
              onClick={() => {
                setopen(true);
              }}
              className="w-full shadow-lg rounded-3xl hover:shadow-xl transition-all duration-200 hover:drop-shadow-2xl drop-shadow-md relative px-2 py-3 ml-1 max-w-xs text-left"
            >
              <div className="relative flex justify-center items-center w-full h-full max-w-[19rem] max-h-[14rem]">
                <div
                  className={`absolute top-3 right-4 p-2 text-center w-fit  cursor-pointer m-0 rounded-full text-xl ${
                    saveItem[product && product?._id]
                      ? "bg-neutral-100 text-red-800"
                      : "bg-white text-black"
                  }`}
                >
                  {saveItem[product && product?._id] ? (
                    <BsHeartFill
                      onClick={() =>
                        user
                          ? RemovesavedItem(product?._id)
                          : toast.error("Please Login and Continue")
                      }
                    />
                  ) : (
                    <BsHeart
                      onClick={() =>
                        user
                          ? AddsaveItem(product?._id)
                          : toast.error("Please Login and Continue")
                      }
                    />
                  )}
                </div>
                <img
                  src={product.image}
                  alt={`${product.name} photo`}
                  className="w-full object-cover rounded-t-3xl h-full max-w-[18rem] max-h-[14rem]"
                />
              </div>
              <div className="bg-primary text-secondary dark:text-secondary rounded-b-3xl w-full py-5 px-4">
                <div className="w-full mb-1.5">
                  <h1 className="font-bold py-1.5">
                    {/* {product.name} */}
                    {TextAnimation(
                      product.name,
                      0.5,
                      0.1,
                      "flex-wrap text-balance",
                      "pl-0.5"
                    )}
                  </h1>
                  <div className="flex flex-col flex-wrap text-base">
                    {product.description.map((text: any) => (
                      <span
                        key={text}
                        className="text-[14.5px] text-balance dark:opacity-90 opacity-90"
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`w-full items-center gap-4 flex flex-row flex-wrap justify-between py-1.5 ${
                    cartItem[product._id]
                      ? " max-[230px]:justify-center"
                      : " max-[180px]:justify-center"
                  }`}
                >
                  <p className="font-bold">
                    {product.instock ? (
                      <>
                        {currency} {product.price}
                      </>
                    ) : (
                      <p className="capitalize font-bold line-through text-neutral-900 opacity-95">
                        Out of Stock
                      </p>
                    )}
                  </p>

                  <div>
                    {user ? (
                      <>
                        {cartItem[product._id] ? (
                          <div className="flex gap-3 items-center max-[170px]:flex-col-reverse flex-row max-[170px]:flex-wrap">
                            <button
                              onClick={() => {
                                AddtoCart(product._id);
                                setopen(false);
                              }}
                              className="py-2 disabled:opacity-70 disabled:bg-yellow-900 px-2 rounded-full text-lg   bg-yellow-700 text-white"
                            >
                              <BiPlus className="hover:text-[20px]" />
                            </button>
                            <p className="font-extrabold">
                              {cartItem[product._id] && cartItem[product._id]}
                            </p>
                            <button
                              onClick={() => RemoveFromeCart(product._id)}
                              className="py-2 disabled:opacity-70 disabled:bg-yellow-900 px-2 rounded-full text-lg   bg-secondary text-white"
                            >
                              <GrSubtract className="hover:text-[20px]" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              AddtoCart(product._id);
                              setopen(false);
                            }}
                            disabled={!product.instock}
                            className="py-2 disabled:opacity-70 disabled:bg-yellow-900 px-2 rounded-full text-2xl hover:font-bold hover:text-[25px] bg-yellow-700 text-white"
                          >
                            <BiPlus />
                          </button>
                        )}
                      </>
                    ) : (
                      <div>
                        <Link to={NotAuth}>
                          <div>
                            <button
                              onClick={() =>
                                toast.error(
                                  "Please Login Before Placing An Order"
                                )
                              }
                              disabled={!product.instock}
                              className="py-2 disabled:opacity-70 disabled:bg-yellow-900 px-2 rounded-full text-2xl hover:font-bold hover:text-[25px] bg-yellow-700 text-white"
                            >
                              <BiPlus />
                            </button>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </motion.div>
    )
  );
};

export default ProductCards;
