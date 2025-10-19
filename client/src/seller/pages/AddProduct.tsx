import HeaderProp from "../../context/HeaderProp";
import { sellerPath } from "../../context/UserContext";
import AddProductForm from "../Products/AddProductForm";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AddProduct = () => {
  return (
    <div>
      <>
        <Navbar />
        <div className="w-full flex mt-[68px] max-sm:mt-0">
          <Sidebar />
          <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
            <div className="w-full sticky top-0 z-[1]">
              <HeaderProp
                LinkText1="Home"
                LinkText2="addProduct"
                AnText="Add Product"
                LinkPath={sellerPath + "/addproduct"}
              />
            </div>
            <AddProductForm />
          </div>
        </div>
      </>
    </div>
  );
};

export default AddProduct;
