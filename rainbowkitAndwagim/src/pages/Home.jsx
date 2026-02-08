import { useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';


function Home() {
    const { isConnected, isConnecting  , address} = useAccount();
    
    console.log("isconnected : " , isConnected , address);
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    
      // While wallet is connecting, don't redirect yet
      if (isConnecting) {
        return <p>Connecting wallet...</p>; // optional loader
      }
    
      // If not connected → redirect
      if (!isConnected) {
        return <Navigate to="/walletConnect" />;
      }



  return (
    <div>
        <h1>Home</h1>

        
      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
         user
        </button>
      )}

       {openChainModal && (
        <button onClick={openChainModal} type="button">
           Chain 
        </button>
      )}

    </div>
  )
}

export default Home