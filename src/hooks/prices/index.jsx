import { useState, useEffect } from "react";
import { uniswapApi } from "../../api/web3Api";
import { currencies, blockchainToUSDC } from "../../constants";

function useBalances(metamask) {
  const [prices, setPrices] = useState([initPrices(), initPrices()]);
  const uniswapAPi = new uniswapApi();

  function initPrices() {
    return currencies().map((currency) => undefined);
  }

  async function fetchPrices() {
    const pricesList = await Promise.all(
      currencies().map((currency) =>
        uniswapAPi.getUSDCPriceForToken(
          currency.address,
          currency.blockchain,
          currency.decimals,
          blockchainToUSDC(currency.blockchain).decimals,
        ),
      ),
    );
    setPrices(pricesList);
  }

  useEffect(() => {
    fetchPrices();
  }, []);

  return { prices, fetchPrices };
}

export default useBalances;
