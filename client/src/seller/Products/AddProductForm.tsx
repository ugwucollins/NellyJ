import { useState } from "react";
import InputField from "../../context/InputField";
import TextAreaField from "../../context/TextAreaField";
import { buttonClassName } from "../../component/Animation";
import ProductImage from "../Context/ProductImage";
import toast from "react-hot-toast";
import SelectField from "../../context/SelectField";

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
  const [imageData, setimageData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    des: "",
    category: "",
    price: "",
    offerprice: "",
    deliveryFee: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      formData.category.trim() &&
      formData.name.trim() &&
      formData.des.trim() &&
      formData.price.trim() &&
      formData.offerprice.trim() &&
      imageData
    ) {
      console.log({ data: formData });

      toast.success("New Product Added Successfully");
      setFormData({
        name: "",
        des: "",
        category: "",
        price: "",
        offerprice: "",
        deliveryFee: "",
      });
    } else {
      toast.error("Please fill in the Required Space");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="py-2 mt-8">
            <h1 className="font-bold text-base py-2">Product Image</h1>
            <ProductImage setimageData={setimageData} />
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <InputField
              value={formData.name}
              type="text"
              placeholder="Type here"
              name="name"
              className="rounded-md"
              label="Product Name*"
              onChange={handleChange}
            />
            <TextAreaField
              value={formData.des}
              placeholder="Type here"
              name="des"
              className="rounded-md"
              label="Product Description"
              onChange={handleChange}
            />

            <SelectField
              value={formData.category}
              options={CategoryProduct}
              name="category"
              className="rounded-md"
              label="category"
              onChange={handleChange}
            />
            <SelectField
              value={formData.deliveryFee}
              options={DeliveryProduct}
              name="deliveryFee"
              className="rounded-md"
              label="deliveryFee"
              onChange={handleChange}
            />

            <div className="flex gap-2 max-[400px]:flex-col flex-row w-full">
              <InputField
                value={formData.price}
                type="number"
                placeholder="Type here"
                name="price"
                className="rounded-md"
                label="Price*"
                onChange={handleChange}
              />
              <InputField
                value={formData.offerprice}
                type="number"
                placeholder="Type here"
                name="offerprice"
                className="rounded-md"
                label="OfferPrice*"
                onChange={handleChange}
              />
            </div>

            <button className={` ${buttonClassName}`}>
              <p>Add Product</p>
            </button>
          </div>
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
  { title: "700", value: "700" },
  { title: "800", value: "800" },
  { title: "1,000", value: "1000" },
  { title: "1,500", value: "1500" },
  { title: "2,000", value: "2000" },
];
