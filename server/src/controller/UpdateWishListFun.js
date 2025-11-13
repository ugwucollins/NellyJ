import UserModel from "../model/UserModel.js";

export const UpdateWishList = async (req, res) => {
  const { wishListItems } = req.body;
  const userId = req.userId;

  try {
    const updateCart = await UserModel.findById({ _id: userId }).select(
      "-password"
    );
    if (!updateCart) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const updatedWishListItem = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        wishList: wishListItems,
      }
    ).select("-password");

    return res.status(200).json({
      message: "wishList Updated Successfully",
      data: updatedWishListItem,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating cart",
      success: false,
    });
  }
};
