import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
// import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';

import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { authenticationAdapter } from './Hooks/authenticationAdapter.js';
// import { metaMask } from 'wagmi/connectors';
import {BrowserRouter } from "react-router-dom"


//config

const config = getDefaultConfig({
  appName: 'DApp',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,//  client side 
});



const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize='wide'>
           <App/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </BrowserRouter>
)
