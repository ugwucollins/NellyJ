import UserModel from "../model/UserModel.js";
import { month, tokenGenerator, year } from "./Exporters.js";
import bcrypt from "bcryptjs";
import DBConnect from "../connections/db.connect.js";

export const Register = async (req, res) => {
  await DBConnect();
  const { firstName, lastName, email, password } = req.body;
  const ExistingUser = await UserModel.findOne({
    email: email,
  });

  try {
    if (ExistingUser) {
      return res.status(403).json({
        message: "User Info Already Exists",
        success: false,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      month: month,
      year: year,
    };
    const User = await UserModel.create(data);
    const savedUser = await User.save();

    return res.status(201).json({
      message: "User Registered Successfully",
      data: savedUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Registering User",
      error: error.message,
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  await DBConnect();
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Email Not Found",
        success: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(404).json({
        message: "Incorrect Password",
        success: false,
      });
    }
    const token = tokenGenerator(user._id);
    return res.status(200).json({
      message: "Login Successful",
      token: token,
      success: true,
    });
  } catch (error) {
    res.status(501).json({
      message: "Sever Error In Logging",
      error: error.message,
      success: false,
    });
  }
};

export const CompleteProfile = async (req, res) => {
  await DBConnect();
  const { phoneNumber, imageUrl, gender, email } = req.body;

  try {
    const UsersEmail = await UserModel.findOne({ email: email });
    console.log(imageUrl);

    const data = {
      imageUrl: imageUrl,
      gender: gender,
      phoneNumber: phoneNumber,
      isVerified: true,
    };

    if (!UsersEmail) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      data,
      {
        new: true,
      }
    );
    const savedUser = updatedUser;

    return res.status(200).json({
      message: "Updated User Info Successful",
      data: savedUser,
      success: true,
    });
  } catch (error) {
    res.status(501).json({
      message: "Sever Error In Completing Profile",
      error: error,
      success: false,
    });
  }
};
