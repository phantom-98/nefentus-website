import { useState, useContext, useEffect } from "react";
import Card from "../card/card";
import Convert from "../../../assets/icon/convert.svg";
import styles from "./converterCard.module.css";
import Button from "../button/button";

import Bitcoin from "../../../assets/icon/crypto/bitcoin.svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/themeContext/themeContext";
import NefentusLogo from "../../../assets/logo/logo_n.png";
import DropDownIcon from "../../../assets/icon/dropdown.svg";
import useInternalWallet from "../../../hooks/internalWallet";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
  walletConnect,
  useSwitchChain,
  coinbaseWallet,
  trustWallet,
  useWallet,
  useCreateWalletInstance,
  useSetConnectedWallet,
  ConnectWallet,
  useSigner,
} from "@thirdweb-dev/react";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import { usePayment } from "../../../hooks/payment";
import { currencies } from "../../../constants";
import { MessageContext } from "../../../context/message";
import backendAPI from "../../../api/backendAPI";
import {
  formatTokenBalance,
  formatUSDBalance,
  getWalletIcon,
} from "../../../utils";
import SwingSDK, {
  TransferStepResults,
  TransferStepResult,
  TransferRoute,
  TransferParams,
  Chain,
  Token,
  // type TransferQuote,
} from "@swing.xyz/sdk";
import { useCustomSwingSdk } from "../../../hooks/swing/useSwingSDK";

const ConverterCard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const backend_API = new backendAPI();
  const [wallets, setWallets] = useState([]);
  // const {internalWalletAddress} = useInternalWallet();
  // const connectedWallet = useWallet();
  // const connect = useConnect();
  // const disconnect = useDisconnect();
  // const setConnectedWallet = useSetConnectedWallet();
  // const activeExternalWalletAddress = useAddress();
  // const createWalletInstance = useCreateWalletInstance();
  const { balances, fetchBalances } = useBalances();
  const { prices, fetchPrices } = usePrices();
  const [price, setPrice] = useState(0);
  const [insufficient, setInsufficient] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // const switchNetwork = useSwitchChain();
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [fromCryptoIndex, setFromCryptoIndex] = useState(0);
  const [toCryptoIndex, setToCryptoIndex] = useState(0);
  const [swingSDK, setSwingSDK] = useState(null);
  const [receiveAmount, setReceiveAmount] = useState("");
  const [sendChains, setSendChains] = useState();
  const [receiveChains, setReceiveChains] = useState();
  const [fromChain, setFromChain] = useState();
  const [toChain, setToChain] = useState();
  const [fromToken, setFromToken] = useState();
  const [fromTokenBalance, setFromTokenBalance] = useState("0");
  const [toToken, setToToken] = useState();
  const [toTokenBalance, setToTokenBalance] = useState("0");
  const [toTokenLocalAmount, setToTokenLocalAmount] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [transferParams, setTransferParams] = useState({
    amount: "0",
    fromChain: "ethereum",
    fromToken: "ETH",
    fromUserAddress: "",
    toChain: "ethereum",
    toToken: "USDC",
    toUserAddress: "",
  });
  const [signer, setSigner] = useSigner();
  const switchNetwork = useSwitchChain();

  const cryptos = currencies().map((currency, index) => {
    return {
      title: currency.abbr,
      icon: currency.icon,
    };
  });
  const formatWalletAddress = (address, symbolCount = 8) => {
    if (!address || address.length <= symbolCount * 2 + 2) {
      return address;
    }

    const start = address.substring(0, symbolCount + 2);
    const end = address.substring(address.length - symbolCount);
    return `${start}....${end}`;
  };
  const fetchWallets = async () => {
    const list = await backend_API.getWalletAddresses();

    setWallets(
      list.map((wallet) => ({
        ...wallet,
        title: wallet?.type?.charAt(0)?.toUpperCase() + wallet?.type?.slice(1),
        description: formatWalletAddress(wallet?.address),
        icon: getWalletIcon(wallet?.type),
      })),
    );
  };

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);
  async function switchChain(chain) {
    if (!swingSDK) return;

    try {
      await embeddedWallet?.switchChain(chain.chainId);
      const signer = await embeddedWallet?.getSigner();

      // Connect wallet signer to Swing SDK
      const walletAddress = await swingSDK.wallet.connect(signer, chain.slug);
      // setWalletAddress(walletAddress);
      // console.log(walletAddress);
      // const balance = await swingSDK.wallet.getBalance(
      //   defaultTransferParams.fromChain,
      //   defaultTransferParams.fromToken,
      //   walletAddress,
      // );
      // setBalance(balance);

      setTransferParams((prev) => {
        return {
          ...prev,
          fromUserAddress: walletAddress,
          toUserAddress: walletAddress,
        };
      });
    } catch (error) {
      console.error("Switch Chain Error:", error);
    }
  }
  async function getQuote() {
    if (!swingSDK) return;

    // setIsLoading(true);

    try {
      // Get a quote from the Swing API
      const _quotes = await swingSDK.getQuote(transferParams);

      console.log(_quotes);

      if (!_quotes.routes.length) {
        // setIsLoading(false);
        setQuotes([]);
        setTransferRoute(null);
        return;
      }

      const bestQuote = _quotes.routes.sort(
        (a, b) => Number(a.quote.amount) - Number(b.quote.amount),
      )[0];
      const quoteIntegration = swingSDK.getIntegration(
        bestQuote.quote.integration,
      );

      setToTokenLocalAmount(bestQuote?.quote?.amountUSD);

      setQuotes(_quotes.routes);
      setTransferRoute({ ...bestQuote, ...quoteIntegration });
    } catch (error) {
      console.error("Quote Error:", error);
    }

    // setIsLoading(false);
  }
  async function startTransfer() {
    if (!swingSDK) return;

    if (!transferRoute) {
      console.log("transfer route error");
      return;
    }

    const transferListener = swingSDK.on(
      "TRANSFER",
      async (transferStepStatus, transferResults) => {
        // setStatus(transferStepStatus);
        // setResults(transferResults);

        console.log("TRANSFER:", transferStepStatus, transferResults);

        switch (transferStepStatus.status) {
          case "CHAIN_SWITCH_REQUIRED":
            await switchChain(transferStepStatus.chain);
            break;

          case "WALLET_CONNECTION_REQUIRED":
            await connectWallet();
            break;
        }
      },
    );

    setIsLoading(true);

    try {
      await swingSDK.transfer(transferRoute, transferParams);
    } catch (error) {
      console.error("Transfer Error:", error);
    }

    // Close the transfer listener
    transferListener();
    // setIsLoading(false);
  }
  useEffect(() => {
    fetchWallets();
    const swing = new SwingSDK({
      projectId: "nef",
      environment: "testnet",
      debug: true,
    });

    // setIsLoading(true);

    swing
      .init()
      .then(async () => {
        // setIsLoading(false);
        setSwingSDK(swing);

        const _sendChains = swing
          .getAvailableSendChains({
            type: "swap",
          })
          .filter((chain) => {
            const blockchain = chain.nativeToken?.symbol;
            return blockchain === "ETH" || blockchain === "BNB";
          });

        setSendChains(_sendChains);

        const _fromChain = _sendChains.find(
          (chain) => chain.nativeToken?.symbol === "ETH",
        );

        const _sendChainTokens = swing.getAvailableSendTokens({
          type: "swap",
          fromChainSlug: _fromChain.slug,
        });
        console.log("send", _sendChainTokens);
        const _fromToken = _sendChainTokens.find(
          (token) => token.symbol === "ETH",
        );

        setFromToken(_fromToken);
        setFromChain(_fromChain);

        const _receiveChains = swing
          .getAvailableReceiveChains({
            type: "swap",
            fromChainSlug: _fromChain.slug,
            fromTokenSymbol: _fromToken.symbol,
          })
          .filter((chain) => {
            const blockchain = chain.nativeToken?.symbol;
            return blockchain === "ETH" || blockchain === "BNB";
          });

        setReceiveChains(_receiveChains);

        const _toChain = _receiveChains.find(
          (chain) => chain.nativeToken?.symbol === "BNB",
        );

        const _receiveChainsTokens = swing.getAvailableReceiveTokens({
          type: "swap",
          toChainSlug: _toChain.slug,
          fromChainSlug: _fromChain?.slug,
          fromTokenSymbol: _fromToken.symbol,
        });
        const _toToken = _receiveChainsTokens.find(
          (token) => token.symbol === "BNB",
        );

        setToChain(_toChain);
        setToToken(_toToken);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.log(error.message);
        setSwingSDK(swing);
      });
  }, []);
  useEffect(() => {
    getQuote();
  }, [transferParams]);
  useEffect(() => {
    if (wallets[selectedWalletIndex]) {
      const address = wallets[selectedWalletIndex].address;
      fetchBalances(address);
      setTransferParams({
        ...transferParams,
        fromUserAddress: address,
        toUserAddress: address,
      });
    }
  }, [selectedWalletIndex, wallets]);
  useEffect(() => {
    setPrice((prev) => prev + 1);
    const currency = currencies();
    setFromChain(
      sendChains.find(
        (chain) =>
          chain.nativeToken?.symbol === currency[fromCryptoIndex].blockchain,
      ),
    );
    setFromToken(from);
  }, [fromCryptoIndex, toCryptoIndex]);

  return (
    <div className={styles.cardWrapper}>
      <Card className={`${styles.card}`}>
        <div className={styles.header}>
          <div style={{ fontSize: "1.4rem" }}>{t("converter.wallet")}</div>
          <Select
            data={wallets}
            selectedIndex={selectedWalletIndex}
            setSelectedIndex={setSelectedWalletIndex}
          />
        </div>

        <div className={styles.walletContainer}>
          <WalletBox
            title={t("converter.from")}
            selectedCryptoIndex={fromCryptoIndex}
            setSelectedCryptoIndex={setFromCryptoIndex}
            balances={balances}
            setAlert={setInsufficient}
          />
          <div className={styles.convertIconWrapper}>
            <div className={styles.convertIcon}>
              <img src={Convert} alt="" />
            </div>
          </div>
          <WalletBox
            title={t("converter.to")}
            selectedCryptoIndex={toCryptoIndex}
            setSelectedCryptoIndex={setToCryptoIndex}
            balances={balances}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
              fontSize: "1.4rem",
            }}
          >
            <span style={{ marginTop: "0.3rem", marginRight: "0.8rem" }}>
              1{cryptos[fromCryptoIndex].title} ≈ {price}{" "}
              {cryptos[toCryptoIndex].title}
            </span>
            <div style={{ cursor: "pointer" }}>
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.2637 3.70736C8.72397 1.94377 6.10401 1.45551 3.99997 2.67028C2.56099 3.50108 1.69079 4.9386 1.52717 6.47575C1.4882 6.84187 1.15981 7.10708 0.793689 7.06811C0.427567 7.02914 0.162359 6.70075 0.20133 6.33463C0.408115 4.39192 1.50964 2.56847 3.3333 1.51558C6.08587 -0.0736134 9.5355 0.638236 11.4548 3.05429L11.5272 2.78398C11.6225 2.42833 11.9881 2.21728 12.3437 2.31257C12.6994 2.40787 12.9104 2.77343 12.8151 3.12907L12.3271 4.95044C12.2813 5.12122 12.1696 5.26684 12.0165 5.35524C11.8633 5.44365 11.6814 5.4676 11.5106 5.42184L9.68921 4.93381C9.33357 4.83851 9.12251 4.47296 9.21781 4.11731C9.3131 3.76167 9.67866 3.55061 10.0343 3.64591L10.2637 3.70736ZM12.206 6.93296C12.5722 6.97193 12.8374 7.30032 12.7984 7.66645C12.5916 9.60915 11.4901 11.4326 9.66643 12.4855C6.914 14.0746 3.46457 13.3629 1.54523 10.9471L1.47289 11.2171C1.3776 11.5727 1.01204 11.7838 0.656395 11.6885C0.300751 11.5932 0.0896964 11.2277 0.184991 10.872L0.673025 9.05064C0.768319 8.695 1.13388 8.48395 1.48952 8.57924L3.31089 9.06727C3.66653 9.16257 3.87759 9.52813 3.78229 9.88377C3.687 10.2394 3.32144 10.4505 2.9658 10.3552L2.73597 10.2936C4.27565 12.0573 6.89567 12.5456 8.99976 11.3308C10.4387 10.5 11.3089 9.06247 11.4726 7.52532C11.5115 7.1592 11.8399 6.89399 12.206 6.93296Z"
                  fill="#078BB9"
                />
              </svg>
            </div>
          </div>
        </div>
        {insufficient && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
              fontSize: "1.4rem",
            }}
          >
            <svg
              style={{ marginRight: "0.8rem" }}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 13.3327V9.99935M9.99984 6.66602H10.0082M18.3332 9.99935C18.3332 14.6017 14.6022 18.3327 9.99984 18.3327C5.39746 18.3327 1.6665 14.6017 1.6665 9.99935C1.6665 5.39698 5.39746 1.66602 9.99984 1.66602C14.6022 1.66602 18.3332 5.39698 18.3332 9.99935Z"
                stroke="#A43C3C"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span style={{ marginTop: "0.3rem", color: "#A43C3C" }}>
              {t("converter.insufficient")} {cryptos[fromCryptoIndex].title}{" "}
              {t("converter.balance")}.
            </span>
          </div>
        )}
        <div className={styles.button}>
          <Button onClick={() => {}} disabled={insufficient} spinner={spinner}>
            {t("converter.convert")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConverterCard;

const WalletBox = ({
  title,
  selectedCryptoIndex,
  setSelectedCryptoIndex,
  balances,
  setAlert,
}) => {
  const { t } = useTranslation();
  const crypto = currencies().map((c) => {
    return {
      icon: c.icon,
      title: c.abbr,
    };
  });

  return (
    <div className={styles.walletBox}>
      <div className={styles.walletTop}>
        <div>{title}</div>
        <div>
          {t("converter.balance")}:{" "}
          {formatTokenBalance(balances[selectedCryptoIndex], 4)}{" "}
          {crypto[selectedCryptoIndex].title}
        </div>
      </div>
      <div className={styles.walletBody}>
        <Select
          data={crypto}
          selectedIndex={selectedCryptoIndex}
          setSelectedIndex={setSelectedCryptoIndex}
        />
        <div className={styles.inputWrapper}>
          <input
            type="number"
            placeholder="0.00"
            onChange={(e) => {
              if (setAlert) {
                if (parseFloat(e.target.value) > balances[selectedCryptoIndex])
                  setAlert(true);
                else setAlert(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Select = ({ data, selectedIndex, setSelectedIndex }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`${styles.select}`}
        onClick={() => setOpen((prev) => !prev)}
        onMouseLeave={() => setOpen(false)}
      >
        <SelectOption
          icon={data[selectedIndex]?.icon}
          optionTitle={data[selectedIndex]?.title}
          optionDescription={data[selectedIndex]?.description}
          alt={data[selectedIndex]?.alt}
          dropdown
        />
        {open && (
          <div className={styles.selectBody}>
            {data.map((item, index) => {
              return (
                <div key={index} onClick={() => setSelectedIndex(index)}>
                  <SelectOption
                    icon={item.icon}
                    optionTitle={item.title}
                    optionDescription={item.description}
                    alt={item.alt}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const SelectOption = ({
  icon,
  optionTitle,
  optionDescription,
  alt,
  dropdown,
}) => {
  return (
    <div
      className={`${styles.optionLineWrapper} ${
        optionDescription ? "" : styles.noDesc
      }`}
      style={{
        borderRadius: dropdown ? "8px" : "0",
      }}
    >
      <div className={styles.optionLine}>
        {optionDescription ? (
          <div className={styles.iconContainer}>
            <img src={icon} className={styles.icon} alt={alt} />
          </div>
        ) : (
          <img src={icon} className={styles.icon} alt={alt} />
        )}
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}> {optionTitle} </p>
          {optionDescription && (
            <p className={styles.optionDescription}> {optionDescription} </p>
          )}
        </div>
      </div>
      {dropdown && <img src={DropDownIcon} alt="dropdown" />}
    </div>
  );
};
