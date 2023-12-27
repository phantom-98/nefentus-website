import { useState, useEffect } from "react";
import useInternalWallet from "../internalWallet";
import { web3Api } from "../../api/web3Api";
import { currencies } from "../../constants";

function useBalances(metamask) {
  const [balances, setBalances] = useState([initBalances(), initBalances()]);
  let internalWalletAddress = useInternalWallet();
  const web3API = new web3Api();

  function initBalances() {
    return currencies().map((currency) => undefined);
  }

  async function fetchBalances(address) {
    const balances = address
      ? await fetchBalanceForWallet(address)
      : initBalances();
    setBalances(balances);
  }

  async function fetchBalanceForWallet(walletAddress) {
    const balances_list = await Promise.all(
      currencies().map((currency) =>
        web3API.getBalanceToken(
          currency.address,
          walletAddress,
          currency.blockchain,
        ),
      ),
    );
    return balances_list;
  }

  useEffect(() => {
    fetchBalances();
  }, [internalWalletAddress, metamask]);

  return { balances, fetchBalances };
}

export default useBalances;
