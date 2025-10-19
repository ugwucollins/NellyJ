import React, { useState } from "react";
import InputField from "../../context/InputField";
import { buttonClassName } from "../Animation";
import Avater from "../../context/Avater";
import toast from "react-hot-toast";
import { UserAuth } from "../../context/UserContext";
import SelectField from "../../context/SelectField";
const AccountM = () => {
  const { user, setuser }: any = UserAuth();

  const [formData, setformData]: any = useState({
    firstName: user && user.firstName,
    lastName: user && user.lastName,
    gender: user && user.gender,
    phone: `0${user && user.phone}`,
    email: user && user.email,
  });
  const [imageData, setimageData] = React.useState(null);
  const HandleChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubumit = (e: any) => {
    e.preventDefault();
    const { firstName, lastName, gender, phone, email } = formData;
    if (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.gender.trim() &&
      formData.phone.trim()
    ) {
      setformData({
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        email: "",
      });
      setuser(
        firstName,
        lastName,
        gender,
        phone,
        email,
        imageData && imageData
      );
      toast.success("Edited Successfully");
      console.log(imageData);
    } else {
      toast.error("Please Fill in the Fields");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubumit}>
        <h1 className="text-center font-bold pb-4 text-lg">My Account</h1>
        <Avater setimageData={setimageData} />
        <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
          <InputField
            label="FirstName*"
            type="text"
            onChange={HandleChange}
            name="firstName"
            placeholder="Ex. John"
            value={formData.firstName}
          />
          <InputField
            label="LastName*"
            type="text"
            onChange={HandleChange}
            name="lastName"
            placeholder="Ex. Doe"
            value={formData.lastName}
          />
        </div>

        <div className="w-full flex flex-row gap-4 my-4 max-[500px]:flex-col">
          <InputField
            label="phone*"
            type="tel"
            onChange={HandleChange}
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
          />
          <SelectField
            value={formData.gender}
            options={genderValue}
            name="gender"
            className="rounded-2xl"
            label="gender"
            onChange={HandleChange}
          />
        </div>

        <InputField
          label="email*"
          type="email"
          onChange={HandleChange}
          name="email"
          placeholder="Enter Email address"
          value={formData.email}
        />

        <div className="py-4">
          <button className={`outline-1 ${buttonClassName}`}>
            <p>Update Changes</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountM;

export const genderValue = [
  {
    title: "Select",
    value: "",
  },
  {
    title: "Male",
    value: "male",
  },
  {
    title: "Female",
    value: "female",
  },
  {
    title: "others",
    value: "others",
  },
];
