import UserModel from "../model/UserModel.js";

export const UpdateUserCart = async (req, res) => {
  const { cartItems } = req.body;
  const { userId } = req;

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
    const updatedCartItem = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        cartItems: cartItems,
      }
    ).select("-password");

    return res.status(200).json({
      message: "Cart Updated Successfully",
      data: updatedCartItem,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating cart",
      success: false,
    });
  }
};
