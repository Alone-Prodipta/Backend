import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
  try 
  {
    if (!localPath) 
    {
      return null;
    }

    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    console.log("File uploaded on Cloudinary", response.url);
    return response;
  } 
  catch (error) 
  {
    console.error("Cloudinary upload failed:", error);

    if (localPath && fs.existsSync(localPath)) 
    {
      fs.unlinkSync(localPath);
    }

    return null;
  }
};
export default uploadOnCloudinary;
