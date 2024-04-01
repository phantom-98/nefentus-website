import { useState, useEffect } from "react";
import { uniswapApi } from "../../api/web3Api";
import { currencies, blockchainToStablecoin } from "../../constants";
import { useAuth } from "../../context/auth/authContext";

function usePrices() {
  const [prices, setPrices] = useState(initPrices());
  const uniswapAPi = new uniswapApi();
  const { currencyRate } = useAuth();

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
          blockchainToStablecoin(currency.blockchain).decimals,
        ),
      ),
    );
    setPrices(pricesList.map((p) => p * currencyRate.rate));
  }

  useEffect(() => {
    fetchPrices();
  }, []);

  return { prices, fetchPrices };
}

export default usePrices;
