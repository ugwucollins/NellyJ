import TeamsModel from "../model/TeamsModel.js";
import { month, year } from "./Exporters.js";

export const GetAllTeams = async (req, res) => {
  try {
    const Teams = await TeamsModel.find({}).sort({ createdAt: -1 });
    if (!Teams.length) {
      return res.status(404).json({
        success: false,
        message: "Empty Teams Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: Teams,
      message: "All Teams",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetTeamsById = async (req, res) => {
  const { id } = req.params;
  try {
    const Teams = await TeamsModel.findById({ _id: id });
    if (!Teams) {
      return res.status(404).json({
        success: false,
        message: "TeamsId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: Teams,
      message: "users Teams Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetUsersTeams = async (req, res) => {
  const { email } = req.body;
  try {
    const usersTeams = await TeamsModel.findOne({ email: email });

    if (!usersTeams) {
      return res.status(404).json({
        success: false,
        message: "Users Teams Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: usersTeams,
      message: "Your Teams Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const CreateTeams = async (req, res) => {
  const userId = req.userId;

  const { name, email, imageUrl, handle, experience, role } = req.body;
  console.log(imageUrl);

  const data = {
    name: name,
    email: email,
    role: role ? role : "worker",
    experience: experience,
    handle: handle,
    imageUrl: imageUrl,
    createdBy: userId,
    month: month,
    year: year,
  };

  try {
    const existingUser = await TeamsModel.findOne({ email: email });
    if (!imageUrl) {
      return res.status(403).json({
        success: false,
        message: "Please provide a Users Image / photo",
      });
    }
    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "Worker Email Already been Created",
      });
    }

    const Teams = await TeamsModel.create(data);

    return res.status(201).json({
      success: true,
      data: Teams,
      message: "Teams Created Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateTeamsById = async (req, res) => {
  const { id } = req.params;
  const { name, email, handle, experience, role, status } = req.body;

  const data = {
    name: name,
    email: email,
    role: role ? role : "worker",
    experience: experience,
    handle: handle,
    status: status,
  };
  try {
    const Teams = await TeamsModel.findById({ _id: id });
    if (!Teams) {
      return res.status(404).json({
        success: false,
        message: "TeamsId Not Found",
      });
    }

    const UpdatedTeams = await TeamsModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: UpdatedTeams,
      message: "Teams Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const DeleteTeamsById = async (req, res) => {
  const { id } = req.params;
  try {
    const Teams = await TeamsModel.findOne({ _id: id });

    if (!Teams) {
      return res.status(404).json({
        success: false,
        message: " TeamsId Not Found",
      });
    }

    const DeletedTeams = await TeamsModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      data: DeletedTeams,
      message: "Teams Deleted Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
