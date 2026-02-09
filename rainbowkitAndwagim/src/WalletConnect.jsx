import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function WalletConnect() {
  const { address, isConnecting, isConnected } = useAccount();


  console.log(isConnected , address);

  const { loginWithWallet } = useAuth();

  const navigate = useNavigate();

  //flow =>
  //1 first user connect wallet -> wagmi give status and accounr addres
  //2. sccuessfully get account address then show login botton ok
  //3. login => save in db and verify user signetuee  if all done det user cookis fro user is system authemticate
  //4 . check usr response and checl profile compelete if yes => ok . otherwise navigate om  profile complete

  //user login
  const handleLogin = async () => {
    try {
      //check user connect to wallet
      if (!address || !isConnected) {
        toast.warning("wallet not yet Connected!");
        return;
      }

      const result = await loginWithWallet(address);
       
      console.log("result : " , result);

      //check result and navigate
      //1.user profile is not compelte
      if (result.success) {
        if (result.isProfileComplete) {
          navigate("/dashboard");
        } else {
          navigate("/complete-profile");
        }
      }
    } catch (error) {
      console.log("user login error : ", error);
      toast.error("User Login Erro!");
    }
  };

  return (
    <div>
      {isConnecting && <h1>Wallet is Conneting......</h1>}

      {!isConnected ? (
        <>
          <ConnectButton />
        </>
      ) : (
        <>
        <button
        onClick={()=>{
          handleLogin();
        }}
        >Login </button>
        </>
      )}
    </div>
  );
}

export default WalletConnect;
