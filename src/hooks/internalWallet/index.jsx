import { useState, useEffect } from "react";
import backendAPI from "../../api/backendAPI";

function useInternalWallet() {
  // Use a öist even though currently only one wallet is supported
  const [internalWalletAddress, setInternalWalletAddress] = useState();
  const backend_Api = new backendAPI();

  async function fetchInternalWalletAddress() {
    const newWalletList = await backend_Api.getWalletAddresses();
    if (newWalletList) {
      const newAddresses = newWalletList
        .filter((wallet) => wallet.internal)
        .map((wallet) => wallet.address);
      setInternalWalletAddress(
        newAddresses.length > 0 ? newAddresses[0] : undefined,
      );
    }
  }

  useEffect(() => {
    fetchInternalWalletAddress();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      fetchInternalWalletAddress();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { internalWalletAddress, fetchInternalWalletAddress };
}

export default useInternalWallet;
