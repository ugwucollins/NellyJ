import { RiProductHuntFill } from "react-icons/ri";
import { EmptyItems } from "../../component/ShoppingCart";
import { currency, UserProduct } from "../../context/ProductContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../context/Modal";
import { BiX } from "react-icons/bi";
import DateFormater from "../../context/DateFormat";
import ApiURL from "../../context/Api";
import { UserAuth } from "../../context/UserContext";
import InputField from "../../context/InputField";
import Loader from "../../context/Loader";

const ListProducts = () => {
  return (
    <div className=" w-full px-4 py-5">
      <h1 className="text-lg font-bold">All Products</h1>
      <ListProductsTable />
    </div>
  );
};

export const ListProductsTable = () => {
  const { products, setproducts, GetAllProducts }: any = UserProduct();
  const { options }: any = UserAuth();
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState("");
  const [findProducts, setFindProducts] = useState([]);
  const [search, setSearch] = useState<string>("");

  function handleChange(e: any) {
    setSearch(e.target.value);
  }

  function handleFind() {
    const filter = products.filter(
      (item: any) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      // item.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setFindProducts(filter);
  }

  useEffect(() => {
    setTimeout(() => {
      handleFind();
    }, 500);
  }, [search]);

  useEffect(() => {
    setproducts(products);
  }, [products]);

  const HandleClose = () => {
    setOpen(!open);
  };

  const HandleDelete = (itemId: any) => {
    const filter = products.filter((item: any) => item._id !== itemId);
    console.log(products);
    setproducts(filter);
  };

  const HandleActionModal = () => {
    HandleDelete(itemId);
    toast.success("Product Delete successfully", { id: "delete" });
    setItemId("");
    HandleClose();
  };

  return (
    <>
      {open && (
        <Modal
          OkayBtn="Yes"
          Title="Are you sure that you want to Delete these Product"
          CancelBtn="No"
          Progress={HandleActionModal}
          Cancel={HandleClose}
        />
      )}
      {/* search felid */}
      <div className="w-full pt-11 pb-4">
        {findProducts && (
          <div className="w-full flex justify-end max-sm:justify-start items-end">
            <div className="pr-10 w-80 pt-4 pl-4">
              <InputField
                onChange={handleChange}
                value={search}
                name="search"
                placeholder="Search for Products name"
                type="text"
                className="rounded-lg shadow-lg"
                label="Search Products*"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full overflow-hidden gap-8 flex items-center flex-col justify-center px-16 max-md:px-10 mb-5 max-sm:px-8 max-[200px]:px-1 max-[750px]:flex-col">
        <div className="flex w-full gap-y-7  items-center justify-center gap-x-2 flex-row max-sm:flex-col">
          <div className="overflow-hidden  w-full">
            {/* Product Table */}
            <div className="flex flex-col gap-2 overflow-auto px-2 py-2">
              <table className="w-full overflow-auto">
                <thead className="text-left bg-yellow-700 px-4 py-6 capitalize h-10 rounded-3xl w-full">
                  <tr>
                    <th className="pl-2">Product</th>
                    <th>price</th>
                    <th className="pl-2.5">Date Added</th>
                    <th>Category</th>
                    <th className="pr-2 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full overflow-x-auto">
                  {findProducts.map((item: any, index: number) => {
                    const even = index % 2 === 0;
                    return (
                      <tr key={index}>
                        <td className="pr-4">
                          <div className="flex w-full items-center justify-start gap-2 py-2">
                            <BiX
                              className="text-3xl cursor-pointer"
                              onClick={() => {
                                HandleClose();
                                setItemId(item._id);
                              }}
                            />
                            <div
                              className={`bg-neutral-100  p-4 rounded-md w-20 ${
                                even
                                  ? "dark:bg-neutral-600"
                                  : "dark:bg-neutral-300"
                              }`}
                            >
                              <img
                                src={item && item.imageUrl}
                                className="size-12 rounded-md object-cover"
                                alt={`${item.name} photo`}
                                loading="lazy"
                              />
                            </div>
                            <div className="whitespace-nowrap">
                              <p className="font-semibold text-base capitalize">
                                {item.name}
                              </p>
                              <span className="text-sm font-semibold opacity-60 capitalize">
                                Instock:{" "}
                                {item.instock === true ? "true" : "false"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="pr-4">
                          <div className="flex gap-0.5 items-center font-semibold text-base w-full whitespace-nowrap">
                            <p>{currency}</p>
                            <span> {item.price}</span>
                          </div>
                        </td>

                        <td className="pr-4 pl-2">
                          <div className=" opacity-80 capitalize font-semibold text-base whitespace-nowrap">
                            {DateFormater({
                              date: item && item.createdAt,
                              monthType: "short",
                            })}
                          </div>
                        </td>

                        <td className="pr-1 max-sm:pr-10  pl-2 whitespace-nowrap">
                          <div className="font-semibold text-base whitespace-nowrap">
                            <span className="text-base font-semibold capitalize whitespace-nowrap">
                              {item.category}
                            </span>
                            {/* <span
                            className={`${
                              item.instock ? "text-teal-800" : "text-red-800"
                            }`}
                          >
                            {item.instock ? "Instock" : "OutStock"}
                          </span> */}
                          </div>
                        </td>

                        <td className="pl-2 text-end pr-1">
                          <div className="w-full whitespace-nowrap">
                            <div className="px-4">
                              <label className=" relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                <input
                                  type="checkbox"
                                  checked={item ? item.instock : item.instock}
                                  onClick={async () => {
                                    try {
                                      const res = await ApiURL.put(
                                        "/v1/product/update/stock/" + item._id,
                                        { inStock: !item.instock },
                                        options
                                      );
                                      const data = res.data;
                                      console.log(data);
                                      if (data.success) {
                                        toast.success(data.message);
                                        GetAllProducts();
                                        console.log(item.instock);
                                      } else {
                                        toast.error(data.message);
                                      }
                                    } catch (error: any) {
                                      console.log(error);

                                      toast.error(error.response.data.message);
                                    }
                                  }}
                                  className="sr-only peer"
                                />
                                <div className=" w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200" />
                                <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {!findProducts.length && (
                <div className="w-full flex justify-center items-center text-center min-h-[40vh]">
                  <Loader className="w-20" size="size-16" />
                </div>
              )}

              {!products && (
                <EmptyItems
                  title="No Saved Items"
                  icon={<RiProductHuntFill />}
                  LinkPath="/product"
                  Text="Save More Items"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProducts;
