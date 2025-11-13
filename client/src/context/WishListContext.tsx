import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApiURL from "./Api";
import { UserAuth } from "./UserContext";

const WishListProvider = createContext({});

const WishListContext = ({ children }: any) => {
  const { token, user }: any = UserAuth();
  const [saveItem, setsaveItem] = useState({});

  const AddsaveItem = async (itemId: any) => {
    let savedData: any = structuredClone(saveItem);
    if (savedData[itemId]) {
      savedData[itemId] = savedData[itemId] += 1;
    } else {
      savedData[itemId] = savedData[itemId] = 1;
    }
    setsaveItem(savedData);
    toast.success("Added Item to the WishList Successfully");
  };

  const RemovesavedItem = async (itemId: any) => {
    let savedData: any = structuredClone(saveItem);
    if (savedData[itemId]) {
      savedData[itemId] = savedData[itemId] -= 1;
      delete savedData[itemId];
      toast.success("Removed Item from WishList");
    }
    setsaveItem(savedData);
  };

  useEffect(() => {
    const info = {
      wishListItems: saveItem,
    };

    async function UpdateWishList() {
      try {
        const res = await ApiURL.post("/user/whishList/update", info, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        if (!data.success) {
          toast.error(data.message, { id: "wishList" });
        }
      } catch (error: any) {
        toast.error(error.response.data.message, { id: "wishList" });
      }
    }

    if (user) {
      UpdateWishList();
    }
  }, [saveItem]);

  const values = { saveItem, setsaveItem, AddsaveItem, RemovesavedItem };
  return (
    <WishListProvider.Provider value={values}>
      {children}
    </WishListProvider.Provider>
  );
};

export const UseSaveAuth = () => {
  return useContext(WishListProvider);
};

export default WishListContext;
