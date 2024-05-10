import { useState, useEffect } from "react";
import useInternalWallet from "../internalWallet";
import { web3Api } from "../../api/web3Api";
import { currencies } from "../../constants";

function useBalances() {
  const [balances, setBalances] = useState(initBalances());
  const { internalWalletAddress } = useInternalWallet();
  const web3API = new web3Api();

  function initBalances() {
    return currencies().map((currency) => undefined);
  }

  async function fetchBalances(address) {
    address && setBalances(await fetchBalanceForWallet(address));
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
    return balances_list.map((balance) => parseFloat(balance));
  }

  return { balances, fetchBalances, fetchBalanceForWallet };
}

export default useBalances;
