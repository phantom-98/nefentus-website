import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Flex,
  Drawer,
  Divider,
  Input,
  Collapse,
  Select,
  Skeleton,
} from "antd";
import ArrowUpLeft from "../../../assets/newDashboardIcons/arrow-up-left.svg";
import ArrowDown from "../../../assets/newDashboardIcons/arrow-down.svg";
import ArrowLeft from "../../../assets/newDashboardIcons/arrow-left.svg";
import ArrowRight from "../../../assets/newDashboardIcons/arrow-right.svg";
import Ethereum from "../../../assets/newDashboardIcons/ethereum-logo.svg";
import Bitcoin from "../../../assets/icon/crypto/bitcoin.svg";
import EthereumLogo from "../../../assets/icon/crypto/ethereum.svg";
import SwapHorizontal from "../../../assets/newDashboardIcons/swap-horizontal.svg";
import AddIcon from "../../../assets/newDashboardIcons/add.svg";
import SwapVertical from "../../../assets/newDashboardIcons/swap-vertical.svg";
import InfoIcon from "../../../assets/newDashboardIcons/info-gray.svg";
import RefreshIcon from "../../../assets/newDashboardIcons/refresh-blue.svg";
import LocalGasStation from "../../../assets/newDashboardIcons/local-gas-station.svg";
import ConverterIcon from "../../../assets/newDashboardIcons/converter-gray.svg";
import SuccessIcon from "../../../assets/newDashboardIcons/success.svg";
import ConverterSuccessBackground from "../../../assets/newDashboardIcons/converter-success-background.svg";
import "./converter.css";

import {
  useSwitchChain,
  useSigner,
  useConnect,
  metamaskWallet,
  walletConnect,
  coinbaseWallet,
  useWallet,
  useDisconnect,
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
import WalletAddressFormatter from "../../../func/walletAddressFormatter";
import { useTranslation } from "react-i18next";
import { PasswordPopup } from "../../../dashboardNew/components/popup/popup";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const items = [
  {
    key: "1",
    label: (
      <Flex align="center" gap={8}>
        <div>Quotes</div>
        <img src={InfoIcon} />
      </Flex>
    ),
    children: (
      <div>
        <div className="converter-total-amount-collapse-item">
          <Flex align="center" justify="space-between">
            <img src={LocalGasStation} alt="gas station logo" />
            <Flex align="center" gap={16}>
              <div>$44.32</div>
              <div>0.000521 ETH</div>
            </Flex>
          </Flex>
          <Flex align="center" justify="space-between">
            <div className="default-text">Estimated gas fee:</div>
            <div>
              <span className="default-text-gray">Max fee: </span>
              <span className="default-text">0.012241 ETH</span>
            </div>
          </Flex>
        </div>
        <Flex
          align="center"
          className="converter-total-amount-collapse-item"
          gap={8}
        >
          <div className="default-text-gray">
            Quotes include a 0.5% Nefentus fee
          </div>
          <img src={InfoIcon} />
        </Flex>
      </div>
    ),
    extra: <div className="default-text-gray">View details</div>,
  },
];

const Converter = ({
  openConvertModal,
  onCloseModal,
  handleConvertCrypto,
  onWalletSuccess,
}) => {
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openFromCryptoDrawer, setOpenFromCryptoDrawer] = useState(false);
  const [openToCryptoDrawer, setOpenToCryptoDrawer] = useState(false);
  const [step, setStep] = useState(1);

  const backend_API = new backendAPI();
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
  const [gas, setGas] = useState(-1);
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
  const disconnect = useDisconnect();
  const connect = useConnect();
  const walletInstance = useWallet();
  const cryptos = currencies().map((currency, index) => {
    return {
      title: currency.abbr,
      icon: currency.icon,
      name: currency.blockchain === "ETH" ? "Ethereum" : "Binance",
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
    onWalletSuccess(true);
    // Connect wallet signer to Swing SDK
    const walletAddress = await swingSDK.wallet.connect(
      _signer,
      transferParams.fromChain,
    );
  }
  async function switchChain(chain) {
    if (!swingSDK) return;

    await walletInstance?.switchChain(chain.chainId);
    const signer = await walletInstance?.getSigner();

    // Connect wallet signer to Swing SDK
    const walletAddress = await swingSDK.wallet.connect(signer, chain.slug);
    onWalletSuccess(true);
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
      requestSwap();
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
                // setInfoMessage(t("payments.swap.success"));
                fetchBalances(wallets[selectedWalletIndex].address);
                disconnect();
                setStep(3);
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
    fetchPrices();
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

  useEffect(() => {
    const chain = currencies()[fromCryptoIndex];
    console.log("gas", gas, amount);
    if (
      (chain.abbr === "ETH" || chain.abbr === "BNB") &&
      parseFloat(amount) + parseFloat(gas) > balances[fromCryptoIndex]
    ) {
      setInsufficient(true);
      return;
    }
    const native = currencies().findIndex(
      (item) => item.abbr === chain.blockchain,
    );
    if (
      parseFloat(amount) > balances[fromCryptoIndex] ||
      parseFloat(gas) > balances[native]
    ) {
      setInsufficient(true);
      return;
    }

    setInsufficient(false);
  }, [transferParams, gas, balances]);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setOpenFromCryptoDrawer(false);
    setOpenToCryptoDrawer(false);
  };
  return (
    <Modal
      title={
        step == 1 ? (
          <Flex align={"center"} gap={4} className="converter-content">
            <img src={ConverterIcon} />
            <div className="default-text-gray converter-title">
              {t("converter.title")}
            </div>
          </Flex>
        ) : step == 2 ? (
          <Flex align={"center"} gap={4} className="converter-content">
            <img
              src={ArrowLeft}
              alt="arrow-left"
              className="cursor-pointer"
              onClick={() => setStep(step - 1)}
            />
            {/* <div>Cancel</div> */}
            <div className="converter-step2-title">Confirmation</div>
          </Flex>
        ) : null
      }
      open={openConvertModal}
      width={420}
      className="converter"
      footer={null}
      onCancel={async () => {
        await disconnect();
        onWalletSuccess(false);
        onCloseModal();
      }}
    >
      <Flex
        vertical
        justify="center"
        gap={16}
        className={
          step == 3 ? "converter-body" : "converter-body converter-content"
        }
      >
        {step == 1 ? (
          <>
            <Col>
              <Flex vertical justify="center" gap={6}>
                <div className="default-text-gray">{t("converter.wallet")}</div>
                {wallets.length == 0 ? (
                  <Skeleton.Input active className="wallet-skeleton" />
                ) : (
                  <Flex
                    className="converter-wallet-container converter-full-width"
                    align="center"
                    justify="space-between"
                    onClick={() => setOpenDrawer(!openDrawer)}
                  >
                    <Flex align="center" gap={6}>
                      <div className="converter-logo-container">
                        <img
                          src={wallets[selectedWalletIndex].icon}
                          className="converter-logo"
                        />
                      </div>
                      <div>
                        <div className="default-text">
                          {wallets[selectedWalletIndex].title}
                        </div>
                        <div className="default-text-gray">
                          {wallets[selectedWalletIndex].description}
                        </div>
                      </div>
                    </Flex>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      <img src={ArrowDown} />
                    </Col>
                  </Flex>
                )}
              </Flex>
              {selectedWalletIndex == 0 && (
                <Flex vertical justify="center" gap={6}>
                  <div
                    className="default-text-gray"
                    style={{ marginTop: "1rem" }}
                  >
                    {t("sendModal.password")}
                  </div>
                  <Input.Password
                    placeholder={t("sendModal.passwordPlaceholder")}
                    className="send-crypto-wallet-address"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Flex>
              )}
            </Col>
            <Flex vertical gap={"12px"}>
              <div>
                <Flex
                  vertical
                  gap={8}
                  justify="center"
                  className="converter-content converter-item"
                >
                  <Flex align="center" justify="space-between" gap={8}>
                    <div className="default-text-gray">
                      {t("converter.from")}
                    </div>

                    <div>
                      <span className="default-text-gray">
                        {t("converter.balance")}:{" "}
                      </span>
                      <span className="default-text">
                        {formatTokenBalance(balances[fromCryptoIndex], 6)}{" "}
                        {currencies()[fromCryptoIndex].abbr}
                      </span>
                    </div>
                  </Flex>

                  <Flex
                    align="center"
                    justify="space-between"
                    className="converter-currency-dropdown-row"
                  >
                    <Flex
                      align="center"
                      gap={4}
                      className="converter-crypto-currency-dropdown"
                      onClick={() =>
                        setOpenFromCryptoDrawer(!openFromCryptoDrawer)
                      }
                    >
                      <img src={cryptos[fromCryptoIndex].icon} height={24} />
                      <div>{cryptos[fromCryptoIndex].title}</div>
                      <img src={ArrowDown} />
                    </Flex>
                    <input
                      className="converter-crypto-value"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </Flex>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  className="swap-between-items"
                  onClick={() => {
                    const tmp = fromCryptoIndex;
                    setFromCryptoIndex(toCryptoIndex);
                    setToCryptoIndex(tmp);
                  }}
                >
                  <img src={SwapVertical} alt="swap" />
                </Flex>

                <Flex
                  vertical
                  gap={8}
                  justify="center"
                  className="converter-content converter-item"
                >
                  <Flex align="center" justify="space-between" gap={8}>
                    <div className="default-text-gray">{t("converter.to")}</div>

                    <div>
                      <span className="default-text-gray">
                        {t("converter.balance")}:{" "}
                      </span>
                      <span className="default-text">
                        {formatTokenBalance(balances[toCryptoIndex], 6)}{" "}
                        {cryptos[toCryptoIndex].title}
                      </span>
                    </div>
                  </Flex>

                  <Flex
                    align="center"
                    justify="space-between"
                    className="converter-currency-dropdown-row"
                  >
                    <Flex
                      align="center"
                      gap={4}
                      className="converter-crypto-currency-dropdown"
                      onClick={() => setOpenToCryptoDrawer(!openToCryptoDrawer)}
                    >
                      <img src={cryptos[toCryptoIndex].icon} height={24} />
                      <div>{cryptos[toCryptoIndex].title}</div>
                      <img src={ArrowDown} />
                    </Flex>
                    <input
                      className="converter-crypto-value"
                      type="number"
                      placeholder="0.00"
                      value={receiveAmount}
                    />
                  </Flex>
                </Flex>
              </div>
              {price && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.4rem",
                    width: "100%",
                    justifyContent: "center",
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
                    {t("converter.insufficient")}{" "}
                    {cryptos[fromCryptoIndex].title} {t("converter.balance")}.
                  </span>
                </div>
              )}
              {gas >= 0 && (
                <div
                  style={{
                    width: "100%",
                    // marginTop: "1.8rem",
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
                      style={{
                        display: "flex",
                        gap: "0.4rem",
                        alignItems: "center",
                      }}
                    >
                      <img style={{ width: "1.4rem" }} src={LocalGasStation} />
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
                    <img style={{ width: "1.6rem" }} src={InfoIcon} />
                  </div>
                </div>
              )}
            </Flex>
          </>
        ) : step == 2 ? (
          <div>
            <Flex
              align="center"
              justify="center"
              gap={24}
              className="converter-content"
            >
              <Flex
                vertical
                justify="center"
                align="center"
                gap={8}
                className="crypto-coin-block"
              >
                <img src={Bitcoin} alt="coin" width={46} height={46} />
                <Flex vertical justify="center" align="center">
                  <div className="default-text converter-title">BTC</div>
                  <div className="default-text converter-step2-amount">
                    0.005
                  </div>
                </Flex>
              </Flex>

              <Flex
                align="center"
                justify="center"
                className="converter-right-arrow"
              >
                <img src={ArrowRight} alt="swap" />
              </Flex>

              <Flex
                vertical
                justify="center"
                align="center"
                gap={8}
                className="crypto-coin-block"
              >
                <img src={EthereumLogo} alt="coin" width={46} height={46} />
                <Flex vertical justify="center" align="center">
                  <div className="default-text converter-title">ETH</div>
                  <div className="default-text converter-step2-amount">
                    ≈ 0.051245
                  </div>
                </Flex>
              </Flex>
            </Flex>

            <Collapse
              // defaultActiveKey={["1"]}
              // onChange={onChange}
              expandIconPosition={"end"}
              items={items}
              className="converter-total-amount-collapse"
            />
          </div>
        ) : (
          <>
            <div
              style={{ backgroundImage: `url(${ConverterSuccessBackground})` }}
              className="converter-success-container"
            >
              <Flex
                vertical
                align="center"
                justify="center"
                className="converter-success-logo"
                gap={12}
              >
                <img src={SuccessIcon} alt="success" />
                <div className="default-text converter-title">
                  {t("converter.success")}
                </div>
              </Flex>
            </div>
            <Flex
              align="center"
              justify="center"
              gap={24}
              className="converter-content step3-block-item"
            >
              <Flex align="center" gap={8} className="crypto-coin-block">
                <img
                  src={cryptos[fromCryptoIndex].icon}
                  alt="coin"
                  width={36}
                  height={36}
                />
                <div>
                  <div className="default-text converter-title">
                    {cryptos[fromCryptoIndex].title}
                  </div>
                  <div className="default-text converter-title">{amount}</div>
                </div>
              </Flex>

              <Flex
                align="center"
                justify="center"
                className="converter-right-arrow"
              >
                <img src={ArrowRight} alt="swap" />
              </Flex>

              <Flex align="center" gap={8} className="crypto-coin-block">
                <img
                  src={cryptos[toCryptoIndex].icon}
                  alt="coin"
                  width={36}
                  height={36}
                />
                <div>
                  <div className="default-text converter-title">
                    {cryptos[toCryptoIndex].title}
                  </div>
                  <div className="default-text converter-title">
                    {receiveAmount}
                  </div>
                </div>
              </Flex>
            </Flex>
          </>
        )}

        {step == 1 ? (
          <Button
            className="converter-footer-button"
            onClick={async () => {
              if (selectedWalletIndex == 0) {
                const res = await backend_API.checkPassword(password);
                if (!res) {
                  setPassword("");
                  setErrorMessage(t("messages.error.passwordCorrect"));
                  return;
                }
              }
              startTransfer();
            }}
            disabled={
              insufficient ||
              fromCryptoIndex == toCryptoIndex ||
              (selectedWalletIndex == 0 && !password)
            }
            loading={spinner}
          >
            {t("converter.swap")}
          </Button>
        ) : step == 2 ? (
          <Button
            className="converter-footer-button"
            onClick={() => setStep(step + 1)}
          >
            Swap
          </Button>
        ) : (
          <Button
            className="converter-footer-button back-to-home"
            onClick={() => {
              onWalletSuccess(false);
              handleConvertCrypto();
            }}
          >
            {t("converter.close")}
          </Button>
        )}
      </Flex>

      <Drawer
        title={null}
        placement="bottom"
        closable={false}
        onClose={onCloseDrawer}
        open={openDrawer || openFromCryptoDrawer || openToCryptoDrawer}
        getContainer={false}
        height={300}
      >
        <Flex vertical gap={8} justify="center">
          <div className="converter-drawer-bar"></div>

          {openDrawer ? (
            <>
              <Flex align="center" justify="space-between">
                <div className="default-text-gray drawer-connect-wallet-title">
                  Connected Wallets
                </div>
                {/* <Button
                  icon={<img src={AddIcon} />}
                  onClick={() => walletRef?.current?.click()}
                >
                  Add Wallet
                  // <ConnectWallet ref={walletRef} />
                </Button> */}
              </Flex>
              <Flex vertical>
                {wallets.map((wallet, index) => (
                  <Flex
                    align="center"
                    gap={6}
                    className="converter-drawer-wallet"
                    onClick={() => {
                      setSelectedWalletIndex(index);
                      onCloseDrawer();
                    }}
                    key={index}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className="converter-drawer-wallet-logo"
                    >
                      <img src={wallet.icon} height={24} />
                    </Flex>
                    <div>
                      <div className="default-text">{wallet.title}</div>
                      <div className="default-text-gray">
                        {wallet.description}
                      </div>
                    </div>
                  </Flex>
                ))}
              </Flex>
            </>
          ) : (
            <Flex vertical>
              {cryptos.map((crypto, index) => (
                <Flex
                  className="converter-drawer-wallet"
                  onClick={() => {
                    openFromCryptoDrawer
                      ? setFromCryptoIndex(index)
                      : setToCryptoIndex(index);
                    onCloseDrawer();
                  }}
                  key={index}
                  justify="space-between"
                >
                  <Flex align="center" gap={6}>
                    <Flex
                      align="center"
                      justify="center"
                      className="converter-drawer-coin-logo"
                    >
                      <img src={crypto.icon} height={24} />
                    </Flex>
                    <div>
                      <div className="default-text">{crypto.name}</div>
                      <div className="default-text-gray">{crypto.title}</div>
                    </div>
                  </Flex>
                  <div>
                    <div>{formatTokenBalance(balances[index], 6)}</div>
                    <div>
                      $
                      {formatUSDBalance(
                        parseFloat(balances[index]) * parseFloat(prices[index]),
                      )}
                    </div>
                  </div>
                </Flex>
              ))}
            </Flex>
          )}
        </Flex>
      </Drawer>
    </Modal>
  );
};
export default Converter;
