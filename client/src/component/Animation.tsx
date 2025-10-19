import { motion } from "framer-motion";

const TextAnimation = (
  text: string,
  length: number,
  del: number,
  className?: string,
  pClas?: string
) => {
  return (
    <div className={`flex flex-row ${className}`}>
      {Array.from(text).map((text: any, index: number) => (
        <motion.p
          key={index}
          variants={YSlideIn(length, del, index, 0.5)}
          whileInView={"show"}
          initial={"hidden"}
          className={`${pClas}`}
        >
          {text === "" ? "/u000" : text}
        </motion.p>
      ))}
    </div>
  );
};

export default TextAnimation;

export const YSlideIn = (yd: any, delay: any, tim: number, dur: number) => {
  return {
    hidden: {
      opacity: 0,
      y: yd,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * tim,
        duration: dur,
        ease: "easeInOut",
      },
    },
  };
};
export const XSlideIn = (yd: any, delay: any, tim: number, dur: number) => {
  return {
    hidden: {
      opacity: 0,
      x: yd,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay * tim,
        duration: dur,
      },
    },
  };
};

export const checkEvenNumbers = (index: number) => index % 2 === 0;

export const buttonClassName =
  "px-5 py-3 rounded-xl hover:rounded-full hover:bg-transparent hover:outline hover:outline-secondary hover:text-secondary transition-all duration-200 bg-secondary dark:hover:outline-primary1 dark:hover:text-primary1 dark:bg-primary1 dark:text-secondary dark:hover:bg-transparent text-primary1 font-semibold hover:font-bold";
