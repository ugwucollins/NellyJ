import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishListProvider = createContext({});

const WishListContext = ({ children }: any) => {
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

  useEffect(() => {}, [saveItem]);

  const values = { saveItem, AddsaveItem, RemovesavedItem };
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
