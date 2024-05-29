import { useState, useContext, useEffect } from "react";
import Card from "../card/card";
import Convert from "../../../assets/icon/convert.svg";
import styles from "./converterCard.module.css";
import Button from "../button/button";

import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/themeContext/themeContext";
import NefentusLogo from "../../../assets/logo/logo_n.png";
import DropDownIcon from "../../../assets/icon/dropdown.svg";
import InfoMarkDark from "../../../assets/icon/dark/info.svg";
import InfoMarkLight from "../../../assets/icon/light/info.svg";
import GasDark from "../../../assets/icon/dark/gas.svg";
import GasLight from "../../../assets/icon/light/gas.svg";
import {
  useSwitchChain,
  useSigner,
  useConnect,
  metamaskWallet,
  walletConnect,
  coinbaseWallet,
  useWallet,
} from "@thirdweb-dev/react";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import { currencies, getChainSlug, useMainnet } from "../../../constants";
import { MessageContext } from "../../../context/message";
import backendAPI from "../../../api/backendAPI";
import {
  formatTokenBalance,
  formatUSDBalance,
  getWalletIcon,
} from "../../../utils";
import SwingSDK from "@swing.xyz/sdk";
import { PasswordPopup } from "../popup/popup";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const ConverterCard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const backend_API = new backendAPI();
  const [pwd, setPwd] = useState(false);
  const [password, setPassword] = useState();

  const [wallets, setWallets] = useState([]);

  const { balances, fetchBalances } = useBalances();
  const { prices, fetchPrices } = usePrices();
  const [price, setPrice] = useState();
  const [insufficient, setInsufficient] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [fromCryptoIndex, setFromCryptoIndex] = useState(0);
  const [toCryptoIndex, setToCryptoIndex] = useState(3);
  const [swingSDK, setSwingSDK] = useState(null);
  const [receiveAmount, setReceiveAmount] = useState("");
  const [gas, setGas] = useState(0);
  const [gasUsd, setGasUsd] = useState(0);
  const [amount, setAmount] = useState("");
  const [bridge, setBridge] = useState("");
  const [transferRoute, setTransferRoute] = useState();
  const [transferParams, setTransferParams] = useState({
    amount: "",
    fromChain: "ethereum",
    fromToken: "ETH",
    fromUserAddress: "",
    toChain: "ethereum",
    toToken: "USDC",
    toUserAddress: "",
  });
  const [signer, setSigner] = useState();
  const connect = useConnect();
  const walletInstance = useWallet();
  const switchNetwork = useSwitchChain();

  const cryptos = currencies().map((currency, index) => {
    return {
      title: currency.abbr,
      icon: currency.icon,
    };
  });
  const formatWalletAddress = (address, symbolCount = 4) => {
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
        title:
          wallet?.type?.toLowerCase() === "internal"
            ? "Nefentus"
            : wallet?.type?.charAt(0)?.toUpperCase() + wallet?.type?.slice(1),
        description: formatWalletAddress(wallet?.address),
        icon: getWalletIcon(wallet?.type),
      })),
    );
  };

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);
  async function connectWallet(chainId) {
    if (!swingSDK) return;

    const wallet = wallets[selectedWalletIndex];
    const walletConfig =
      wallet?.type?.toLowerCase() === "metamask"
        ? metamaskWallet()
        : wallet?.type?.toLowerCase() === "walletconnect"
        ? walletConnect({
            qrModal: "walletConnect",
            qrModalOptions: {
              themeMode: "light",
            },
            recommended: true,
          })
        : wallet?.type?.toLowerCase() === "coinbase"
        ? coinbaseWallet({ recommended: true, qrmodal: "coinbase" })
        : null;
    const connection = await connect(walletConfig, { chainId });
    const _signer = await connection.getSigner();
    setSigner(_signer);

    // Connect wallet signer to Swing SDK
    const walletAddress = await swingSDK.wallet.connect(
      _signer,
      transferParams.fromChain,
    );

    // setTransferParams((prev) => {
    //   return {
    //     ...prev,
    //     fromUserAddress: walletAddress,
    //     toUserAddress: walletAddress,
    //   };
    // });
  }
  async function switchChain(chain) {
    if (!swingSDK) return;

    await walletInstance?.switchChain(chain.chainId);
    const signer = await walletInstance?.getSigner();

    // Connect wallet signer to Swing SDK
    const walletAddress = await swingSDK.wallet.connect(signer, chain.slug);

    // setTransferParams((prev) => {
    //   return {
    //     ...prev,
    //     fromUserAddress: walletAddress,
    //     toUserAddress: walletAddress,
    //   };
    // });
  }
  async function getQuote() {
    if (!swingSDK) return;
    if (!transferParams.amount || parseFloat(transferParams.amount) <= 0) {
      return;
    }

    setSpinner(true);

    try {
      // Get a quote from the Swing API
      const _quotes = await swingSDK.getQuote(transferParams);

      if (!_quotes.routes.length) {
        setSpinner(false);
        setTransferRoute(null);
        return;
      }

      const bestQuote = _quotes.routes.sort(
        (a, b) => Number(b.quote.amount) - Number(a.quote.amount),
      )[0];
      const quoteIntegration = swingSDK.getIntegration(
        bestQuote.quote.integration,
      );
      setBridge(bestQuote.quote.integration);
      setGas(
        (parseInt(bestQuote.gas) +
          parseInt(bestQuote.quote.bridgeFeeInNativeToken)) /
          10 ** 18,
      );
      setGasUsd(
        parseFloat(bestQuote.gasUSD) +
          parseFloat(bestQuote.quote.bridgeFeeInNativeTokenUSD),
      );

      const _amount =
        parseInt(bestQuote?.quote?.amount) / 10 ** bestQuote?.quote?.decimals;
      setReceiveAmount(_amount.toFixed(4).toString());
      setPrice(_amount / parseFloat(amount));

      setTransferRoute({ ...bestQuote, ...quoteIntegration });
    } catch (error) {
      console.error("Quote Error:", error);
      setErrorMessage(error.message);
    }

    setSpinner(false);
  }
  async function requestSwap() {
    setSpinner(true);
    try {
      const fromTokenAddress = currencies()[fromCryptoIndex].address;
      const body = {
        bridge,
        fromChain: transferParams.fromChain,
        tokenSymbol: transferParams.fromToken,
        tokenAddress: fromTokenAddress,
        toChain: transferParams.toChain,
        toTokenSymbol: transferParams.toToken,
        toTokenAddress: currencies()[toCryptoIndex].address ?? ZERO_ADDRESS,
        contractCall: false,
        fromAddress: transferParams.fromUserAddress,
        projectId: "nefentus",
      };
      if (fromTokenAddress) {
        const resAllow = await backend_API.httpRequest(
          "https://swap.prod.swing.xyz/v0/transfer/allowance",
          "get",
          body,
        );
        if (resAllow) {
          console.log("allowance", resAllow);
          const allowance = parseInt(resAllow["allowance"]);
          if (
            allowance <
            amount * 10 ** currencies()[fromCryptoIndex].decimals
          ) {
            //approve
            const resApprove = await backend_API.httpRequest(
              "https://swap.prod.swing.xyz/v0/transfer/approve",
              "get",
              {
                ...body,
                tokenAmount: Math.floor(
                  amount * 10 ** currencies()[fromCryptoIndex].decimals,
                ).toString(),
              },
            );
            if (resApprove) {
              console.log("approve", resApprove);
              resApprove.tx.forEach(async (tx) => {
                const approve = await backend_API.swap({
                  ...tx,
                  password,
                  blockchain: currencies()[fromCryptoIndex].blockchain,
                });
                if (approve) {
                  console.log("approve result", approve);
                } else {
                  throw Error(t("payments.swap.approveFailed"));
                }
              });
            } else {
              throw Error(t("payments.swap.apiFailed"));
            }
          }
        } else {
          throw Error(t("payments.swap.apiFailed"));
        }
      }

      const resTransfer = await backend_API.httpRequest(
        "https://swap.prod.swing.xyz/v0/transfer/send",
        "post",
        {
          ...body,
          tokenAmount: Math.floor(
            amount * 10 ** currencies()[fromCryptoIndex].decimals,
          ).toString(),
          toTokenAmount: transferRoute.quote.amount,
          fromTokenAddress: fromTokenAddress ?? ZERO_ADDRESS,
          fromUserAddress: transferParams.fromUserAddress,
          toUserAddress: transferParams.toUserAddress,
          route: transferRoute.route,
          type: "swap",
        },
      );
      if (resTransfer) {
        console.log("resTransfer", resTransfer);
        const transfer = await backend_API.swap({
          ...resTransfer.tx,
          gasLimit: parseInt(resTransfer.tx.gas),
          password,
          blockchain: currencies()[fromCryptoIndex].blockchain,
        });
        if (transfer) {
          console.log("transfer result", transfer);
          setInfoMessage(t("payments.swap.success"));
          fetchBalances(wallets[selectedWalletIndex].address);
        } else {
          throw Error(t("payments.swap.sendFailed"));
        }
      } else {
        throw new Error(t("payments.swap.apiFailed"));
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setSpinner(false);
  }
  async function startTransfer() {
    if (!swingSDK) return;

    if (!transferRoute) {
      console.log("transfer route error");
      return;
    }

    if (selectedWalletIndex === 0) {
      if (password) {
        requestSwap();
      } else {
        setPwd(true);
      }
      return;
    }

    setSpinner(true);
    const transferListener = swingSDK.on(
      "TRANSFER",
      async (transferStepStatus, transferResults) => {
        const transferId = transferResults.transferId;
        try {
          switch (transferStepStatus.status) {
            case "CHAIN_SWITCH_REQUIRED":
              await switchChain(transferStepStatus.chain);
              break;
            case "WALLET_CONNECTION_REQUIRED":
              await connectWallet();
              break;
            case "SUCCESS":
              if (transferStepStatus.step === "send") {
                setSpinner(false);
                setInfoMessage(t("payments.swap.success"));
                fetchBalances(wallets[selectedWalletIndex].address);
              }
              break;
            case "FAILED":
              if (transferStepStatus.step === "send") {
                setSpinner(false);
                setErrorMessage(t("payments.swap.sendFailed"));
              }
          }
        } catch (e) {
          swingSDK.cancelTransfer(transferId);
        }
      },
    );

    try {
      await swingSDK.transfer(transferRoute, transferParams);
    } catch (error) {
      setSpinner(false);
      console.log(error.message);
    }

    // Close the transfer listener
    transferListener();
  }
  useEffect(() => {
    fetchWallets();
    const swing = new SwingSDK({
      projectId: "nefentus",
      environment: useMainnet() ? "production" : "testnet",
      debug: true,
    });

    setSpinner(true);

    swing
      .init()
      .then(async () => {
        setSpinner(false);
        setSwingSDK(swing);
      })
      .catch((error) => {
        setSpinner(false);
        setErrorMessage(error.message);
        setSwingSDK(swing);
      });
  }, []);
  useEffect(() => {
    getQuote();
  }, [transferParams]);
  useEffect(() => {
    if (wallets[selectedWalletIndex]) {
      if (!walletInstance && selectedWalletIndex > 0) {
        try {
          connectWallet();
        } catch (e) {
          console.log("wallet connect failed");
        }
      }
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
    const _fromChain = getChainSlug(currencies()[fromCryptoIndex].blockchain);
    const _fromToken = currencies()[fromCryptoIndex].abbr;
    setTransferParams({
      ...transferParams,
      fromChain: _fromChain,
      fromToken: _fromToken === "USDT-BSC" ? "USDT" : _fromToken,
    });
  }, [fromCryptoIndex]);
  useEffect(() => {
    const _toChain = getChainSlug(currencies()[toCryptoIndex].blockchain);
    const _toToken = currencies()[toCryptoIndex].abbr;
    setTransferParams({
      ...transferParams,
      toChain: _toChain,
      toToken: _toToken === "USDT-BSC" ? "USDT" : _toToken,
    });
  }, [toCryptoIndex]);
  useEffect(() => {
    setTransferParams({
      ...transferParams,
      amount: amount,
    });
  }, [amount]);

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
            value={amount}
            setValue={setAmount}
            selectedCryptoIndex={fromCryptoIndex}
            setSelectedCryptoIndex={setFromCryptoIndex}
            balances={balances}
            setAlert={setInsufficient}
          />
          <div className={styles.convertIconWrapper}>
            <div
              className={styles.convertIcon}
              onClick={() => {
                const tmp = fromCryptoIndex;
                setFromCryptoIndex(toCryptoIndex);
                setToCryptoIndex(tmp);
              }}
            >
              <img src={Convert} alt="" />
            </div>
          </div>
          <WalletBox
            title={t("converter.to")}
            value={receiveAmount}
            selectedCryptoIndex={toCryptoIndex}
            setSelectedCryptoIndex={setToCryptoIndex}
            balances={balances}
          />
          {price && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
                fontSize: "1.4rem",
              }}
            >
              <span style={{ marginTop: "0.3rem", marginRight: "0.8rem" }}>
                1{cryptos[fromCryptoIndex].title} ≈ {price.toFixed(6)}{" "}
                {cryptos[toCryptoIndex].title}
              </span>
              <div style={{ cursor: "pointer" }} onClick={getQuote}>
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
          )}
        </div>
        {insufficient && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.4rem",
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
          <Button
            onClick={() => {
              startTransfer();
            }}
            disabled={insufficient || fromCryptoIndex == toCryptoIndex}
            spinner={spinner}
          >
            {t("converter.convert")}
          </Button>
        </div>
        {gas > 0 && (
          <div
            style={{
              width: "100%",
              marginTop: "1.8rem",
              fontSize: "1.4rem",
              border: "1px solid var(--border-color)",
              borderRadius: "0.6rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                marginTop: "0.3rem",
              }}
            >
              <div
                style={{ display: "flex", gap: "0.4rem", alignItems: "start" }}
              >
                <img
                  style={{ width: "1.4rem" }}
                  src={theme === "dark" ? GasDark : GasLight}
                />
                <span>{t("payments.fee.maxFee")}</span>:
              </div>
              <div
                style={{
                  display: "flex",
                  width: "17rem",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {formatTokenBalance(gas, 8)}
                  {currencies()[fromCryptoIndex].blockchain}
                </span>
                <span>${formatUSDBalance(gasUsd)}</span>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--border-color)",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "0.3rem", marginRight: "0.5rem" }}>
                {t("payments.fee.nefentusFee")}
              </p>
              <img
                style={{ width: "1.6rem" }}
                src={theme === "dark" ? InfoMarkDark : InfoMarkLight}
              />
            </div>
          </div>
        )}
      </Card>
      <PasswordPopup
        show={pwd}
        setShow={setPwd}
        password={password}
        setPassword={setPassword}
        onConfirm={async () => {
          const res = await backend_API.checkPassword(password);
          if (res) {
            setPwd(false);
            requestSwap();
          } else {
            setPassword("");
            setErrorMessage(t("messages.error.passwordCorrect"));
          }
        }}
      />
    </div>
  );
};

export default ConverterCard;

const WalletBox = ({
  title,
  value,
  setValue,
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
  useEffect(() => {
    if (setAlert) {
      if (parseFloat(value) > balances[selectedCryptoIndex]) setAlert(true);
      else setAlert(false);
    }
  }, [value, selectedCryptoIndex]);

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
              if (setValue) {
                setValue(e.target.value);
              }
            }}
            value={value}
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
