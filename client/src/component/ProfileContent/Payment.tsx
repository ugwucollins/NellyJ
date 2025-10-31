import { BiCard, BiLoaderCircle } from "react-icons/bi";
import { ZodInputField } from "../../context/InputField";
import { useState } from "react";
import { buttonClassName } from "../Animation";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardSchema } from "../../Zod/Schema/Schemas";
import type { CardField } from "../../Zod/typesField";

type CardProp = {
  _id: string | Number;
  name: Number;
  number: Number;
  expireDate: Number;
  cvv: Number;
  save: boolean;
};

const Payment = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      save: true,
    },
  });
  const [card, setcard] = useState<CardProp[]>([]);

  const addNewCard = (data: any) => {
    const id = Date.now();
    const info = {
      _id: id,
      name: data.name,
      number: data.number,
      cvv: data.cvv,
      expireDate: data.expireDate,
      save: data.save,
    };
    const newCard = info;
    const Others: any = [...card, newCard];
    setcard(Others);
  };
  const DeleteCard = (id: any) => {
    const DeletedCard = card.filter((item) => item._id !== id);
    setcard(DeletedCard);
  };
  const emptyValues = () => {
    setValue("cvv", "");
    setValue("expireDate", "");
    setValue("name", "");
    setValue("number", "");
    setValue("save", false);
  };
  const onSubmit: SubmitHandler<CardField> = (data) => {
    try {
      addNewCard(data);
      setTimeout(() => {
        toast.success("Card Added Successfully");
        emptyValues();
      }, 1000);
    } catch (error) {
      toast.error("Please Enter the Correct Details");
    }
  };

  return (
    <div className="w-full py-5">
      <div className="flex flex-col gap-y-4 mb-8 mt-3">
        {card.map((item: CardProp, index: number) => {
          return (
            <div
              key={index}
              className="flex justify-between px-4 items-center py-5 outline-1 outline hover:shadow-md hover:drop-shadow-sm outline-neutral-400 rounded-xl transition-all duration-150 "
            >
              <div className="flex gap-2 items-center">
                <h1>Visa</h1>
                <span>
                  {item.number && item.number.toString().slice(0, 2)}
                  *************
                  {item.number && item.number.toString().slice(15, 18)}
                </span>
              </div>
              <button
                onClick={() => DeleteCard(item._id)}
                className="hover:text-red-800 hover:font-bold transition-colors duration-200 text-base"
              >
                <p>Delete</p>
              </button>
            </div>
          );
        })}
      </div>

      <div className="w-full pb-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-4 outline-1 outline outline-neutral-300 rounded-xl dark:outline-neutral-600 shadow hover:drop-shadow-md hover:shadow-md transition-all duration-150 dark:shadow-neutral-300 flex flex-col gap-y-4"
        >
          <h1 className="flex font-semibold text-base gap-2 py-2 items-center">
            <BiCard className="text-yellow-800 text-3xl" />
            <span>Add New Credit/Debit Card</span>
          </h1>

          <ZodInputField
            label="Card Holder Name*"
            type="text"
            error={errors.name?.message}
            placeholder="Ex. John"
            value={register("name")}
          />
          <ZodInputField
            label="Card Number*"
            type="number"
            error={errors.number?.message}
            placeholder="477423727569623405"
            value={register("number")}
          />

          <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
            <ZodInputField
              label="Expiry Date*"
              type="month"
              placeholder="06/27"
              value={register("expireDate")}
              error={errors.expireDate?.message}
            />

            <ZodInputField
              label="Cvv*"
              error={errors.cvv?.message}
              type="number"
              placeholder="Ex. Doe"
              value={register("cvv")}
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <input type="checkbox" {...register("save")} />
              <label
                htmlFor="save"
                className="text-sm font-semibold opacity-85"
              >
                Save card for Future payments
              </label>
            </div>
            {errors.save && (
              <span className="text-base text-red-500 font-semibold">
                {errors.save.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`outline-1 hover:rounded-full duration-200 my-3 ${buttonClassName} max-sm:w-full w-[150px]`}
          >
            {isSubmitting ? (
              <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
            ) : (
              <p>Add Card</p>
            )}
          </button>

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
// const Payment = () => {
//   const [card, setcard] = useState<CardProp[]>([]);
//   const [formData, setformData] = React.useState({
//     cardName: "",
//     cardnumber: "",
//     date: "",
//     cvv: "",
//     save: false,
//   });
//   const HandleChange = (e: any) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };
//   const addNewCard = () => {
//     const id = Date.now();
//     const data = {
//       _id: id,
//       name: formData.cardName,
//       number: formData.cardnumber,
//       cvv: formData.cvv,
//       date: formData.date,
//       save: formData.save,
//     };
//     const newCard = data;
//     const Others: any = [...card, newCard];
//     setcard(Others);
//   };
//   const DeleteCard = (id: any) => {
//     const DeletedCard = card.filter((item) => item._id !== id);
//     setcard(DeletedCard);
//   };
//   const handleSubumit = (e: any) => {
//     e.preventDefault();
//     if (
//       formData.date.trim() &&
//       formData.cardName.trim() &&
//       formData.cvv.trim() &&
//       formData.cardnumber.trim()
//     ) {
//       toast.success("Card Added Successfully");
//       addNewCard();
//       setformData({
//         cardName: "",
//         cardnumber: "",
//         date: "",
//         cvv: "",
//         save: false,
//       });
//     } else {
//       toast.error("Please Enter the Correct Details");
//     }
//   };

//   return (
//     <div className="w-full py-5">
//       <div className="flex flex-col gap-y-4 mb-8 mt-3">
//         {card.map((item: CardProp, index: number) => {
//           return (
//             <div
//               key={index}
//               className="flex justify-between px-4 items-center py-5 outline-1 outline hover:shadow-md hover:drop-shadow-sm outline-neutral-400 rounded-xl transition-all duration-150 "
//             >
//               <div className="flex gap-2 items-center">
//                 <h1>Visa</h1>
//                 <span>***************{item.number.toString().slice(15)}</span>
//               </div>
//               <button
//                 onClick={() => DeleteCard(item._id)}
//                 className="hover:text-red-800 hover:font-bold transition-colors duration-200 text-base"
//               >
//                 <p>Delete</p>
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       <div className="w-full pb-5">
//         <form
//           onSubmit={handleSubumit}
//           className="px-6 py-4 outline-1 outline outline-neutral-300 rounded-xl dark:outline-neutral-600 shadow hover:drop-shadow-md hover:shadow-md transition-all duration-150 dark:shadow-neutral-300 flex flex-col gap-y-4"
//         >
//           <h1 className="flex font-semibold text-base gap-2 py-2 items-center">
//             <BiCard className="text-yellow-800 text-3xl" />
//             <span>Add New Credit/Debit Card</span>
//           </h1>

//           <InputField
//             label="Card Holder Name*"
//             type="text"
//             onChange={HandleChange}
//             name="cardName"
//             placeholder="Ex. John"
//             value={formData.cardName}
//           />
//           <InputField
//             label="Card Holder Name*"
//             type="number"
//             onChange={HandleChange}
//             name="cardnumber"
//             placeholder="477423727569623405"
//             value={formData.cardnumber}
//           />

//           <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
//             <InputField
//               label="Expiry Date*"
//               type="date"
//               onChange={HandleChange}
//               name="date"
//               placeholder="Ex. John"
//               value={formData.date}
//             />
//             <InputField
//               label="Cvv*"
//               type="password"
//               onChange={HandleChange}
//               name="cvv"
//               placeholder="Ex. Doe"
//               value={formData.cvv}
//             />
//           </div>
//           <div className="flex items-center gap-1">
//             <input
//               type="checkbox"
//               name="save"
//               id="save"
//               onChange={HandleChange}
//             />
//             <label htmlFor="save" className="text-sm font-semibold opacity-85">
//               Save card for Future payments
//             </label>
//           </div>

//           <button
//             type="submit"
//             className={`outline-1 hover:rounded-full duration-200 my-3 ${buttonClassName} max-sm:w-full w-[150px]`}
//           >
//             <p>Add Card</p>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default Payment;
