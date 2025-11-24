import { MdEmail } from "react-icons/md";
import TextAnimation, { buttonClassName } from "../Animation";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsLetterSchema } from "../../Zod/Schema/Schemas";
import type { NewsLetterField } from "../../Zod/typesField";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import { UserAuthInfo } from "../../App";

const NewsLetter = () => {
  const { user }: any = UserAuthInfo();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user ? user?.email : "",
    },
    resolver: zodResolver(NewsLetterSchema),
  });

  const OnSubmit: SubmitHandler<NewsLetterField> = (data) => {
    try {
      console.log(data);
      setTimeout(() => {
        setValue("email", "");
        toast.success("NewsLetter Subscribed Successfully");
      }, 1000);
    } catch (error: any) {
      setError("root", {
        message: error.message,
      });
      toast.error(error.message || "NewsLetter Failed");
    }
  };
  return (
    <div className="w-full min-h-[90vh] flex flex-col justify-center items-center dark:bg-secondary bg-primary1">
      <div className="w-full  px-20 max-md:px-16 max-sm:px-5 max-[170px]:px-1">
        <div className="flex items-center gap-y-4 py-4 justify-between w-full flex-wrap capitalize">
          <p className="text-[min(10vw,32px)] text-balance font-bold">
            Want Us to cover your Event
          </p>
          <Link to={"/event"}>
            <button className={buttonClassName}>
              <p>Book us now</p>
            </button>
          </Link>
        </div>

        <hr className="w-full bg-secondary rounded-full dark:bg-primary1 h-1" />

        <div className="py-10 text-center w-full flex flex-col justify-center items-center">
          <h2 className="py-4">
            {TextAnimation(
              "-- Our NewsLetter --",
              10,
              0.3,
              "flex gap-0.5 flex-row px-8 ",
              "text-[min(2vw,13px)] font-bold"
            )}
          </h2>
          <h1 className="text-[min(11vw,31px)] text-balance font-bold">
            Subscribe to Our Newsletter to Get Updates to Our Latest Foods
          </h1>
          <p className="pb-5 pt-1 opacity-75">
            Get 20% off your first order just by subscribing to our newsletter
          </p>

          <form
            onSubmit={handleSubmit(OnSubmit)}
            className="relative flex flex-col text-start py-6 items-start"
          >
            <div className="relative flex flex-wrap gap-4 items-center">
              <div className="relative shadow drop-shadow flex bg-white items-center px-2 max-[430px]:w-full py-2  max-[260px]:px-1.5  max-[260px]:py-4 rounded-full">
                <div className="px-2 py-2  text-white text-xl rounded-full bg-yellow-800 ">
                  <MdEmail />
                </div>

                <input
                  type="email"
                  {...register("email")}
                  className="outline-none px-2 w-full font-semibold"
                  placeholder="Enter Email Address"
                />
              </div>
              <div className="max-[428px]:w-full max-[170px]:justify-center flex max-[428px]:justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 bg-yellow-800 hover:font-bold shadow-md rounded-full text-primary1 font-semibold"
                >
                  {isSubmitting ? (
                    <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
                  ) : (
                    <p>Subscribe</p>
                  )}
                </button>
              </div>
            </div>

            {errors.email && (
              <span className="text-red-500 pl-1 py-1 text-sm font-semibold">
                {errors.email?.message?.toString()}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
