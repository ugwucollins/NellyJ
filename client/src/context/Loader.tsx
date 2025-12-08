import { motion } from "framer-motion";
import { Assets } from "../component/assets";
type LoaderProp = {
  className?: string;
  size?: string;
};
const Loader = ({ className, size }: LoaderProp) => {
  return (
    <div className={`w-16 ${className}`}>
      <div className="bg-neutral-100  animate-bounce transition-all duration-200 rounded-full p-2 shadow-lg drop-shadow-md dark:text-secondary">
        <motion.img
          initial={{
            scale: 0.7,
            transition: {
              delay: 1.5,
              duration: 1.5,
              ease: "easeInOut",
            },
          }}
          animate={{
            scale: 1,
            transition: {
              delay: 1,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          src={Assets.Logo2}
          className={`size-12 object-cover rounded-full ${size}`}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Loader;
