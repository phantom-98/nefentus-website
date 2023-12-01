import { useState, useEffect } from "react";
import backendAPI from "../../api/backendAPI";

function useInternalWallet() {
  // Use a öist even though currently only one wallet is supported
  const [walletList, setWalletList] = useState([]);
  const backend_Api = new backendAPI();

  async function fetchInternalWalletAddresses() {
    const newWalletList = await backend_Api.getWalletAddresses();
    if (newWalletList) {
      console.log(newWalletList);
      const newAddresses = newWalletList
        .filter((wallet) => wallet.internal)
        .map((wallet) => wallet.address);
      console.log(newAddresses);
      setWalletList(newAddresses);
    }
  }

  useEffect(() => {
    fetchInternalWalletAddresses();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      fetchInternalWalletAddresses();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return walletList.length > 0 ? walletList[0] : undefined;
}

export default useInternalWallet;
