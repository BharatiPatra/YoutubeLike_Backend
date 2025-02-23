import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("CLOUDINARY RESPONE", response, localFilePath);
    //file has been uploaded successfully
    console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
const deleteFromCloudinary = async (url) => {
  const publicId = extractPublicIdFromUrl(url); // Extract the public ID from the Cloudinary URL
  await cloudinary.v2.uploader.destroy(publicId); // Delete the image using the public ID
};

export { uploadOnCloudinary, deleteFromCloudinary };
