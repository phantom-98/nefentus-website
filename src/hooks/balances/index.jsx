import { useState, useEffect } from "react";
import useInternalWallet from "../internalWallet";
import { web3Api } from "../../api/web3Api";
import { currencies } from "../../constants";

function useBalances(metamask) {
  const [balancesEx, setBalancesEx] = useState(initBalances());
  const [balancesIn, setBalancesIn] = useState(initBalances());
  let balances = [balancesEx, balancesIn];
  const { internalWalletAddress, fetchInternalWalletAddress } =
    useInternalWallet();
  const web3API = new web3Api();

  function initBalances() {
    return currencies().map((currency) => undefined);
  }

  async function fetchBalances() {
    let providerSource = "thirdweb";
    if (metamask.status === "connected" && metamask.address) {
      providerSource = "metamask";
    }
    const web3API = new web3Api(providerSource);

    metamask.address &&
      setBalancesEx(await fetchBalanceForWallet(web3API, metamask.address));

    internalWalletAddress &&
      setBalancesIn(
        await fetchBalanceForWallet(web3API, internalWalletAddress),
      );
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

  useEffect(() => {
    fetchBalances();
  }, [internalWalletAddress, metamask.address]);

  return { balances, fetchBalances };
}

export default useBalances;
