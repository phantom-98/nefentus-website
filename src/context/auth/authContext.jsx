// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import backend_api from "../../api/backendAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [user, setUser] = useState({});
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAgent, setAgent] = useState(false);
  const [currencyRate, setCurrencyRate] = useState({
    from: "USD",
    to: "USD",
    symbol: "$",
    rate: 1,
  });
  const [rateList, setRateList] = useState([]);
  useEffect(() => {
    async function fetchList() {
      const res = await new backend_api().getRateList(currencyRate.to);
      res && setRateList(res);
    }
    fetchList();
  }, [currencyRate]);

  useEffect(() => {
    const checkIfAgent = async () => {
      if (user) {
        const res = await new backend_api().checkIfAgent();
        if (res) {
          setAgent(res.isAgent);
        } else {
          setAgent(false);
        }
      }
    };
    checkIfAgent();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl,
        user,
        setUser,
        currencyRate,
        setCurrencyRate,
        isAgent,
        rateList,
        setRateList,
        isWalletConnected,
        setIsWalletConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
