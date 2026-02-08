import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WalletConnect from "./WalletConnect";
import CheckWalletConnect from "./pages/CheckWalletConnect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/walletConnect" element={<WalletConnect />} />
      </Routes>
    </>
  );
}

export default App;
