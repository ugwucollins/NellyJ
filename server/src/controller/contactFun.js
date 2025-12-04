import { month, year } from "../controller/Exporters.js";
import ContactModel from "../model/ContactModel.js";

export const GetAllContact = async (req, res) => {
  try {
    const contact = await ContactModel.find({});
    if (!contact.length) {
      return res.status(404).json({
        success: false,
        message: "Empty contact Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
      message: "All Booked Contact",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await ContactModel.findById({ _id: id });
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "contactId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
      message: "users contact Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetUsersContact = async (req, res) => {
  const userId = req.userId;
  try {
    const usersContact = await ContactModel.findOne({ contactedBy: userId });

    if (!usersContact) {
      return res.status(404).json({
        success: false,
        message: "Users Contact Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: usersContact,
      message: "Your Contact Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const CreateContact = async (req, res) => {
  const { name, userInfo, phoneNumber, message, subject, imageUrl, userId } =
    req.body;

  const data = {
    name: name,
    userInfo: userInfo,
    phoneNumber: phoneNumber,
    subject: subject,
    message: message,
    imageUrl: imageUrl,
    contactedBy: userId,
    month: month,
    year: year,
  };

  try {
    const Contact = await ContactModel.create(data);

    return res.status(201).json({
      success: true,
      data: Contact,
      message: "Contact Created Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateContactById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.userId;
  try {
    const Contact = await ContactModel.findById({ _id: id });
    if (!Contact) {
      return res.status(404).json({
        success: false,
        message: " ContactId Not Found",
      });
    }
    const data = {
      status: status,
      updatedBy: userId,
    };

    const UpdatedContact = await ContactModel.findByIdAndUpdate(
      { _id: id },
      data,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: UpdatedContact,
      message: "Contact Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const DeleteContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const Contact = await ContactModel.findOne({ _id: id });

    if (!Contact) {
      return res.status(404).json({
        success: false,
        message: " ContactId Not Found",
      });
    }

    const DeletedContact = await ContactModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      data: DeletedContact,
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
