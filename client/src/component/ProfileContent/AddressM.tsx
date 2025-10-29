import { useState } from "react";
// const InputField = lazy(() => import("../../context/InputField"));

import { buttonClassName } from "../Animation";
import { UserAuth } from "../../context/UserContext";
import type { AddressProp } from "../../context/Types";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ZodSelectField } from "../../context/SelectField";
import { Countries, States } from "../assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "../../Zod/Schema/Schemas";
import type { AddressField } from "../../Zod/typesField";
import { ZodInputField } from "../../context/InputField";
import { BiLoaderCircle } from "react-icons/bi";

const AddressM = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AddressSchema),
  });
  const { UsersAddress, Addaddress, DeleteAddress, EditAddress }: any =
    UserAuth();
  const [btnType, setbtnType] = useState("send");
  const [editForm, seteditForm]: any = useState();

  const HandleEdit = (_id: any) => {
    const SelectedAddress: any = UsersAddress.find(
      (item: any) => item._id === _id
    );
    setValue("title", SelectedAddress.title);
    setValue("firstName", SelectedAddress.firstName);
    setValue("lastName", SelectedAddress.lastName);
    setValue("country", SelectedAddress.country);
    setValue("city", SelectedAddress.city);
    setValue("state", SelectedAddress.state);
    setValue("address", SelectedAddress.address);
    setValue("phoneNumber", SelectedAddress.phone);
    setValue("email", SelectedAddress.email);
    setbtnType("Edit");
    seteditForm(SelectedAddress);
  };

  const emptyForm = () => {
    setValue("title", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("country", "");
    setValue("city", "");
    setValue("state", "");
    setValue("address", "");
    setValue("phoneNumber", "");
    setValue("email", "");
  };

  const onSubmit: SubmitHandler<AddressField> = (data) => {
    try {
      if (btnType === "send") {
        console.log(data);
        toast.success("Address Added Successfully");
        Addaddress(data);
        setTimeout(() => {
          emptyForm();
        }, 1000);
      } else {
        EditAddress(editForm && editForm._id, data);
        setTimeout(() => {
          emptyForm();
          setbtnType("send");
        }, 1000);
        toast.success("Edited Address Successfully");
      }
    } catch (error: any) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <div>
      <div className="flex hover:shadow-lg hover:rounded-xl transition-all duration-150 hover:drop-shadow flex-col outline-1 rounded-md shadow py-1.5 px-2 outline-slate-400 outline mb-4">
        {UsersAddress.sort((a: any, b: any) => b._id - a._id).map(
          (item: AddressProp, index: number) => {
            // const even = index % 2 === 0;
            return (
              <div key={index}>
                <div className="w-full flex justify-between items-center">
                  <address>
                    <h1 className="text-base font-bold">{item.title}</h1>
                    <div className="pb-2">
                      {item.address}, {item.city},{" "}
                      {item.state && item.state.toString().split("state")} State
                    </div>
                  </address>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => HandleEdit(item._id)}
                      className="px-3 py-3 cursor-pointer font-semibold hover:font-bold text-base"
                    >
                      <p>Edit</p>
                    </button>
                    <button
                      onClick={() => DeleteAddress(item._id)}
                      className="px-3 text-red-700 cursor-pointer py-3 font-semibold hover:font-bold text-base"
                    >
                      <p>Delete</p>
                    </button>
                  </div>
                </div>

                <hr className="my-1.5 outline-1 outline outline-slate-300" />
              </div>
            );
          }
        )}
        {!UsersAddress.length && (
          <div className=" w-full flex justify-center text-center text-red-800 py-10 animate-bounce font-bold text-xl">
            No Address
          </div>
        )}
      </div>

      <div>
        <h1 className="py-4 text-[min(5vw,18px)] font-semibold">
          Add New Address
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Ex. Doe"
              value={register("lastName")}
            />
          </div>

          <div className="flex flex-col gap-y-3.5 py-4">
            <ZodInputField
              label="title*"
              type="text"
              error={errors.title?.message}
              placeholder="Main Address"
              value={register("title")}
            />

            <ZodSelectField
              label="Country"
              error={errors.country?.message}
              options={Countries}
              value={register("country")}
            />
            <ZodInputField
              label="Street Address*"
              error={errors.address?.message}
              type="text"
              placeholder="Enter Street address"
              value={register("address")}
            />
            <ZodInputField
              label="city*"
              type="text"
              error={errors.city?.message}
              placeholder="owerri"
              value={register("city")}
            />

            <ZodSelectField
              label="state"
              error={errors.state?.message}
              options={States}
              value={register("state")}
            />
            <ZodInputField
              label="phone*"
              type="tel"
              error={errors.phoneNumber?.message}
              placeholder="Enter Phone Number"
              value={register("phoneNumber")}
            />
            <ZodInputField
              label="email*"
              type="email"
              error={errors?.email?.message}
              placeholder="Enter Email address"
              value={register("email")}
            />
          </div>

          <div className="py-4">
            <button className={`outline-1 ${buttonClassName}`}>
              {isSubmitting ? (
                <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
              ) : (
                <p>{btnType === "send" ? "Add Address" : "Edit Address"}</p>
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
    </div>
  );
};
// const AddressM = () => {
//   const { UsersAddress, Addaddress, DeleteAddress, EditAddress }: any =
//     UserAuth();
//   const [btnType, setbtnType] = useState("send");
//   const [editForm, seteditForm]: any = useState();
//   const [formData, setformData] = useState({
//     title: "",
//     firstName: "",
//     lastName: "",
//     country: "Nigeria",
//     city: "",
//     state: "",
//     address: "",
//     phone: "",
//     email: "",
//   });

//   const HandleChange = (e: any) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };
//   const HandleEdit = (_id: any) => {
//     const SelectedAddress: any = UsersAddress.find(
//       (item: any) => item._id === _id
//     );
//     setformData(SelectedAddress);
//     setbtnType("Edit");
//     seteditForm(SelectedAddress);
//   };

//   const handleSubumit = (e: any) => {
//     e.preventDefault();

//     if (btnType === "send") {
//       toast.error("Please Fill in the Input Correctly");

//       if (
//         formData.firstName.trim() &&
//         formData.email.trim() &&
//         formData.city.trim() &&
//         formData.state.trim() &&
//         formData.title.trim() &&
//         formData.address.trim() &&
//         formData.phone.trim() &&
//         formData.lastName.trim() &&
//         formData.country.trim()
//       ) {
//         toast.success("Add Address Succssfully");
//         Addaddress(formData);
//         setformData({
//           title: "",
//           firstName: "",
//           lastName: "",
//           country: "",
//           city: "",
//           state: "",
//           address: "",
//           phone: "",
//           email: "",
//         });
//       }
//     } else {
//       if (
//         formData.firstName.trim() &&
//         formData.email.trim() &&
//         formData.city.trim() &&
//         formData.state.trim() &&
//         formData.title.trim() &&
//         formData.address.trim() &&
//         formData.phone.trim() &&
//         formData.lastName.trim() &&
//         formData.country.trim()
//       ) {
//         EditAddress(editForm && editForm._id, formData);
//         toast.success("Edited Address Succssfully");
//         setformData({
//           title: "",
//           firstName: "",
//           lastName: "",
//           country: "",
//           city: "",
//           state: "",
//           address: "",
//           phone: "",
//           email: "",
//         });
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="flex hover:shadow-lg hover:rounded-xl transition-all duration-150 hover:drop-shadow flex-col outline-1 rounded-md shadow py-1.5 px-2 outline-slate-400 outline mb-4">
//         {UsersAddress.sort((a: any, b: any) => b._id - a._id).map(
//           (item: AddressProp, index: number) => {
//             // const even = index % 2 === 0;
//             return (
//               <div key={index}>
//                 <div className="w-full flex justify-between items-center">
//                   <address>
//                     <h1 className="text-base font-bold">{item.title}</h1>
//                     <div className="pb-2">
//                       {item.address}, {item.city},{" "}
//                       {item.state && item.state.toString().split("state")} State
//                     </div>
//                   </address>
//                   <div className="flex gap-2 items-center">
//                     <button
//                       onClick={() => HandleEdit(item._id)}
//                       className="px-3 py-3 cursor-pointer font-semibold hover:font-bold text-base"
//                     >
//                       <p>Edit</p>
//                     </button>
//                     <button
//                       onClick={() => DeleteAddress(item._id)}
//                       className="px-3 text-red-700 cursor-pointer py-3 font-semibold hover:font-bold text-base"
//                     >
//                       <p>Delete</p>
//                     </button>
//                   </div>
//                 </div>

//                 <hr className="my-1.5 outline-1 outline outline-slate-300" />
//               </div>
//             );
//           }
//         )}
//         {!UsersAddress.length && (
//           <div className=" w-full flex justify-center text-center text-red-800 py-10 animate-bounce font-bold text-xl">
//             No Address
//           </div>
//         )}
//       </div>

//       <div>
//         <h1 className="py-4 text-[min(5vw,18px)] font-semibold">
//           Add New Address
//         </h1>
//         <form onSubmit={handleSubumit}>
//           <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
//             <InputField
//               label="FirstName*"
//               type="text"
//               onChange={HandleChange}
//               name="firstName"
//               placeholder="Ex. John"
//               value={formData.firstName}
//             />
//             <InputField
//               label="LastName*"
//               type="text"
//               onChange={HandleChange}
//               name="lastName"
//               placeholder="Ex. Doe"
//               value={formData.lastName}
//             />
//           </div>

//           <div className="flex flex-col gap-y-3.5 py-4">
//             <InputField
//               label="title*"
//               type="text"
//               onChange={HandleChange}
//               name="title"
//               placeholder="Main Address"
//               value={formData.title}
//             />
//             <SelectField
//               label="Country"
//               onChange={HandleChange}
//               options={Countries}
//               name="country"
//               value={formData.country}
//             />
//             <InputField
//               label="Street Address*"
//               type="text"
//               onChange={HandleChange}
//               name="address"
//               placeholder="Enter Street address"
//               value={formData.address}
//             />
//             <InputField
//               label="city*"
//               type="text"
//               onChange={HandleChange}
//               name="city"
//               placeholder="owerri"
//               value={formData.city}
//             />

//             <SelectField
//               label="state"
//               onChange={HandleChange}
//               options={States}
//               name="state"
//               value={formData.state}
//             />
//             <InputField
//               label="phone*"
//               type="tel"
//               onChange={HandleChange}
//               name="phone"
//               placeholder="Enter Phone Number"
//               value={formData.phone}
//             />
//             <InputField
//               label="email*"
//               type="email"
//               onChange={HandleChange}
//               name="email"
//               placeholder="Enter Email address"
//               value={formData.email}
//             />
//           </div>

//           <div className="py-4">
//             <button className={`outline-1 ${buttonClassName}`}>
//               <p>{btnType === "send" ? "Add Address" : "Edit Address"}</p>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

export default AddressM;
