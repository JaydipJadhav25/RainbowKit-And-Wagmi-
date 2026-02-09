import { UserModel } from "../model/user.mode.js";
import crypto from "node:crypto";
import { verifySignature } from "../services/verifySignature.js";
import jwt from "jsonwebtoken";

const getUserNonce = async (req, res) => {
  try {
    //get walleraddress
    const { walletAddress } = req.body;

    console.log("Nonce request received for:", walletAddress);

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    // Find or create user
    let user = await UserModel.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    console.log("User found:", user ? "yes" : "no");

    if (!user) {
      // Create new user with temporary role (will be set during profile completion)
      console.log("Creating new user...");

      //genrate nonce for user
      const userNonce = crypto.randomBytes(16).toString("hex");

      user = await UserModel.create({
        walletAddress: walletAddress.toLowerCase(),
        role: "teacher", // Temporary default, will be updated in complete-profile
        nonce: userNonce,
        updatedAt: Date.now(),
      });
      // console.log('User created successfully');
    } else {
      // Generate new nonce for existing user
      // console.log('Generating new nonce for existing user...');
      user.generateNonce();
      await user.save();
      // console.log('Nonce updated successfully');
    }

    res.status(200).json({
      success: true,
      data: {
        nonce: user.nonce,
        message: user.getSignMessage(),
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    console.error("Nonce generation error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const userVerifyMessage = async (req, res) => {
  console.log("call.......................................................");

  try {
    const { walletAddress, signature } = req.body;

    console.log("walleraddres and signature  : ", walletAddress, signature);

    if (!walletAddress || !signature) {
      return res.status(400).json({
        success: false,
        message: "Wallet address and signature are required",
      });
    }

    // Find user
    const user = await UserModel.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    console.log("user is found : ", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please request a nonce first.",
      });
    }

    // Verify signature
    const message = await user.getSignMessage();

    console.log("user message : ", message);

    const isValid = verifySignature(walletAddress, message, signature); // return true or false

    //is false => wrong signature
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid signature",
      });
    }

    //update nonce for next login , not use same nonce
    // Generate new nonce for next login
    user.generateNonce();
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "superMan@123",
      { expiresIn: process.env.JWT_EXPIRE || "30d" },
    );

    // Set cookie
    const cookieOptions = {
      expires: new Date(
        Date.now() +
          (parseInt(process.env.JWT_COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true, // Always true for cross-site
      sameSite: "none", // Required for cross-site
    };

    res.cookie("token", token, cookieOptions); // set token

    res.status(200).json({
      success: true,
      token,
      data: {
        user: {
          id: user._id,
          walletAddress: user.walletAddress,
          name: user.name,
          role: user.role,
          isProfileComplete: user.isProfileComplete,
        },
      },
    });
  } catch (error) {
    console.error("Verification error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getUserProfile = async (req, res) => {
  const user = req.user;

  //return user info
  return res.status(200).json({
    message: "fetch user profile successfully",
    user: {
      id: user._id,
      walletAddress: user.walletAddress,
      name: user.name,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
      nonce : user.nonce
    },
  });
};

export { getUserNonce, userVerifyMessage, getUserProfile };
