import UserModel from "../model/UserModel.js";
import { month, tokenGenerator, year } from "./Exporters.js";
import bcrypt from "bcryptjs";
import DBConnect from "../connections/db.connect.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import nodemailer from "nodemailer";
import { ROLES } from "../middleware/role.middleware.js";

const { JWT_SECRET, EMAIL, PASSWORD, ROLEEMAIL, ROLEPASSWORD } = process.env;
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
    let userRoles;
    if (email === ROLEEMAIL && password === ROLEPASSWORD) {
      userRoles = ROLES.ADMIN;
    } else {
      userRoles = ROLES.USER;
    }
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      month: month,
      year: year,
      roles: userRoles,
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
    const user = await UserModel.findOne({ email: email });
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

export const Forget_Password = async (req, res) => {
  await DBConnect();
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Does Not Exist",
        success: false,
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Forget Password Verification",
      html: `
      <div>
      <h1>Hi ${user.lastName} ${user.firstName} </h1>
      <br/>
      <h2>Please Click the Link Below to Change your Password</h2>
      <a href="http://localhost:5173/auth/reset-password/${user._id}/${token}">Click Here, Please Don't Share the Link</a> 

      <h3>If You Didn't Request this Change, Please Ignore this Email</h3>
      <h3>Thanks</h3>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          message: "Sever Error In Sending Email",
          error: error.message,
          success: false,
        });
      }
      console.log("Email Sent Successfully");
      return res.status(200).json({
        message: "Email Sent Successfully",
        success: true,
      });
    });
  } catch (error) {
    res.status(501).json({
      message: "Sever Error In Forgetting Password",
      error: error.message,
      success: false,
    });
  }
};

export const Reset_Password = async (req, res) => {
  await DBConnect();
  const { password } = req.body;
  const { id, token } = req.params;
  try {
    if (!id) {
      return res.status(404).json({
        message: "Invalid Response",
        success: false,
      });
    }
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    if (!token) {
      return res.status(404).json({
        message: "No valid Token Provided",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const data = {
      password: hashedPassword,
    };
    const decoded = jwt.verify(token, JWT_SECRET);
    const UserId = decoded.id;

    if (!UserId) {
      return res.status(404).json({
        message: "User Details not Found",
        success: false,
      });
    }
    const userPassword = await UserModel.findByIdAndUpdate(
      { _id: UserId },
      data,
      {
        new: true,
      }
    );
    const newUser = userPassword;
    return res.status(200).json({
      message: "Password Changed Successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Sever Error In Reset_Password",
      error: error,
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
