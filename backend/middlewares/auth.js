import jwt from "jsonwebtoken";
import { UserModel } from "../model/user.mode.js";




export const useAuth = async (req, res, next) => {
  try {
    // 1. Extract token from cookies
    const token = req.cookies.token; 
    if (!token) {
        throw new Error("No token found in cookies");
    }

  
    const decodeData = jwt.verify(token, process.env.JWT_SECRET || "superMan@123");

   
    const user = await UserModel.findById(decodeData.id); 
    if (!user) {
        throw new Error("User Not Found!");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access!",
      error: error.message // Sending just the message is cleaner
    });
  }
};





