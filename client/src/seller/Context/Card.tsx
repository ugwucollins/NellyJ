import { Link } from "react-router-dom";
import type { CardProp } from "./Types";
import { motion } from "framer-motion";
import { YSlideIn } from "../../component/Animation";

const Card = ({ Title, value, icon, pen, color, path, index }: CardProp) => {
  return (
    Title && (
      <motion.div
        variants={YSlideIn(150, 0.2, index ? index : 0.2, 0.2)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full max-w-72 px-5 relative my-2 rounded-xl py-4 dark:shadow-slate-600 bg-white hover:shadow-xl transition-all duration-300 hover:drop-shadow dark:bg-slate-700/80 shadow-lg"
      >
        <div
          style={{ backgroundColor: color }}
          className="w-1.5 rounded-l-md h-full absolute top-0 left-0"
        />
        <Link to={path ? path : ""}>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-base capitalize font-semibold opacity-80">
                  {Title}
                </h1>
                <p className="text-xl font-bold">{value}</p>
              </div>
              <div
                className=" text-xl size-8 rounded-md flex items-center justify-center"
                style={{ color: "white", backgroundColor: color }}
              >
                {icon}
              </div>
            </div>
            <p className="text-sm font-medium pt-2.5" style={{ color: color }}>
              {pen}
            </p>
          </div>
        </Link>
      </motion.div>
    )
  );
};

export default Card;
