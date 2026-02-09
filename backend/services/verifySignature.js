import { verifyMessage } from "ethers"

export const verifySignature = (walletAddress, message, signature) => {
  try {
    // Recover the address from the signature
    const recoveredAddress =  verifyMessage(message, signature);
    
    // Compare addresses (case-insensitive)
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    console.error('Signature verification error:', error.message);
    return false;
  }
};