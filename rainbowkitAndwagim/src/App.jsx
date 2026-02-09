import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WalletConnect from "./WalletConnect";
import CheckWalletConnect from "./pages/CheckWalletConnect";
import AuthContextProider from "./context/AuthContext";
import {Toaster} from "sonner"
import CompleteProfile from "./CompleteProfile";
import DashBord from "./pages/DashBord";


const AppRouter = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/walletConnect" element={<WalletConnect />} />
      <Route  path="/complete-profile" element={<CompleteProfile/>} />
      <Route  path="/dashboard" element={<DashBord/>}/>
    </Routes>
    </>
  );
};

function App() {
  return (
    <>
      <AuthContextProider>
         <AppRouter/>
         <Toaster
          position="top-center"
         />
      </AuthContextProider>
    </>
  );
}

export default App;
