import React from "react";
import { Flex } from "antd";
import LocalGasStationFilled from "../../../../assets/newDashboardIcons/local_gas_station_filled.svg";
import "../sendCrypto.css";
import { formatUSDBalance } from "../../../../utils";

const GasDetail = ({ gasLimit, gasValues, selectedCoin, selectedCurrency }) => {
  return (
    <Flex vertical gap={8} className="send-gas-price-container">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={5}>
          <div className="default-text-gray">Gas Price</div>
          <div>{Math.round(gasValues?.gasPrice / 10 ** 9)} gwei</div>
        </Flex>
        <Flex align="center" gap={5}>
          <div className="default-text-gray">Gas Limit</div>
          <div>{gasLimit}</div>
        </Flex>
      </Flex>

      <Flex align="center" justify="space-between">
        <Flex align="center" gap={5}>
          <img src={LocalGasStationFilled} alt="gas station logo" />
          <div className="default-text-gray">Max Fee</div>
        </Flex>
        <Flex align="center" gap={5}>
          <div className="default-text-gray">
            {(
              (gasValues?.gasPrice * gasLimit) /
              10 ** selectedCoin?.decimals
            ).toFixed(10)}{" "}
            {selectedCoin?.blockchain}
          </div>
          <div>
            {formatUSDBalance(
              ((gasValues?.gasPrice * gasLimit) /
                10 ** selectedCoin?.decimals) *
                selectedCoin?.price *
                +selectedCurrency?.price,
            )}
            {selectedCurrency?.icon}
          </div>
        </Flex>
      </Flex>
      <div className="default-text gas-price-note">
        Gas price is updating every 30sec
      </div>
    </Flex>
  );
};

export default GasDetail;
