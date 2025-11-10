import UserModel from "../model/UserModel.js";

export const GetAllUsers = async (req, res) => {
  res.send("hello users");
  try {
    const users = await UserModel.find({});
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Empty Users Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: users,
      message: "All User Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " UserId Not Found",
      });
    }
    console.log(user);

    return res.status(200).json({
      success: true,
      data: user,
      message: "All User Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateUserById = async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName, imageUrl, gender, phoneNumber } =
    req.body;
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " UserId Not Found",
      });
    }
    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      imageUrl: JSON.parse(imageUrl),
      gender: gender,
      phoneNumber: phoneNumber,
    };

    const UpdatedUser = await UserModel.findByIdAndUpdate({ _id: id }, data);
    return res.status(200).json({
      success: true,
      data: UpdatedUser,
      message: "User Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
export const UpdateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " UserId Not Found",
      });
    }

    const data = {
      password: password,
    };

    const UpdatedUser = await UserModel.findByIdAndUpdate({ _id: id }, data);
    return res.status(200).json({
      success: true,
      data: UpdatedUser,
      message: "User password has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
export const verifyUser = async (req, res) => {
  const userId = req.userId;
  try {
    const users = await UserModel.findById({ _id: userId });
    if (!users) {
      return res.status(404).json({
        message: "User not Found",
        success: false,
      });
    }
    const UserInfo = users;
    return res.status(200).json({
      success: true,
      data: UserInfo,
      message: "fetched User",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      status: false,
    });
  }
};
