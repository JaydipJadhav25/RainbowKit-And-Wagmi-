import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import SignMessage from "../utils/useSignMessage";
import useSignMessage from "../utils/useSignMessage";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

//app url
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/auth";

//set axios
axios.defaults.withCredentials = true;

const AuthContextProider = ({ children }) => {
  //definde state
  const [user, setUser] = useState(null);//all info about user
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  //   const { account, signMessage } = useWeb3();

     const signMessage = useSignMessage();

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  // Load current user
  const loadUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/me`);
      
      console.log("loadUser : " , response);

      setUser(response.data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  //lofginwithwallet
  const loginWithWallet = async (walletAddress) => {
    try {
      const nonceResponse = await axios.post(`${API_URL}/nonce`, {
        walletAddress,
      });
      //genrate usr message with properly unique nonce add
      const { nonce, message, isProfileComplete } = nonceResponse.data.data;
       console.log("gentate nonce and message : " , nonce , message , isProfileComplete);


      //message sign from user
      const signature = await signMessage(message);

      console.log("signture user : " , signature);


      //verify from backend
      // Step 3: Verify signature
      const verifyResponse = await axios.post(`${API_URL}/verify`, {
        walletAddress,
        signature,
      });
      //login in system
      const userData = verifyResponse.data.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      //check if profile is compelete or not then take next decision
      return {
        success: true,
        isProfileComplete: userData.isProfileComplete,
      };
    } catch (error) {
      console.error("Login error:", error);
      const message = error.response?.data?.message || "Failed to login";
      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };


  // Complete profile
  const completeProfile = async (name, role="teacher") => {
    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/complete-profile`, {
        name,
        role,
      });

      console.log("compelete profile respponse : " , response);


      const userData = response.data.data.user;
      setUser(userData);

      return {
        success: true,
      };
    } catch (error) {
      console.error('Profile completion error:', error);
      const message = error.response?.data?.message || 'Failed to complete profile';
      return {
        success: false,
        error: message,
      };

    } finally {

      setLoading(false);
    }
  };




    // Logout
  const logout = async () => {
    try {
      await axios.get(`${API_URL}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };



  //best pratise
  const value = {
    user,
    isAuthenticated,
    loading,
    loginWithWallet,
    completeProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProider;
