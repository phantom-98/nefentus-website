import { currencies } from "../../constants";
import backendAPI from "../../api/backendAPI";
import { web3Api } from "../../api/web3Api";
import { nullToZeroAddress } from "../../utils";

export const usePayment = ({
  metamaskAddress,
  password,
  priceUSD,
  seller,
  transInfoArg,
}) => {
  async function handleBuy(providerSource, currencyIdx, quantity = 1) {
    // Checks
    if (!(priceUSD > 0.0)) {
      return "invalid price";
    }
    if (!seller) {
      return "invalid seller";
    }

    // Currently not used because it is always paid in Ethereum
    const currency = currencies[currencyIdx];
    const stablecoinAddress = currencies[1].address;
    // const quantity = 1;

    const backend_API = new backendAPI();

    if (providerSource === "metamask") {
      const web3API = new web3Api(providerSource);

      const hierarchy = await backend_API.getHierarchy(seller.id);

      const transactionInfo = await web3API.callDepositContract(
        nullToZeroAddress(hierarchy.sellerAddress),
        nullToZeroAddress(hierarchy.affiliateAddress),
        nullToZeroAddress(hierarchy.brokerAddress),
        nullToZeroAddress(hierarchy.seniorBrokerAddress),
        nullToZeroAddress(hierarchy.leaderAddress),
        stablecoinAddress,
        priceUSD,
      );

      if (transactionInfo) {
        transactionInfo.quantity = quantity;
        transactionInfo.totalPrice = priceUSD;

        web3API.convertBigIntToString(transactionInfo);
        const ret = await backend_API.setTransactionInfo(
          transactionInfo,
          metamaskAddress,
          transInfoArg,
        );
        if (ret) {
          return "success";
        } else {
          return "not sent";
        }
      } else {
        return "failed";
      }
    } else if (providerSource === "internal") {
      const ret = await backend_API.makePayment(
        null,
        priceUSD,
        quantity,
        password,
        stablecoinAddress,
        transInfoArg,
      );

      if (ret === "insufficientFunds") {
        return "insufficient fund";
      } else if (ret) {
        return "success";
      } else {
        return "failed";
      }
    }
  }

  return { handleBuy };
};
