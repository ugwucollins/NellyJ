import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
// import Image from "../model/ImageModel.js";
const { CLOUD_NAME, CLOUD_NAME_api_key, CLOUD_NAME_api_secret } = process.env;
const connectionCloudinary = () => {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_NAME_api_key,
    api_secret: CLOUD_NAME_api_secret,
  });
};

export default connectionCloudinary;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images"); // Destination folder for uploads
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filename
//   },
// });

export const ImageUpload = async (req, res) => {
  connectionCloudinary();
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(404)
        .json({ message: "No file uploaded", success: false });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "nelly_J",
    });

    const newImage = {
      imageUrl: result.secure_url,
      publicId: result.public_id,
      url: result.url,
    };

    res.status(200).json({
      message: "Image uploaded successfully",
      data: newImage,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during upload" });
  }
};
