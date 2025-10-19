import { motion } from "framer-motion";
import { Assets } from "../component/assets";

const Loader = () => {
  return (
    <div className="w-16">
      <div className="bg-neutral-100  animate-bounce transition-all duration-200 rounded-full p-2 shadow-lg drop-shadow-md dark:text-secondary">
        <motion.img
          initial={{
            scale: 0.7,
            transition: {
              delay: 1.5,
              duration: 1.5,
            },
          }}
          animate={{
            scale: 1,
            transition: {
              delay: 1,
              duration: 2,
              repeat: 999,
              ease: "circInOut",
            },
          }}
          src={Assets.Logo2}
          className="size-12 object-cover rounded-full"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Loader;
