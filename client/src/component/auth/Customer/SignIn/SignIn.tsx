import { Assets } from "../../../assets";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <div className="w-full flex max-sm:bg-white bg-neutral-50 flex-col justify-center min-h-screen items-center max-sm:px-1">
      <div className="w-full max-w-5xl gap-x-5 px-10 max-sm:px-6 max-[170px]:px-2  flex bg-white justify-center items-center py-12 rounded-xl shadow-xl max-sm:shadow-slate-50 drop-shadow-md max-sm:bg-[url('/food_images/v2.jpg')] max-sm:object-cover max-sm:relative z-0">
        <div className="w-full hidden max-sm:block h-full absolute top-0 left-0 bg-black/30 max-sm:text-white rounded-xl blur-md opacity-80" />
        <SignInForm />
        <ImageSection image={Assets.venu2} />
      </div>
    </div>
  );
};

export default SignIn;

export const ImageSection = ({ image }: string | any) => {
  return (
    <div className="w-full max-[900px]:h-[70vh] h-full max-sm:hidden">
      <img
        src={image ? image : Assets.venu2}
        className=" rounded-2xl w-full h-full object-cover"
        alt="photo"
      />
    </div>
  );
};
