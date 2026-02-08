import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

const CheckWalletConnect = ({ children }) => {
  const { isConnected, isConnecting } = useAccount();

  // While wallet is connecting, don't redirect yet
  if (isConnecting) {
    return <p>Connecting wallet...</p>; // optional loader
  }

  // If not connected → redirect
  if (!isConnected) {
    return <Navigate to="/walletConnect" />;
  }

  // If connected → show page
  return children;
};

export default CheckWalletConnect;
