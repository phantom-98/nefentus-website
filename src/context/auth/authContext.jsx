// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AdminDashboardAPI from "../../api/adminDashboardApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [user, setUser] = useState({});
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
      const res = await new backendAPI().getRateList(currencyRate.to);
      console.log(res);
      res && setRateList(res);
    }
    fetchList();
  }, [currencyRate]);

  useEffect(() => {
    const checkIfAgent = async () => {
      const adminApi = new AdminDashboardAPI("agent");
      const res = await adminApi.checkPermission();
      console.log(res, "check if agent");
      if (res) {
        setAgent(true);
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
