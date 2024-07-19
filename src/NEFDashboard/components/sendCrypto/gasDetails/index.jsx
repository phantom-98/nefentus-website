import React from "react";
import { Flex } from "antd";
import LocalGasStationFilled from "../../../../assets/newDashboardIcons/local_gas_station_filled.svg";
import "../sendCrypto.css";
import { formatUSDBalance, formatTokenBalance } from "../../../../utils";
import { useTranslation } from "react-i18next";
// import { useTheme } from "../../context/themeContext/themeContext";
import { useEffect, useRef, useState } from "react";
import { currencies } from "../../../../constants";
import { uniswapApi } from "../../../../api/web3Api";
import { getCurrencySymbol } from "../../../../countries";
import { Skeleton } from "antd";

const GasDetail = ({
  token,
  setFee,
  currency = "USD",
  rate = 1,
  gasLimit = 600_000,
}) => {
  const { t } = useTranslation();
  // const { theme } = useTheme();
  const [gasValues, setGasValues] = useState({});
  const [gasPriceAsWei, setGasPrice] = useState(0);
  const [maxFee, setMaxFee] = useState(0);
  const [blockchain, setBlockchain] = useState({});
  const [blockchainPrice, setBlockchainPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const uniswap = new uniswapApi();
  const intervalRef = useRef();

  const init = async () => {
    const max = (gasValues?.gasPrice * gasLimit) / 10 ** blockchain?.decimals;
    setMaxFee(max);
    setFee &&
      setFee({
        native: blockchain?.abbr,
        gas: max,
        gasUSD: max * blockchainPrice,
        wei: gasPriceAsWei,
      });
    setLoading && setLoading(false);
  };

  const fetch = async () => {
    const getPromises = [
      uniswap.getGasValues(blockchain?.abbr),
      uniswap.getNativeTokenPrice(blockchain?.abbr),
    ];
    const [gas, tokenPrice] = await Promise.allSettled(getPromises);
    if (gas && gas?.value) {
      setGasValues(gas.value);
      setGasPrice(gas.value?.gasPrice);
    }
    if (tokenPrice) {
      setBlockchainPrice(tokenPrice?.value);
    }
  };

  useEffect(() => {
    setLoading && setLoading(true);
    setBlockchain(currencies().find((c) => token?.blockchain === c.abbr));
  }, [token?.abbr]);

  const startTimer = async () => {
    fetch();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetch, 30000);
  };
  useEffect(() => {
    if (blockchain?.abbr) {
      startTimer();
    }
    return () => clearInterval(intervalRef.current);
  }, [blockchain?.abbr]);

  useEffect(() => {
    init();
  }, [gasValues]);
  return (
    <>
      {loading ? (
        <Skeleton.Input active className="wallet-skeleton" />
      ) : (
        <Flex vertical gap={8} className="send-gas-price-container">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={5}>
              <div className="default-text-gray">
                {t("payments.fee.gasPrice")}
              </div>
              <div>{Math.round(gasPriceAsWei / 10 ** 9)} Gwei</div>
            </Flex>
            <Flex align="center" gap={5}>
              <div className="default-text-gray">
                {t("payments.fee.gasLimit")}
              </div>
              <div>{gasLimit}</div>
            </Flex>
          </Flex>

          <Flex align="center" justify="space-between">
            <Flex align="center" gap={5}>
              <img src={LocalGasStationFilled} alt="gas station logo" />
              <div className="default-text-gray">
                {t("payments.fee.maxFee")}
              </div>
            </Flex>
            <Flex align="center" gap={5}>
              <div className="default-text-gray">
                {formatTokenBalance(maxFee, 8)} {blockchain?.abbr}
              </div>
              <div>
                {getCurrencySymbol()[currency]}
                {formatUSDBalance(maxFee * blockchainPrice * rate)}
              </div>
            </Flex>
          </Flex>
          <div className="default-text gas-price-note">
            {t("payments.fee.updating")}
          </div>
        </Flex>
      )}
    </>
  );
};

export default GasDetail;
