import {UserModel} from "../model/user.mode.js"
import crypto from "node:crypto"



const getUserNonce = async(req, res) =>{
    try {
     
        //get walleraddress
     const { walletAddress } = req.body;

    console.log('Nonce request received for:', walletAddress);

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address is required'
      });
    }

    // Find or create user
    let user = await UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });

    console.log('User found:', user ? 'yes' : 'no');

    if (!user) {
      // Create new user with temporary role (will be set during profile completion)
      console.log('Creating new user...');
       
      //genrate nonce for user
      const userNonce = crypto.randomBytes(16).toString('hex');

      user = await UserModel.create({
        walletAddress: walletAddress.toLowerCase(),
        role: 'teacher', // Temporary default, will be updated in complete-profile
        nonce: userNonce,
        updatedAt: Date.now()
      });
      console.log('User created successfully');
      
    } else {
      // Generate new nonce for existing user
      console.log('Generating new nonce for existing user...');
      user.generateNonce();
      await user.save();
      console.log('Nonce updated successfully');
    }

    res.status(200).json({
      success: true,
      data: {
        nonce: user.nonce,
        message: user.getSignMessage(),
        isProfileComplete: user.isProfileComplete
      }
    });
  } catch (error) {
    console.error('Nonce generation error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }

}



export {
    getUserNonce,
}