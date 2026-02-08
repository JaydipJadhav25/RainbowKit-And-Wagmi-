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


//config

const config = getDefaultConfig({
  appName: 'DApp',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const Disclaimer = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{' '}
    <Link href="https://disclaimer.xyz">jaydip</Link>
  </Text>
);


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
     <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
        modalSize='compact'
        theme={darkTheme({
        accentColor: '#7b3fe4',
        accentColorForeground: 'white',
        borderRadius: 'medium',
      })}
       appInfo={{
        appName: 'RainbowKit Demo',
        disclaimer: Disclaimer,
      }}
        >
           <App/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
)
