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
