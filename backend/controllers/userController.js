import { generateToken } from "../utils/generateToken.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "Account created successfully." });
  } catch (error) {
    console.error("Error in Register controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.error("Error in Login controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logout successful." });
  } catch (error) {
    console.log("Error in Logout controller: ", error);
    return res.status(500).json({ message: "Failed to logout" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId).select("-password"); //.populate("enrolledCourses")
    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Only populate enrolledCourses if the Course model exists
    try {
      await user.populate("enrolledCourses");
    } catch (error) {
      console.log(
        "Warning: Could not populate enrolledCourses:",
        error.message
      );
      // Continue without populated courses
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserProfile controller: ", error);
    return res.status(500).json({ message: "Failed to load user" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // extract public id of the old image from the url is it exists;
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
      deleteMediaFromCloudinary(publicId);
    }

    // upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Error in updateProfile controller: ", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};
