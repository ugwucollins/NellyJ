import { motion } from "framer-motion";
import TextAnimation, { checkEvenNumbers, YSlideIn } from "../Animation";
import { Category } from "../assets";
import { UserProduct } from "../../context/ProductContext";
import ProductCards from "./ProductCards";
import { Link } from "react-router-dom";

const Products = () => {
  const { category: cartegory, setcategory, products }: any = UserProduct();

  return (
    <div className="w-full pt-5 flex flex-col justify-center items-center text-center">
      <div className="w-full flex justify-center items-center text-center flex-col">
        <>
          {TextAnimation(
            "-- Our Menu --",
            20,
            0.3,
            "flex  gap-1 flex-wrap px-8",
            "text-[min(2vw,13px)] font-bold"
          )}
        </>
        <h1 className="py-4">
          {TextAnimation(
            "Today's  Menu",
            -22,
            0.2,
            "flex  gap-1 flex-wrap",
            "text-[min(10vw,30px)] font-bold"
          )}
        </h1>

        <div className="w-full py-4 justify-center items-center align-middle text-center capitalize flex gap-5  flex-wrap flex-row">
          {Category.map((item: any, index: number) => (
            <motion.div
              variants={YSlideIn(
                checkEvenNumbers(index) ? 100 : -100,
                index,
                0.5,
                0.5
              )}
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
        <div className="flex overflow-hidden flex-row py-12 px-16 gap-8 max-md:gap-4 max-sm:px-10 max-[170px]:px-1 max-[400px]:px-3 flex-wrap h-auto w-full justify-center max-sm:justify-center">
          {products
            .filter(
              (item: any) =>
                (item &&
                  item.category.toLowerCase() === cartegory.toLowerCase()) ||
                cartegory === ""
            )
            .slice(0, 4)
            .map((item: any, index: number) => (
              <ProductCards product={item} index={index} key={index} />
            ))}
        </div>
        <div className="w-full flex justify-end pr-8">
          <Link to={"/product"}>
            <button className=" capitalize px-6 py-3 my-2 dark:bg-neutral-600 bg-secondary text-primary font-semibold hover:font-bold hover:rounded-full rounded-md">
              <p>See more</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
