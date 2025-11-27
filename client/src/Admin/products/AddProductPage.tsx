import HeaderProp from "../../context/HeaderProp";
import { adminPath, UserAuth } from "../../context/UserContext";
import { useState } from "react";
import { ZodInputField, ZodInputFieldNumber } from "../../context/InputField";
import { ZodTextAreaField } from "../../context/TextAreaField";
import { buttonClassName } from "../../component/Animation";
import toast from "react-hot-toast";
import { ZodSelectField } from "../../context/SelectField";
import ProductImage from "../../seller/Context/ProductImage";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../../Zod/Schema/Schemas";
import type { ProductField } from "../../Zod/typesField";
import { BiLoaderCircle } from "react-icons/bi";
import ApiURL from "../../context/Api";

const AddProductPage = () => {
  return (
    <div>
      <div className="w-full">
        <div className="w-full sticky top-0 z-[1]">
          <HeaderProp
            LinkText1="Home"
            LinkText2="products"
            AnText="Add Products"
            LinkPath={adminPath}
          />
        </div>
        <div className="px-4 py-5 z-0">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

export const AddProductForm = () => {
  return (
    <div className="px-4 my-5">
      <div className=" w-full max-w-4xl max-sm:shadow-xl pt-10 pb-16 rounded-3xl px-5">
        <h1 className="text-xl font-bold">Add New Product</h1>
        <AddProduct />
      </div>
    </div>
  );
};

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
        console.log({ values: dataInfo });
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

export const CategoryProduct = [
  { title: "Select Category", value: "" },
  { title: "Rice", value: "rice" },
  { title: "Soup", value: "soup" },
  { title: "Noddles", value: "noddles" },
  { title: "Local-Food", value: "local_food" },
];
export const DeliveryProduct = [
  { title: "700", value: 700 },
  { title: "800", value: 800 },
  { title: "1,000", value: 1000 },
  { title: "1,500", value: 1500 },
  { title: "2,000", value: 2000 },
];
export const ratingProduct = [
  { title: "1", value: 1 },
  { title: "2", value: 2 },
  { title: "3", value: 3 },
  { title: "4", value: 4 },
  { title: "5", value: 5 },
];
