import { asynchandler } from "../utilities/asynchandler.js";
import { apierror } from "../utilities/apierror.js";
import { user } from "../models/user.models.js";
import { apiResponse } from "../utilities/apierror.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";
const registerUser = asynchandler(async (req, res) => {
  // res.status(200).json({
  //     message: "Hey! whats up?",
  // })
  //code for user registration

  /*-------------------------ALGORITHM------------------------------*/

  // step 1: get data from user from frontend
  // step 2: validation -- not blank
  // step 3: check if user is present in the database or not (by email or username)
  // step 4: if avatar and images are present or not -- upload it to cloudinary
  // step 5: check if avatr is uploaded properly or not
  // step 6: create user object -- create entry in database(.create() funcn)
  // step 7: encripted password and refresh token feed from response
  // step 8: check for user creation and return the response or return err response

  /*-------------------------------------------------------------------- */

  const { fullname, email, username, password } = req.body;
  console.log("Email: ", email);
  console.log("fullname: ", fullname);
  console.log("username: ", username);
  console.log("password: ", password);

  //Aproach 1:
  /* if(fullname === "")
    {
        throw new apierror(400, "fullname is required");
    }*/
  //Aproach 2:
  if (
    [fullname, email, username, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new apierror(400, "All fields are required");
  }
  user.findOne({
    $or: [{ username }, { email }, { fullname }, { password }],
  });
  const exitedUser = await user.findOne({
    $or: [{ username }, { email }],
  });
  if (exitedUser) {
    throw new apierror("409", "user already exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new apierror("400", "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverimage = await uploadOnCloudinary(coverimageLocalPath);
  if (!avatarLocalPath) {
    throw new apierror("400", "Avatar file is required");
  }
  const user= await user.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverimage?.url || "",
    email,
    password,
    username: username.tolowercase(),
  });
  const createdUser= await user.findById(user._id).select("-password -refreshToken");     //fields which we dont want
  if(!createdUser)
  {
    throw new apierror(500,"error in registering the user");
  }
  return res.status(201).json(new apiResponse(200,createdUser,"User resgistration successful"));
});

export default registerUser;
