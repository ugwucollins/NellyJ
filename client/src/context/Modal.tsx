import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { BiX } from "react-icons/bi";
import { LuTriangleAlert } from "react-icons/lu";
import { YSlideIn } from "../component/Animation";

type ModalProp = {
  Title: string;
  OkayBtn: string;
  CancelBtn: string;
  Icon?: ReactElement;
  Progress: () => void;
  Cancel: () => void;
};

const Modal = ({
  Title,
  Cancel,
  Progress,
  Icon,
  OkayBtn,
  CancelBtn,
}: ModalProp) => {
  return (
    <div className="w-full h-screen dark:text-black bg-black/20 fixed top-0 left-0 z-[12]">
      <div className="flex min-h-screen justify-center items-center text-center w-full  pr-8 pl-4">
        <motion.div
          variants={YSlideIn(100, 0.5, 0.5, 0.5)}
          initial={"hidden"}
          whileInView={"show"}
          className="px-12 w-full max-w-xl py-8 bg-white shadow-md drop-shadow  hover:drop-shadow-lg hover:shadow-lg dark:shadow-neutral-300 rounded-xl relative"
        >
          <BiX
            onClick={Cancel}
            className="absolute text-3xl top-2.5 right-3 cursor-pointer"
          />
          <div className="flex flex-col gap-2 items-center justify-center relative w-full">
            <h1 className="text-6xl py-2 text-yellow-800">
              {Icon ? Icon : <LuTriangleAlert />}
            </h1>
            <p className="font-semibold text-base">{Title}</p>
            <div className="w-full flex max-[300px]:flex-col gap-4 justify-end pt-6">
              <button
                onClick={Progress}
                className=" bg-yellow-800 w-full text-white px-5 rounded-full  hover:shadow-md hover:drop-shadow  font-semibold hover:font-bold transition-all duration-150 py-3"
              >
                <p>{OkayBtn}</p>
              </button>
              <button
                onClick={Cancel}
                className=" hover:shadow-md hover:drop-shadow font-semibold hover:font-bold transition-all duration-150 outline outline-2 text-red-900 outline-red-800 w-full px-5 rounded-full py-3"
              >
                <p>{CancelBtn}</p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Modal;
