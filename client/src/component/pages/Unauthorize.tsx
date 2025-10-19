import { NavLink, useNavigate } from "react-router-dom";
import TextAnimation, { YSlideIn } from "../Animation";
import { production } from "../../context/UserContext";
import { motion } from "framer-motion";

const Unauthorize = ({ Link }: any) => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[85vh] flex text-center justify-center items-center">
      <div>
        <h1 className="bg-transparent overflow-hidden w-full flex justify-center text-center">
          {TextAnimation("403", 10, production ? 0.5 : 1, "", "notfound")}
        </h1>
        <motion.div
          variants={YSlideIn(100, 0.5, 0.5, 0.8)}
          initial={"hidden"}
          whileInView={"show"}
        >
          <h1 className="text-[min(10vw,30px)] font-semibold">
            Oops! Access Denied
          </h1>

          <p className="text-balance overflow-hidden opacity-80 font-bold pb-4">
            You are not allowed to enter This page, take a break before trying
            again or go Back
          </p>

          <NavLink to={Link}>
            <button
              onClick={() => {
                setTimeout(() => {
                  navigate(-1);
                }, 1000);
              }}
              className="py-3 px-6 bg-secondary dark:outline text-primary rounded-full shadow my-5"
            >
              <p>Go Back</p>
            </button>
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default Unauthorize;
