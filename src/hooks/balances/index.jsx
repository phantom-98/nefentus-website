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

  async function fetchBalances() {
    const balancesEx = metamask.address
      ? await fetchBalanceForWallet(metamask.address)
      : initBalances();
    const balancesIn = internalWalletAddress
      ? await fetchBalanceForWallet(internalWalletAddress)
      : initBalances();
    setBalances([balancesEx, balancesIn]);
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
  }, [internalWalletAddress]);

  return { balances, fetchBalances };
}

export default useBalances;
