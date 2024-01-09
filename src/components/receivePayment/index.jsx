import styles from "./receivePayment.module.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import Tabs from "../tabs";
import TopInfo from "../../dashboard/topInfo/topInfo";
import Table from "../../components/table";
import MessageComponent from "../message";
import ModalOverlay from "../../dashboard/modal/modalOverlay";
import { MessageContext } from "../../context/message";
import NefentusLogo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../assets/logo/WalletConnect.svg";
import backendAPI from "../../api/backendAPI";
import { web3Api } from "../../api/web3Api";
import Button from "../../components/button/button";
import useInternalWallet from "../../hooks/internalWallet";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
  walletConnect,
  useWallet,
  ThirdwebProvider,
  useBalance,
} from "@thirdweb-dev/react";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { currencies, blockchainToUSDC, chainId } from "../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import { nullToZeroAddress } from "../../utils";
import { useTranslation } from "react-i18next";
import { OptionsWithImage } from "../../components/input/input";

const ReceivePayment = ({ priceUSD, userId, info, transInfoArg, disabled }) => {
  const { t } = useTranslation();
  const [payCurrency, setPayCurrency] = useState("ETH");

  const walletActions = {
    connect: useConnect(),
    disconnect: useDisconnect(),
    address: useAddress(),
    status: useConnectionStatus(),
    balance: useBalance(),
  };

  const { balances, fetchBalances } = useBalances();
  const { prices, fetchPrices } = usePrices();

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const backend_API = new backendAPI();

  useEffect(() => {
    clearMessages();
  }, []);

  async function registerWallet() {
    const result = await backend_API.registerWalletAddress(
      activeWallet.address,
    );
  }

  function findCurrency() {
    console.log(payCurrency);
    return currencies().find((currency) => currency.name === payCurrency.name);
  }

  async function handleBuy(currency, walletAddress, payWithExternalwallet) {
    // Checks
    if (!(priceUSD > 0.0)) {
      setErrorMessage(t("messages.error.invalidPrice"));
      return;
    }
    if (!userId) {
      setErrorMessage(t("messages.error.invalidUserId"));
      return;
    }

    const currencyAddress = currency.address;
    // Get stablecoin from backend
    const stablecoin = blockchainToUSDC(currency.blockchain);
    const quantity = 1;

    if (payWithExternalwallet) {
      const web3API = new web3Api();

      const [hierarchy, fees] = await Promise.all([
        backend_API.getHierarchy(userId),
        backend_API.getFees(userId),
      ]);
      console.log(hierarchy);
      console.log(fees);

      const transactionInfo = await web3API.callDepositContract(
        nullToZeroAddress(hierarchy.sellerAddress),
        nullToZeroAddress(hierarchy.affiliateAddress),
        nullToZeroAddress(hierarchy.brokerAddress),
        nullToZeroAddress(hierarchy.seniorBrokerAddress),
        nullToZeroAddress(hierarchy.leaderAddress),
        currency,
        stablecoin,
        priceUSD,
        fees?.serviceFee || 0.03,
        fees?.remainingFeeFree || 0,
      );

      if (transactionInfo) {
        transactionInfo.quantity = quantity;
        transactionInfo.totalPrice = priceUSD;

        web3API.convertBigIntToString(transactionInfo);
        const ret = await backend_API.setTransactionInfo(
          transactionInfo,
          walletAddress,
          transInfoArg,
        );
        if (ret) {
          setInfoMessage(t("messages.success.transaction"));
        } else {
          setInfoMessage(
            "Transaction successfully but could not send transaction info!",
          );
        }
      } else {
        setErrorMessage(t("messages.error.transactionFailed"));
      }
    } else {
      const ret = await backend_API.makePayment(
        currencyAddress,
        priceUSD,
        quantity,
        password,
        stablecoinAddress,
        transInfoArg,
      );

      if (ret === "insufficientFunds") {
        setErrorMessage(t("messages.error.transactionFailed2"));
      } else if (ret) {
        setInfoMessage(t("messages.success.transaction"));
      } else {
        setErrorMessage(t("messages.error.transactionFailed"));
      }
    }
  }

  return (
    <div className={styles.container}>
      <MessageComponent />

      <div className={styles.infoWrapper}>{info}</div>

      {disabled && (
        <div className={`card ${styles.productBuy}`}>
          <div className={styles.body}>
            <TopInfo
              title="Buy product"
              description="This product is currently unavailable."
            />
          </div>
        </div>
      )}

      {!disabled && (
        <div className={`card ${styles.productBuy}`}>
          <div className={styles.body}>
            <OptionsWithImage
              setValue={setPayCurrency}
              wallet={payCurrency}
              options={currencies().map((currency, idx) => {
                return {
                  name: currency.name,
                  icon: currency.icon,
                };
              })}
            />
            <ThirdwebProvider
              clientId="639eea2ebcabed7eab90b56aceeed08b"
              supportedWallets={metamaskWallet.config}
            >
              <div className={styles.buttonWrap}>
                <Button
                  onClick={async () => {
                    const currency = findCurrency();
                    console.log(
                      "Currency",
                      currency,
                      chainId(currency.blockchain),
                    );
                    const w = await walletActions.connect(metamaskWallet(), {
                      chainId: chainId(currency.blockchain),
                    });
                    console.log("Connected to", w);
                    console.log("address: ", walletActions.address);
                    handleBuy(currency, walletActions.address, true);
                  }}
                >
                  Pay
                </Button>
              </div>
            </ThirdwebProvider>
          </div>
        </div>
      )}
    </div>
  );
};

const Modal = ({
  price,
  currencyAbbr,
  onClose,
  onPay,
  password,
  setPassword,
}) => {
  return (
    <ModalOverlay>
      <div className={styles.modal}>
        <MessageComponent />

        <TopInfo
          title={"Password"}
          description={`Type in your password to pay with your Nefentus wallet`}
        />

        <Table
          data={[
            ["Amount:", `${price} USD`],
            ["Currency:", currencyAbbr],
          ]}
          colSizes={[1, 3]}
        />

        <div className={styles.modalInputs}>
          <Input
            label={"Password"}
            placeholder={"Enter password"}
            dashboard
            value={password}
            setState={setPassword}
            secure
          />
        </div>

        <div className={styles.modalButtons}>
          <Button onClick={onClose} color="black">
            Close
          </Button>
          <Button onClick={onPay} color="white">
            Pay
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ReceivePayment;
