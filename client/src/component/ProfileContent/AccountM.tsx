import React from "react";
import { ZodInputField } from "../../context/InputField";
import { buttonClassName } from "../Animation";
import Avater from "../../context/Avater";
import toast from "react-hot-toast";
import { UserAuth } from "../../context/UserContext";
import { ZodSelectField } from "../../context/SelectField";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProfileField } from "../../Zod/typesField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../../Zod/Schema/Schemas";
import { BiLoaderCircle } from "react-icons/bi";
import ApiURL from "../../context/Api";
const AccountM = () => {
  const { user, setuser }: any = UserAuth();
  const [imageData, setimageData] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user ? user.email : "",
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      gender: user ? user.gender : "",
      imageUrl: user ? user.imageUrl : "",
      phoneNumber: user ? user.phoneNumber : "",
    },
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit: SubmitHandler<ProfileField> = async (data) => {
    const { firstName, lastName, gender, phoneNumber, email } = data;

    const PersonalInfo = {
      firstName,
      lastName,
      gender,
      phoneNumber,
      email,
      imageUrl: img ? JSON.stringify(img) : user ? user.imageUrl : "",
    };
    try {
      const res = await ApiURL.put(`/user/update/${user._id}`, PersonalInfo);
      const info = res.data;
      if (info.success) {
        toast.success(info.message || "User Update Successfully");
        setuser(info.data);
        setValue("imageUrl", imageData!);
      } else {
        toast.error(info.message);
      }
    } catch (error: any) {
      console.log(error);

      setError("imageUrl", {
        message: "No Image Provided",
      });
      setError("root", {
        message: error.message.toString(),
      });
      toast.error("Please Fill in the Fields");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center font-bold pb-4 text-lg">My Account</h1>
        <Avater setimageData={setimageData} setImg={setImg} />
        <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
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

        <div className="w-full flex flex-row gap-4 my-4 max-[500px]:flex-col">
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

        <ZodInputField
          label="email*"
          type="email"
          error={errors.email?.message}
          value={register("email")}
          placeholder="Enter Email address"
        />

        <div className="py-4">
          <button
            disabled={isSubmitting}
            className={`outline-1 ${buttonClassName}`}
          >
            {isSubmitting ? (
              <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
            ) : (
              <p>Update Changes</p>
            )}
          </button>
        </div>
        {errors.root && (
          <span className="text-base text-red-500 font-semibold">
            {errors.root.message}
          </span>
        )}
      </form>
    </div>
  );
};
// const AccountM = () => {
//   const { user, setuser }: any = UserAuth();

//   const [formData, setformData]: any = useState({
//     firstName: user && user.firstName,
//     lastName: user && user.lastName,
//     gender: user && user.gender,
//     phone: `0${user && user.phone}`,
//     email: user && user.email,
//   });
//   const [imageData, setimageData] = React.useState(null);
//   const HandleChange = (e: any) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };

//   const handleSubumit = (e: any) => {
//     e.preventDefault();
//     const { firstName, lastName, gender, phone, email } = formData;
//     if (
//       formData.firstName.trim() &&
//       formData.lastName.trim() &&
//       formData.email.trim() &&
//       formData.gender.trim() &&
//       formData.phone.trim()
//     ) {
//       setformData({
//         firstName: "",
//         lastName: "",
//         gender: "",
//         phone: "",
//         email: "",
//       });
//       setuser(
//         firstName,
//         lastName,
//         gender,
//         phone,
//         email,
//         imageData && imageData
//       );
//       toast.success("Edited Successfully");
//       console.log(imageData);
//     } else {
//       toast.error("Please Fill in the Fields");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubumit}>
//         <h1 className="text-center font-bold pb-4 text-lg">My Account</h1>
//         <Avater setimageData={setimageData} />
//         <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
//           <InputField
//             label="FirstName*"
//             type="text"
//             onChange={HandleChange}
//             name="firstName"
//             placeholder="Ex. John"
//             value={formData.firstName}
//           />
//           <InputField
//             label="LastName*"
//             type="text"
//             onChange={HandleChange}
//             name="lastName"
//             placeholder="Ex. Doe"
//             value={formData.lastName}
//           />
//         </div>

//         <div className="w-full flex flex-row gap-4 my-4 max-[500px]:flex-col">
//           <InputField
//             label="phone*"
//             type="tel"
//             onChange={HandleChange}
//             name="phone"
//             placeholder="Enter Phone Number"
//             value={formData.phone}
//           />
//           <SelectField
//             value={formData.gender}
//             options={genderValue}
//             name="gender"
//             className="rounded-2xl"
//             label="gender"
//             onChange={HandleChange}
//           />
//         </div>

//         <InputField
//           label="email*"
//           type="email"
//           onChange={HandleChange}
//           name="email"
//           placeholder="Enter Email address"
//           value={formData.email}
//         />

//         <div className="py-4">
//           <button className={`outline-1 ${buttonClassName}`}>
//             <p>Update Changes</p>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default AccountM;

export const genderValue = [
  {
    title: "Select",
    value: "",
  },
  {
    title: "male",
    value: "male",
  },
  {
    title: "female",
    value: "female",
  },
  {
    title: "others",
    value: "others",
  },
];
