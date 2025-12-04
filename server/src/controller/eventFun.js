import EventModel from "../model/EventModel.js";
import { month, year } from "../controller/Exporters.js";

export const GetAllEvents = async (req, res) => {
  try {
    const event = await EventModel.find({}).sort({ createdAt: -1 });
    if (!event.length) {
      return res.status(404).json({
        success: false,
        message: "Empty event Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
      message: "All Booked Events",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById({ _id: id });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "EventId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
      message: "Each Booked Event Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetUsersEvent = async (req, res) => {
  const userId = req.userId;

  try {
    const usersEvent = await EventModel.find({ createdBy: userId }).sort({
      createdAt: -1,
    });
    if (!usersEvent) {
      return res.status(404).json({
        success: false,
        message: "Users Event Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: usersEvent,
      message: "Your Booked Event Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const CreateEvent = async (req, res) => {
  const {
    name,
    event,
    city,
    state,
    country,
    address,
    email,
    phoneNumber,
    town,
    foods,
    description,
    date,
    nearestBusTop,
    NumberOfGuest,
  } = req.body;
  const userId = req.userId;

  const data = {
    name: name,
    event: event,
    city: city,
    state: state,
    address: address,
    country: country,
    email: email,
    phoneNumber: phoneNumber,
    town: town,
    foods: foods,
    NumberOfGuest: NumberOfGuest,
    nearestBusTop: nearestBusTop,
    date: date,
    description: description,
    createdBy: userId,
    month: month,
    year: year,
  };

  try {
    const Event = await EventModel.create(data);

    return res.status(201).json({
      success: true,
      data: Event,
      message: "Event Created Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateUserEventById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const {
    name,
    event,
    city,
    state,
    country,
    email,
    phoneNumber,
    town,
    foods,
    description,
    date,
    nearestBusTop,
    NumberOfGuest,
  } = req.body;
  try {
    const Event = await EventModel.findOne({ createdBy: userId });

    if (!Event) {
      return res.status(404).json({
        success: false,
        message: " User Event Not Found",
      });
    }

    const data = {
      name: name,
      event: event,
      city: city,
      state: state,
      country: country,
      email: email,
      phoneNumber: phoneNumber,
      town: town,
      foods: foods,
      NumberOfGuest: NumberOfGuest,
      nearestBusTop: nearestBusTop,
      date: date,
      description: description,
    };

    const UpdatedUsersEvent = await EventModel.findByIdAndUpdate(
      { _id: id },
      data,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: UpdatedUsersEvent,
      message: "Your Event has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
export const UpdateEventById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const Event = await EventModel.findById({ _id: id });
    if (!Event) {
      return res.status(404).json({
        success: false,
        message: " EventId Not Found",
      });
    }
    const data = {
      status: status,
    };

    const UpdatedEvent = await EventModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: UpdatedEvent,
      message: "Event Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const DeleteEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const Event = await EventModel.findOne({ _id: id });

    if (!Event) {
      return res.status(404).json({
        success: false,
        message: " EventId Not Found",
      });
    }

    const DeletedEvent = await EventModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      data: DeletedEvent,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
