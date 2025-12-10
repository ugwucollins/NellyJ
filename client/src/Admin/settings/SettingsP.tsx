import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { UseTheme } from "../../App";
import { UserAuth } from "../../context/UserContext";
import { UserAdminAuth } from "../context/AdminContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../../Zod/Schema/Schemas";
import Modal from "../../context/Modal";
import { LuLogOut, LuSun } from "react-icons/lu";
import type { ProfileField } from "../../Zod/typesField";
import ApiURL from "../../context/Api";
import toast from "react-hot-toast";
import AvaterImage from "../../context/AvaterImage";
import { BsMoonFill } from "react-icons/bs";
import { buttonClassName } from "../../component/Animation";
import Avater from "../../context/Avater";
import { ZodInputField } from "../../context/InputField";
import { ZodSelectField } from "../../context/SelectField";
import { genderValue } from "../../component/ProfileContent/AccountM";
import { BiLoaderCircle } from "react-icons/bi";

// const SettingsP = () => {
//   const { admin, HandleLogOut }: any = UserAdminAuth();
//   const { HandleTheme, darkMode }: any = UseTheme();

//   const [open, setOpen] = useState(false);
//   function handleModalA() {
//     setOpen(false);
//     HandleLogOut();
//   }

//   function handleCloseModalA() {
//     setOpen(!open);
//   }

//   if (open) {
//     return (
//       <div>
//         <Modal
//           Title="Are You sure you want to LogOut"
//           Icon={<LuLogOut />}
//           CancelBtn="No"
//           Progress={handleModalA}
//           OkayBtn="Yes"
//           Cancel={handleCloseModalA}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex justify-center items-center flex-col px-2 py-8">
//       <div className="w-full max-w-2xl shadow-lg text-center drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
//         <h1 className=" font-bold text-lg dark:py-5 py-2">Settings</h1>
//         <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
//           <div
//             className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
//               true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
//             }`}
//           >
//             {admin && admin?._id ? (
//               <img
//                 src={admin && admin?.imageUrl}
//                 className="size-24 rounded-full object-cover"
//                 alt={"contacted photos"}
//               />
//             ) : (
//               <AvaterImage size="24" />
//             )}
//           </div>
//           <div className="whitespace-nowrap">
//             <p className="font-semibold text-base capitalize">
//               {admin?.name ? admin?.name : "Hi Admin"}
//             </p>
//             <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
//               {admin && admin?.email}
//             </span>
//           </div>
//         </div>

//         <div
//           onClick={HandleTheme}
//           className={`items-center mt-5 dark:text-white cursor-pointer gap-4 py-2.5 flex rounded-md px-6 bg-slate-50 dark:bg-slate-800`}
//         >
//           {darkMode === true ? (
//             <BsMoonFill className="text-2xl" />
//           ) : (
//             <LuSun className="text-2xl" />
//           )}
//           <span className=" font-semibold text-base hover:font-bold">
//             {darkMode === true ? "Dark" : "Light"}Mode
//           </span>
//         </div>

//         <div className="w-full flex flex-col gap-3 py-4">
//           <button
//             onClick={handleCloseModalA}
//             className={`${buttonClassName} dark:bg-transparent dark:text-white dark:outline-white dark:hover:outline-red-800 dark:outline outline-2 bg-red-800 w-full`}
//           >
//             <p>LogOut</p>
//           </button>
//           <button className={`${buttonClassName} w-full`}>
//             <p>Update</p>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsP;

const SettingsP = () => {
  const { admin, setAdmin, HandleLogOut }: any = UserAdminAuth();
  const { options }: any = UserAuth();
  const { HandleTheme, darkMode }: any = UseTheme();

  const [open, setOpen] = useState(false);
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const [imageData, setimageData]: any = useState(null);
  const [img, setImg] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: admin ? admin.email : "",
      firstName: admin ? admin.firstName : "",
      lastName: admin ? admin.lastName : "",
      gender: admin ? admin.gender : "",
      imageUrl: admin ? admin.imageUrl : "",
      phoneNumber: admin ? admin.phoneNumber : "",
    },
    resolver: zodResolver(ProfileSchema),
  });

  function handleModalA() {
    setOpen(false);
    HandleLogOut();
  }

  function handleCloseModalA() {
    setOpen(!open);
  }

  function handleCloseUpdate() {
    setUpdateOpen(!UpdateOpen);
  }

  if (open) {
    return (
      <div>
        <Modal
          Title="Are You sure you want to LogOut"
          Icon={<LuLogOut />}
          CancelBtn="No"
          Progress={handleModalA}
          OkayBtn="Yes"
          Cancel={handleCloseModalA}
        />
      </div>
    );
  }

  const onSubmit: SubmitHandler<ProfileField> = async (data) => {
    const { firstName, lastName, gender, phoneNumber, email } = data;

    const Info = {
      firstName,
      lastName,
      gender,
      phoneNumber,
      email,
      imageUrl: img || data.imageUrl,
    };

    try {
      const res = await ApiURL.put(`/user/update`, Info, options);
      const info = res.data;
      if (info.success) {
        toast.success(info.message || "User Update Successfully");
        setAdmin(info.data);
        setValue("imageUrl", imageData!);
        handleCloseUpdate();
      } else {
        toast.error(info.message);
        setError("imageUrl", {
          message: info.message || "No Image Provided",
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setError("root", {
        message: error.response.data.message || error.message.toString(),
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col px-2 py-8">
      {!UpdateOpen && (
        <div className="w-full max-w-2xl shadow-lg text-center drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
          <h1 className=" font-bold text-lg dark:py-5 py-2">Settings</h1>
          <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
            <div
              className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
                true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
              }`}
            >
              {admin && admin.imageUrl ? (
                <img
                  src={admin && admin?.imageUrl}
                  className="size-24 rounded-full object-cover"
                  alt={"contacted photos"}
                />
              ) : (
                <AvaterImage size="24" />
              )}
            </div>
            <div className="whitespace-nowrap">
              <p className="font-semibold text-base capitalize">
                {admin ? admin?.lastName + " " + admin?.firstName : "Hi admin"}
              </p>
              <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
                {admin && admin?.email}
              </span>
            </div>
          </div>

          <div
            onClick={HandleTheme}
            className={`items-center mt-5 dark:text-white cursor-pointer gap-4 py-2.5 flex rounded-md px-6 bg-slate-50 dark:bg-slate-800`}
          >
            {darkMode === true ? (
              <BsMoonFill className="text-2xl" />
            ) : (
              <LuSun className="text-2xl" />
            )}
            <span className=" font-semibold text-base hover:font-bold">
              {darkMode === true ? "Dark" : "Light"}Mode
            </span>
          </div>

          <div className="w-full flex flex-col gap-3 py-4">
            <button
              onClick={handleCloseModalA}
              className={`${buttonClassName} dark:bg-transparent dark:text-white dark:outline-white dark:hover:outline-red-800 dark:outline outline-2 bg-red-800 w-full`}
            >
              <p>LogOut</p>
            </button>
            <button
              onClick={handleCloseUpdate}
              className={`${buttonClassName} w-full`}
            >
              <p>Update</p>
            </button>
          </div>
        </div>
      )}

      {UpdateOpen && (
        <div className="w-full max-w-2xl shadow-lg text-center drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
          <h1 className=" font-bold text-lg dark:py-5 py-2">Update Profile</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col"
          >
            <Avater
              setimageData={setimageData}
              className="justify-center py-3 flex items-center"
              setImg={setImg}
            />

            <div className="w-full flex flex-row gap-4 max-[560px]:flex-col">
              <ZodInputField
                label="FirstName*"
                type="text"
                error={errors.firstName?.message}
                placeholder="Ex. John"
                value={register("firstName")}
              />
              <ZodInputField
                label="LastName*"
                type="text"
                error={errors.lastName?.message}
                placeholder="Ugwu"
                value={register("lastName")}
              />
            </div>

            <div className="w-full flex flex-row gap-4 my-4 max-[560px]:flex-col">
              <ZodInputField
                label="phoneNumber*"
                type="number"
                placeholder="Enter Phone Number"
                value={register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />
              <ZodSelectField
                value={register("gender")}
                options={genderValue}
                className="rounded-2xl"
                label="gender"
                error={errors.gender?.message}
              />
            </div>

            <div className="w-full pb-5">
              <ZodInputField
                label="email*"
                type="email"
                error={errors.email?.message}
                value={register("email")}
                placeholder="Enter Email address"
              />
            </div>

            {errors.root && (
              <span className="text-base text-red-500 font-semibold">
                {errors.root.message}
              </span>
            )}

            <button
              disabled={isSubmitting}
              className={`outline-1 ${buttonClassName}`}
            >
              {isSubmitting ? (
                <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
              ) : (
                <p>Save Changes</p>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SettingsP;
