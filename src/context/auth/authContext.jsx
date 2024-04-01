// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import backendAPI from "../../api/backendAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [user, setUser] = useState({});
  const [currencyRate, setCurrencyRate] = useState({
    from: "USD",
    to: "USD",
    symbol: "$",
    rate: 1,
  });

  useEffect(() => {
    const fetchRate = async () => {
      const api = new backendAPI();
      const res = await api.getCurrencyRate();
      if (res) {
        setCurrencyRate({
          ...res,
          symbol: "€",
        });
      }
    };
    fetchRate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl,
        user,
        setUser,
        currencyRate,
        setCurrencyRate,
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
