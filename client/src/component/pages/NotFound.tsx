import { NavLink } from "react-router-dom";
import TextAnimation, { YSlideIn } from "../Animation";
import { production } from "../../context/UserContext";
import { motion } from "framer-motion";

const NotFound = ({ Link }: any) => {
  return (
    <div className="w-full min-h-[85vh] flex text-center justify-center items-center">
      <div>
        <h1 className="bg-transparent overflow-hidden w-full flex justify-center text-center">
          {TextAnimation("404", 10, production ? 0.5 : 1, "", "notfound")}
        </h1>
        <motion.div
          variants={YSlideIn(100, 0.5, 0.5, 0.8)}
          initial={"hidden"}
          whileInView={"show"}
        >
          <h1 className="text-[min(10vw,30px)] font-semibold">
            Oops! Page not Found
          </h1>

          <p className="text-balance overflow-hidden opacity-80 font-bold pb-4">
            The page you are looking for cannot be found, take a break before
            trying again
          </p>
          <NavLink to={Link}>
            <button
              onClick={() => {
                setTimeout(() => {}, 3000);
              }}
              className="py-3 px-6 bg-secondary dark:outline text-primary rounded-full shadow my-5"
            >
              <p>Go To Home Page</p>
            </button>
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
