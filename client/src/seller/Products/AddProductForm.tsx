import { useState } from "react";
import { ZodInputField, ZodInputFieldNumber } from "../../context/InputField";
import { ZodTextAreaField } from "../../context/TextAreaField";
import { buttonClassName } from "../../component/Animation";
import ProductImage from "../Context/ProductImage";
import toast from "react-hot-toast";
import { ZodSelectField } from "../../context/SelectField";
import { BiLoaderCircle } from "react-icons/bi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../../Zod/Schema/Schemas";
import type { ProductField } from "../../Zod/typesField";
import { ratingProduct } from "../../Admin/products/AddProductPage";
import ApiURL from "../../context/Api";
import { UserAuth } from "../../context/UserContext";

const AddProductForm = () => {
  return (
    <div className="px-4 my-5">
      <div className=" w-full max-w-4xl max-sm:shadow-xl pt-10 pb-16 rounded-3xl px-5">
        <h1 className="text-xl font-bold">Add New Product</h1>
        <AddProduct />
      </div>
    </div>
  );
};

export default AddProductForm;

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProductSchema),
  });
  const { options }: any = UserAuth();
  const [imageData, setimageData] = useState(null);
  const [img, setImg] = useState();

  const emptyValues = () => {
    setValue("category", "");
    setValue("name", "");
    setValue("price", "");
    setValue("offerPrice", "");
    setValue("rating", "");
    setValue("deliveryFee", "");
    setValue("description", "");
  };

  const onSubmit: SubmitHandler<ProductField> = async (values) => {
    const desArray: any = values.description;
    const dataInfo = {
      imageUrl: img || imageData,
      name: values.name,
      description: desArray.split("\n") || desArray.split(","),
      category: values.category,
      deliveryFee: +values.deliveryFee,
      price: +values.price,
      offerPrice: +values.offerPrice,
      icon: +values.rating,
    };

    try {
      console.log({ values: dataInfo });
      if (imageData) {
        const res = await ApiURL.post("/v1/product/create", dataInfo, options);
        const data = res.data;
        console.log(data);

        if (data.success) {
          toast.success(data.message || "New Product Added Successfully", {
            id: "product",
          });
          console.log(data);
          setTimeout(() => {
            emptyValues();
            console.log(data);
          }, 1000);
        } else {
        }
      } else {
        toast.error("please select an Image");
      }
    } catch (error: any) {
      console.log(error);

      toast.error("Please fill in the Required Space");
      setError("root", {
        message: error.message,
      });
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2 mt-8">
            <h1 className="font-bold text-base py-2">Product Image</h1>
            <ProductImage setimageData={setimageData} setImg={setImg} />
          </div>

          <div className="w-full flex flex-col gap-y-5">
            <ZodInputField
              value={register("name")}
              type="text"
              placeholder="Type here"
              className="rounded-md"
              label="Product Name*"
              error={errors.name?.message}
            />
            <ZodTextAreaField
              value={register("description")}
              placeholder="Type here"
              className="rounded-md"
              label="Product Description"
              error={errors.description?.message}
            />

            <ZodSelectField
              value={register("category")}
              options={CategoryProduct}
              className="rounded-md"
              label="category"
              error={errors.category?.message}
            />
            <ZodSelectField
              value={register("deliveryFee")}
              options={DeliveryProduct}
              className="rounded-md"
              label="deliveryFee"
              error={errors.deliveryFee?.message}
            />
            <ZodSelectField
              value={register("rating")}
              options={ratingProduct}
              className="rounded-md"
              label="Stars"
              error={errors.rating?.message}
            />

            <div className="flex gap-2 max-[400px]:flex-col flex-row w-full">
              <ZodInputFieldNumber
                value={register("price")}
                placeholder="Type here"
                className="rounded-md"
                label="Price*"
                error={errors.price?.message}
              />

              <ZodInputField
                value={register("offerPrice")}
                type="number"
                placeholder="Type here"
                className="rounded-md"
                label="OfferPrice*"
                error={errors.offerPrice?.message}
              />
            </div>

            <button className={` ${buttonClassName}`}>
              {isSubmitting ? (
                <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
              ) : (
                <p>Add Product</p>
              )}
            </button>
          </div>

          {errors.root && (
            <span className="text-base text-red-600 font-semibold">
              {errors.root.message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
// export const AddProduct = () => {
//   const [imageData, setimageData] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     des: "",
//     category: "",
//     price: "",
//     offerprice: "",
//     deliveryFee: "",
//   });

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((pre) => ({ ...pre, [name]: value }));
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     if (
//       formData.category.trim() &&
//       formData.name.trim() &&
//       formData.des.trim() &&
//       formData.price.trim() &&
//       formData.offerprice.trim() &&
//       imageData
//     ) {
//       console.log({ data: formData });

//       toast.success("New Product Added Successfully");
//       setFormData({
//         name: "",
//         des: "",
//         category: "",
//         price: "",
//         offerprice: "",
//         deliveryFee: "",
//       });
//     } else {
//       toast.error("Please fill in the Required Space");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div className="py-2 mt-8">
//             <h1 className="font-bold text-base py-2">Product Image</h1>
//             <ProductImage setimageData={setimageData} />
//           </div>
//           <div className="w-full flex flex-col gap-y-5">
//             <InputField
//               value={formData.name}
//               type="text"
//               placeholder="Type here"
//               name="name"
//               className="rounded-md"
//               label="Product Name*"
//               onChange={handleChange}
//             />
//             <TextAreaField
//               value={formData.des}
//               placeholder="Type here"
//               name="des"
//               className="rounded-md"
//               label="Product Description"
//               onChange={handleChange}
//             />

//             <SelectField
//               value={formData.category}
//               options={CategoryProduct}
//               name="category"
//               className="rounded-md"
//               label="category"
//               onChange={handleChange}
//             />
//             <SelectField
//               value={formData.deliveryFee}
//               options={DeliveryProduct}
//               name="deliveryFee"
//               className="rounded-md"
//               label="deliveryFee"
//               onChange={handleChange}
//             />

//             <div className="flex gap-2 max-[400px]:flex-col flex-row w-full">
//               <InputField
//                 value={formData.price}
//                 type="number"
//                 placeholder="Type here"
//                 name="price"
//                 className="rounded-md"
//                 label="Price*"
//                 onChange={handleChange}
//               />
//               <InputField
//                 value={formData.offerprice}
//                 type="number"
//                 placeholder="Type here"
//                 name="offerprice"
//                 className="rounded-md"
//                 label="OfferPrice*"
//                 onChange={handleChange}
//               />
//             </div>

//             <button className={` ${buttonClassName}`}>
//               <p>Add Product</p>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

export const CategoryProduct = [
  { title: "Select Category", value: "" },
  { title: "Rice", value: "rice" },
  { title: "Soup", value: "soup" },
  { title: "Noddles", value: "noddles" },
  { title: "Local-Food", value: "local_food" },
];
export const DeliveryProduct = [
  { title: "700", value: "700" },
  { title: "800", value: "800" },
  { title: "1,000", value: "1000" },
  { title: "1,500", value: "1500" },
  { title: "2,000", value: "2000" },
];
