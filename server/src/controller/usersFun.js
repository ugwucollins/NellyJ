import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel.js";
import { ROLES } from "../middleware/role.middleware.js";

export const GetAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).sort({ createdAt: -1 });
    if (!users.length) {
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
export const GetAllSellers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "Empty Users Collection",
      });
    }

    const sellers = users.filter((item) => item.roles.includes(ROLES.SELLER));

    return res.status(200).json({
      success: true,
      data: sellers,
      message: "All sellers",
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
    const user = await UserModel.findById({ _id: id }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "UserId Not Found",
      });
    }

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
  const userId = req.userId;

  const { email, firstName, lastName, imageUrl, gender, phoneNumber } =
    req.body;

  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " UserId Not Found",
      });
    }
    if (!imageUrl) {
      return res.status(404).json({
        success: false,
        message: " User Image Not Found",
      });
    }
    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl,
      gender: gender,
      phoneNumber: phoneNumber,
    };

    const UpdatedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      data,
      {
        new: true,
      }
    );
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

export const UpdateUserStatusById = async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " UserId Not Found",
      });
    }

    const data = {
      status: status,
    };

    const UpdatedUserStatus = await UserModel.findByIdAndUpdate(
      { _id: id },
      data
    );
    return res.status(200).json({
      success: true,
      data: UpdatedUserStatus,
      message: "User status has been Updated",
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
  const { password, newPassword } = req.body;
  try {
    const user = await UserModel.findById({ _id: id }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " UserId Not Found",
      });
    }
    const IsOldPassword = await bcrypt.compare(password, user.password);

    if (IsOldPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      const data = {
        password: hashPassword,
      };
      const UpdatedUser = await UserModel.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        data: UpdatedUser,
        message: "User password has been Updated",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Old password did not match",
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const verifyUser = async (req, res) => {
  const { userId } = req;

  try {
    const users = await UserModel.findById({ _id: userId }).select("-password");
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
