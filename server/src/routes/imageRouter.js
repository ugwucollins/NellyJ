import express from "express";
import "dotenv/config";
import { ImageUpload } from "../controller/ImageUpLoad.js";
import { upload } from "../middleware/image.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("image"), ImageUpload);

// const router = express.Router();
// Assuming 'upload' is configured as in the local storage example
// router.post("/upload", upload.single("image"), (req, res) => {
//   // 'image' is the field name from the frontend FormData
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   // Save file name/URL to MongoDB (if needed)
//   // const imageUrl = '/public/images/' + req.file.filename; // For local storage
//   // const newImage = new ImageModel({ url: imageUrl });
//   // await newImage.save();
//   res.status(200).json({
//     message: "Image uploaded successfully!",
//     filename: req.file.filename,
//   });
// });
export default router;
