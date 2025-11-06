import { Link } from "react-router-dom";
import type { AddCardProp } from "./Types";
import { motion } from "framer-motion";
import { YSlideIn } from "../../component/Animation";

const AddCard = ({
  Title,
  text,
  icon,
  btnText,
  color,
  path,
  index,
  className,
}: AddCardProp) => {
  return (
    Title && (
      <motion.div
        variants={YSlideIn(150, 0.2, index ? index : 0.5, 0.2)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full max-w-xl px-5 my-2 rounded-xl py-6 dark:shadow-slate-600 bg-white hover:shadow-xl transition-all duration-200 hover:drop-shadow dark:bg-slate-700/80 shadow-lg"
      >
        <div>
          <div className="flex items-center gap-2">
            <div
              className=" text-xl size-10 bg-slate-200/90 rounded-md flex items-center justify-center"
              style={{ color: color }}
            >
              {icon}
            </div>
            <h1 className="text-base capitalize font-bold opacity-80">
              {Title}
            </h1>
          </div>

          <p className="text-sm opacity-85 font-medium py-3">{text}</p>

          <div className={className}>
            <button
              className="PX-8 transition-all duration-200 py-3 rounded-md hover:rounded-full text-white w-52 max-w-full font-semibold text-base hover:font-bold"
              style={{ backgroundColor: color, border: `2px solid ${color}` }}
            >
              <Link
                to={path ? path : ""}
                onClick={() => {
                  path && localStorage.setItem("path", JSON.stringify(path));
                }}
              >
                <p>{btnText}</p>
              </Link>
            </button>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default AddCard;
