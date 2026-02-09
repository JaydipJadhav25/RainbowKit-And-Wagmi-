import { useAccount } from "wagmi";
import { ethers } from "ethers";

const useSignMessage = () => {
  const { address, isConnected } = useAccount();

  const signMessage = async (message) => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error("Error signing message:", error);
      throw error;
    }
  };

  return signMessage;
};

export default useSignMessage;
