import AddressModel from "../model/AddressModel.js";

export const GetAllAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.find({});
    if (!addresses.length) {
      return res.status(404).json({
        success: false,
        message: "Empty Addresses Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: addresses,
      message: "All Address Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await AddressModel.findById({ _id: id });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "AddressId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
      message: "All Address Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
export const GetAddressUsersById = async (req, res) => {
  const { id } = req.params;

  try {
    const address = await AddressModel.findOne({ createdBy: id });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "AddressId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
      message: "All Address Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetUsersAddress = async (req, res) => {
  const userId = req.userId;
  try {
    const usersAddress = await AddressModel.findOne({ createdBy: userId });
    if (!usersAddress) {
      return res.status(404).json({
        success: false,
        message: "Users Address Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: usersAddress,
      message: "Your Address Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const CreateAddress = async (req, res) => {
  const {
    title,
    address,
    city,
    state,
    country,
    email,
    phoneNumber,
    firstName,
    lastName,
    nearestBusTop,
  } = req.body;
  const userId = req.userId;

  const data = {
    title: title,
    address: address,
    city: city,
    state: state,
    country: country,
    email: email,
    phoneNumber: phoneNumber,
    firstName: firstName,
    lastName: lastName,
    nearestBusTop: nearestBusTop,
    createdBy: userId,
  };

  try {
    const address = await AddressModel.create(data);

    return res.status(201).json({
      success: true,
      data: address,
      message: "Address Created Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateUserAddressById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const {
    title,
    address,
    city,
    state,
    country,
    email,
    phoneNumber,
    firstName,
    lastName,
    nearestBusTop,
  } = req.body;
  try {
    const Address = await AddressModel.findOne({ createdBy: userId });

    if (!Address) {
      return res.status(404).json({
        success: false,
        message: " User Address Not Found",
      });
    }

    const data = {
      title: title,
      address: address,
      city: city,
      state: state,
      country: country,
      email: email,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      nearestBusTop: nearestBusTop,
    };

    const UpdatedUsersAddress = await AddressModel.findByIdAndUpdate(
      { _id: id },
      data
    );

    return res.status(200).json({
      success: true,
      data: UpdatedUsersAddress,
      message: "Your Address has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
export const UpdateAddressById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    address,
    city,
    state,
    country,
    email,
    phoneNumber,
    firstName,
    lastName,
    nearestBusTop,
  } = req.body;
  try {
    const Address = await AddressModel.findById({ _id: id });
    if (!Address) {
      return res.status(404).json({
        success: false,
        message: " AddressId Not Found",
      });
    }
    const data = {
      title: title,
      address: address,
      city: city,
      state: state,
      country: country,
      email: email,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      nearestBusTop: nearestBusTop,
    };

    const UpdatedAddress = await AddressModel.findByIdAndUpdate(
      { _id: id },
      data
    );

    return res.status(200).json({
      success: true,
      data: UpdatedAddress,
      message: "Address Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const DeleteAddressById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const address = await AddressModel.findOne({ createdBy: userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: " AddressId Not Found",
      });
    }

    const DeletedAddress = await AddressModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      data: DeletedAddress,
      message: "Address Deleted Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
