import styles from "./receivePayment.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import MessageComponent from "../message";
import { MessageContext } from "../../context/message";
import NefentusLogo from "../../assets/logo/logo_n.png";
import WalletIcon from "../../assets/icon/wallets.svg";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../assets/logo/WalletConnect.svg";
import InfoMarkDark from "../../assets/icon/dark/info.svg";
import InfoMarkLight from "../../assets/icon/light/info.svg";
import PersonDark from "../../assets/icon/dark/user-square.svg";
import PersonLight from "../../assets/icon/light/user-square.svg";
import BuildingDark from "../../assets/icon/dark/building.svg";
import BuildingLight from "../../assets/icon/light/building.svg";
import DropDownIcon from "../../assets/icon/dropdown.svg";
import WarningIcon from "../../assets/icon/warn.svg";
import CheckedIcon from "../../assets/icon/checked.svg";
import backendAPI from "../../api/backendAPI";
import { uniswapApi, web3Api } from "../../api/web3Api";
import Button from "../../components/button/button";
import useInternalWallet from "../../hooks/internalWallet";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
  walletConnect,
  useSwitchChain,
  useSwitchAccount,
  coinbaseWallet,
  trustWallet,
  useWallet,
  useCreateWalletInstance,
  useSetConnectedWallet,
  ConnectWallet,
  safeWallet,
  zerionWallet,
  bloctoWallet,
  frameWallet,
  rainbowWallet,
  phantomWallet,
  okxWallet,
  coin98Wallet,
  coreWallet,
  cryptoDefiWallet,
  oneKeyWallet,
  rabbyWallet,
  xdefiWallet,
} from "@thirdweb-dev/react";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { usePayment } from "../../hooks/payment";
import { currencies } from "../../constants";
import {
  formatTokenBalance,
  formatUSDBalance,
  formatWalletAddress,
  getWalletIcon,
} from "../../utils";
import { useTranslation } from "react-i18next";
import Popup, {
  PasswordPopup,
} from "../../dashboardNew/components/popup/popup";
import { useAuth } from "../../context/auth/authContext";
import { useTheme } from "../../context/themeContext/themeContext";
import { GasDetails } from "../gasDetails/gasDetails";
import { useNavigate } from "react-router-dom";
import {
  getCountryList,
  getCurrencySymbol,
  getFlagLink,
} from "../../countries";
import { CombinedInput } from "../input/input";

const ReceivePayment = ({
  price,
  currency,
  seller,
  children,
  info,
  transInfoArg,
  vatPercent,
  disabled,
  valid,
}) => {
  const [sellerDropdown, openSellerDropdown] = useState(false);
  const { theme } = useTheme();

  const { internalWalletAddress, fetchInternalWalletAddress } =
    useInternalWallet();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser, currencyRate } = useAuth();
  const [wallets, setWallets] = useState([]);
  const connectedWallet = useWallet();
  const [walletInstance, setWalletInstance] = useState(null);
  const connect = useConnect();
  const disconnect = useDisconnect();
  const setConnectedWallet = useSetConnectedWallet();
  const activeExternalWalletAddress = useAddress();
  const createWalletInstance = useCreateWalletInstance();

  const [cryptoAmount, setCryptoAmount] = useState("0");
  const [feeUSD, setFeeUSD] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const { balances, fetchBalances } = useBalances();
  const { prices, fetchPrices } = usePrices();
  const switchNetwork = useSwitchChain();
  const switchAccount = async (address) => {
    try {
      if (activeExternalWalletAddress.toLowerCase() !== address.toLowerCase()) {
        await walletInstance.switchAccount();
      }
    } catch (e) {
      console.log("switching error: ", e.message);
    }
  };

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const cryptos = currencies().map((currency, index) => {
    return {
      title: currency.abbr,
      icon: currency.icon,
      description:
        balances[index] === undefined
          ? "loading..."
          : formatTokenBalance(balances[index]),
    };
  });
  const [selectedCryptoIndex, setSelectedCryptoIndex] = useState(0);

  const [isDisable, setDisable] = useState(true);

  // const [show, setShow] = useState(false);
  // const [email, setEmail] = useState("");
  const [priceUSD, setPriceUSD] = useState();
  const [rate, setRate] = useState(1);
  const [password, setPassword] = useState("");
  const [pwd, setPwd] = useState(false);
  useEffect(() => {
    async function getRate() {
      if (currency && price) {
        const res = await backend_API.getCurrencyRate("USD", currency);
        if (res) {
          setRate(res.rate);
          setPriceUSD((price * (100 + (vatPercent ?? 0))) / 100 / res.rate);
        }
      }
    }
    getRate();
  }, [price, vatPercent]);
  const { handleBuy } = usePayment({
    password,
    priceUSD,
    seller,
    transInfoArg,
    switchNetwork,
    switchAccount,
  });

  const backend_API = new backendAPI();

  const [warn, setWarn] = useState(false);

  useEffect(() => {
    fetchProfile();
    clearMessages();
  }, []);

  useEffect(() => {
    if (internalWalletAddress) {
      fetchBalances(internalWalletAddress);
    }
  }, [internalWalletAddress]);

  useEffect(() => {
    if (selectedWalletIndex == 0) {
      if (internalWalletAddress) {
        fetchBalances(internalWalletAddress);
      } else {
        !isDisable && setDisable(true);
      }
    } else {
      connectSelectedWallet();
    }
  }, [selectedWalletIndex]);

  useEffect(() => {
    if (
      balances[selectedCryptoIndex] * prices[selectedCryptoIndex] >
      priceUSD
    ) {
      isDisable && setDisable(false || disabled);
    } else {
      !isDisable && setDisable(true);
    }
  }, [balances, prices, priceUSD, selectedCryptoIndex]);

  useEffect(() => {
    const currency = currencies()[selectedCryptoIndex];
    const price = prices[selectedCryptoIndex];

    if (typeof price == "number") {
      const round = {
        ETH: 5,
        WETH: 5,
        BTC: 6,
        USDT: 2,
        USDC: 2,
        BNB: 4,
        WBNB: 4,
        DAI: 2,
        "USDT-BSC": 2,
      };
      setCryptoAmount(
        formatTokenBalance(priceUSD / price, round[currency.abbr]),
      );
    } else {
      setCryptoAmount("Loading...");
    }
  }, [selectedCryptoIndex, prices, priceUSD]);

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    if (activeExternalWalletAddress && !internalWalletAddress) {
      fetchBalances(activeExternalWalletAddress);
    }
  }, [activeExternalWalletAddress]);

  const fetchProfile = async () => {
    const data = await backend_API.getProfile();
    setUser({ ...data });
  };

  const fetchWallets = async () => {
    const list = await backend_API.getWalletAddresses();

    setWallets(
      list.map((wallet) => ({
        ...wallet,
        title:
          wallet?.type?.toLowerCase() === "internal"
            ? "Nefentus wallet"
            : wallet?.type?.charAt(0)?.toUpperCase() + wallet?.type?.slice(1),
        description: formatWalletAddress(wallet?.address),
        icon: getWalletIcon(wallet?.type),
      })),
    );
  };

  const connectSelectedWallet = async () => {
    const wallet = wallets[selectedWalletIndex];

    fetchBalances(wallet?.address);
    const currentWalletConfig =
      wallet?.type?.toLowerCase() === "metamask"
        ? metamaskWallet()
        : wallet?.type?.toLowerCase() === "walletconnect"
        ? walletConnect({
            // projectId: "4b9cb6ce8bcff9cedc49607dd34435e5",
            qrModal: "walletConnect", // or "walletConnect"
            qrModalOptions: {
              themeMode: "light",
            },
            recommended: true,
          })
        : wallet?.type?.toLowerCase() === "coinbase"
        ? coinbaseWallet({ recommended: true, qrmodal: "coinbase" })
        : wallet?.type?.toLowerCase() === "trust"
        ? trustWallet({
            projectId: "57e1cfc18509bb9cc4d51638ce8d18ed",
            recommended: true,
          })
        : wallet?.type?.toLowerCase() == "safe"
        ? safeWallet()
        : wallet?.type?.toLowerCase() == "zerionwallet"
        ? zerionWallet()
        : wallet?.type?.toLowerCase() == "blocto"
        ? bloctoWallet()
        : wallet?.type?.toLowerCase() == "frame"
        ? frameWallet()
        : wallet?.type?.toLowerCase() == "rainbowwallet"
        ? rainbowWallet()
        : wallet?.type?.toLowerCase() == "phantom"
        ? phantomWallet()
        : wallet?.type?.toLowerCase() == "okx"
        ? okxWallet()
        : wallet?.type?.toLowerCase() == "coin98"
        ? coin98Wallet()
        : wallet?.type?.toLowerCase() == "core"
        ? coreWallet()
        : wallet?.type?.toLowerCase() == "cryptodefi"
        ? cryptoDefiWallet()
        : wallet?.type?.toLowerCase() == "onekey"
        ? oneKeyWallet()
        : wallet?.type?.toLowerCase() == "rabby"
        ? rabbyWallet()
        : wallet?.type?.toLowerCase() == "xdefi"
        ? xdefiWallet()
        : null;
    if (
      connectedWallet === undefined ||
      connectedWallet?.address?.toLowerCase() != wallet?.address?.toLowerCase()
    ) {
      const response = createWalletInstance(currentWalletConfig);
      await response.connect();
      setConnectedWallet(response);
      setWalletInstance(response);
    }
  };

  async function doPayment() {
    if (!valid) {
      setErrorMessage("You need to input your name and email address.");
      return;
    }

    pwd && setPwd(false);
    if (isDisable) return;

    if (wallets?.length > 0 && !password && selectedWalletIndex == 0) {
      !pwd && setPwd(true);
      return;
    }
    setSpinner(true);

    const res = await handleBuy(
      selectedCryptoIndex,
      wallets?.length == 0
        ? activeExternalWalletAddress
        : selectedWalletIndex == 0
        ? internalWalletAddress
        : wallets[selectedWalletIndex]?.address,
      (wallets?.length == 0 && activeExternalWalletAddress) ||
        selectedWalletIndex != 0,
    );

    switch (res) {
      case "success":
        setDisable(true);
        setInfoMessage(t("messages.success.transaction"));
        fetchBalances(wallets[selectedWalletIndex]?.address);
        break;
      case "failed":
        setErrorMessage(t("messages.error.transactionFailed"));
        setPassword("");
        break;
      case "insufficient fund":
        setErrorMessage(t("messages.error.transactionFailed2"));
        setPassword("");
        break;
      case "not sent":
        setInfoMessage(t("messages.info.transactionNotSaved"));
        setPassword("");
        fetchBalances(wallets[selectedWalletIndex]?.address);
        break;
      case "invalid price":
        setErrorMessage(t("messages.error.invalidPrice"));
        break;
      case "invalid seller":
        setErrorMessage(t("messages.error.invalidUserId"));
        break;
    }

    setSpinner(false);
  }

  const selectInternalWallet = async () => {
    if (!Object.keys(user)?.length) {
      navigate("/login", {
        state: { redirectUrl: `/pay/${transInfoArg.invoiceLink}` },
      });
    } else {
      await disconnect();
      setSelectedWalletIndex(0);
    }
  };

  const onConnectExternalWallet = (wlt) => {
    if (wallets?.length) {
      const index = wallets.findIndex((w) => w.type === wlt.walletId);
      setSelectedWalletIndex(index);
    } else setConnectedWallet(wlt);
  };

  return (
    <div className={styles.container}>
      <MessageComponent />

      <div className={styles.wrapper}>
        {seller && (
          <div className={styles.sellerDropdown}>
            <div
              onClick={() => openSellerDropdown(false)}
              style={{
                display: sellerDropdown ? "block" : "none",
                background: "#000c",
                position: "fixed",
                left: "0",
                right: "0",
                bottom: "0",
                top: "6.8rem",
              }}
            >
              <div
                className={`${sellerDropdown ? styles.showSeller : ""} ${
                  styles.sellerForMobile
                }`}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                  }}
                >
                  <div className={styles.avatarWrapper}>
                    {seller.s3Url && (
                      <img
                        src={seller.s3Url}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    {!seller.s3Url && (
                      <span
                        style={{
                          fontSize: "1.4rem",
                          marginTop: "0.3rem",
                          color: "white",
                        }}
                      >
                        {seller.firstName[0]}
                        {seller.lastName[0]}
                      </span>
                    )}
                  </div>
                  <div className={styles.sellerInfo}>
                    <p className={styles.sellerTitle}>{t("payments.name")}</p>
                    <p className={styles.sellerValue}>
                      {seller.firstName} {seller.lastName}
                    </p>
                  </div>
                </div>
                <div className={styles.sellerInfo}>
                  <p className={styles.sellerTitle}>{t("payments.email")}</p>
                  <p className={styles.sellerValue}>{seller.email}</p>
                </div>
                {seller.tel && (
                  <div className={styles.sellerInfo}>
                    <p className={styles.sellerTitle}>{t("payments.number")}</p>
                    <p className={styles.sellerValue}>{seller.tel}</p>
                  </div>
                )}
                {seller.business && (
                  <div className={styles.sellerInfo}>
                    <p className={styles.sellerTitle}>
                      {t("payments.company")}
                    </p>
                    <p className={styles.sellerValue}>{seller.business}</p>
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <img src={NefentusLogo} style={{ width: "2.8rem" }} />{" "}
              <span style={{ marginTop: "0.4rem" }}>NEFENTUS</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.8rem",
                borderRadius: "0.6rem",
                fontSize: "1.6rem",
                border: "1px solid var(--border-color, #313131)",
              }}
              onClick={() => openSellerDropdown(!sellerDropdown)}
            >
              <span style={{ marginTop: "0.3rem", marginRight: "0.3rem" }}>
                {t("payments.seller")}
              </span>
              <img src={DropDownIcon} />
            </div>
          </div>
        )}
        <div className={styles.left}>
          <div className={styles.productBuy}>
            <div className={styles.payInfoHeader}>
              <h1 className={styles.headerTitle}>{t("payments.pay.title")}</h1>
            </div>
            <div className={styles.body}>
              {children}
              <div className={styles.paymentDetails}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    width: "100%",
                  }}
                >
                  {window.ethereum?.overrideIsMetaMask && (
                    <div
                      style={{
                        border: "1px solid var(--border-color)",
                        borderRadius: "0.6rem",
                        background: "var(--bg2-color)",
                        padding: "1rem",
                      }}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          setWarn((prev) => !prev);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            fontSize: "1.4rem",
                          }}
                        >
                          <img src={WarningIcon} />
                          <span>{t("payments.walletConflict")}</span>
                        </div>
                        <img
                          src={DropDownIcon}
                          style={{
                            transform: `rotate(${warn ? "180deg" : "0"})`,
                            transition: "0.2s ease",
                          }}
                        />
                      </div>
                      {warn && (
                        <p
                          style={{
                            maxWidth: "30rem",
                            fontSize: "1.2rem",
                            marginTop: "1rem",
                            color: "var(--text2-color)",
                          }}
                        >
                          {t("payments.conflictDescription")}
                        </p>
                      )}
                    </div>
                  )}
                  <div className={styles.walletWrapper}>
                    <div className={styles.chooseWallet}>
                      <p>{t("payments.chooseWallet")}</p>
                    </div>
                    <div className={styles.fullWidthBox}>
                      {internalWalletAddress && (
                        <Select
                          data={wallets}
                          selectedIndex={selectedWalletIndex}
                          setSelectedIndex={setSelectedWalletIndex}
                        />
                      )}
                      {!Object.keys(user)?.length && (
                        <div className={styles.unlogged}>
                          <div
                            className={styles.connectInternalButton}
                            onClick={selectInternalWallet}
                          >
                            <img
                              src={NefentusLogo}
                              alt="logo"
                              style={{ width: "1.4rem" }}
                            />
                            <span>
                              {t("payments.pay.internalWalletButtonTitle")}
                            </span>
                          </div>

                          {connectedWallet == undefined ? (
                            <div className={styles.connectWalletContainer}>
                              <img
                                src={WalletIcon}
                                alt="wallet"
                                style={{ width: "1.4rem" }}
                              />

                              <span>
                                {t("payments.pay.externalWalletButtonTitle")}
                              </span>
                              <ConnectWallet
                                onConnect={onConnectExternalWallet}
                                className={styles.externalWalletButton}
                              />
                            </div>
                          ) : (
                            <ConnectWallet
                              style={{ width: "100%" }}
                              onConnect={onConnectExternalWallet}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.walletWrapper}>
                    <div className={styles.chooseWallet}>
                      <p>{t("payments.chooseCoin")}</p>
                    </div>
                    <div className={styles.fullWidthBox}>
                      <Select
                        data={cryptos}
                        selectedIndex={selectedCryptoIndex}
                        setSelectedIndex={setSelectedCryptoIndex}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.total}>
                  <p>{t("payments.total")}</p>
                  <p>
                    {getCurrencySymbol()[currency]}
                    {formatUSDBalance(
                      (price * (100 + (vatPercent ?? 0))) / 100,
                    )}
                  </p>
                  {vatPercent != null && parseFloat(vatPercent) > 0 && (
                    <p
                      style={{
                        color: "var(--text2-color)",
                        margin: "-0.8rem 0 0.8rem 0",
                      }}
                    >
                      {t("payments.informVAT1")} {vatPercent}% (
                      {getCurrencySymbol()[currency]}
                      {formatUSDBalance((price * vatPercent) / 100)}){" "}
                      {t("payments.informVAT2")}
                    </p>
                  )}
                  <p className={styles.cryptoTitle}>
                    {t("payments.cryptoAmount")}
                    <div className={styles.tooltip}>
                      <span className={styles.tooltiptext}>
                        {t("payments.cryptoDescription")}
                      </span>
                      <img
                        style={{ width: "1.4rem" }}
                        src={theme === "dark" ? InfoMarkDark : InfoMarkLight}
                      />
                    </div>
                  </p>
                  <div className={styles.cryptoBody}>
                    <div className={styles.cryptoAmount}>{cryptoAmount}</div>
                    <SelectOption
                      icon={cryptos[selectedCryptoIndex].icon}
                      optionTitle={cryptos[selectedCryptoIndex].title}
                      className={styles.nonOption}
                    />
                  </div>
                </div>
              </div>
              <GasDetails
                token={currencies()[selectedCryptoIndex]}
                cryptoAmount={parseFloat(cryptoAmount)}
                usdAmount={parseFloat(priceUSD)}
                setFeeUSD={setFeeUSD}
                currency={currency}
                rate={rate}
              />
              <div className={styles.paymentWrapper}>
                <Button
                  style={{ width: "100%" }}
                  disabled={isDisable}
                  onClick={() => doPayment()}
                  spinner={spinner}
                >
                  {t("payments.payButton").concat(" ")}
                  {getCurrencySymbol()[currency]}
                  {formatUSDBalance((priceUSD + feeUSD) * rate)}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.infoWrapper}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-start",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {seller && (
                <div className={styles.sellerWrapper} style={{ width: "100%" }}>
                  <p>{t("payments.seller")}</p>
                  <div className={styles.sellerContainer}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                      }}
                    >
                      <div className={styles.avatarWrapper}>
                        {seller.s3Url && (
                          <img
                            src={seller.s3Url}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        {!seller.s3Url && (
                          <span
                            style={{
                              fontSize: "1.4rem",
                              marginTop: "0.3rem",
                              color: "white",
                            }}
                          >
                            {seller.firstName[0]}
                            {seller.lastName[0]}
                          </span>
                        )}
                      </div>
                      <div className={styles.sellerInfo}>
                        <p className={styles.sellerValue}>
                          {seller.firstName} {seller.lastName}
                        </p>
                        <p className={styles.sellerValue}>{seller.email}</p>
                      </div>
                    </div>
                    <div
                      className={styles.sellerInfo}
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <p className={styles.sellerTitle}>
                        {t("payments.company")}
                      </p>
                      <p className={styles.sellerValue}>{seller.business}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.payInfoWrapper}>{info}</div>
            </div>
            <div className={styles.paymentWrapperForMobile}>
              <Button
                style={{ width: "100%" }}
                disabled={isDisable}
                onClick={() => doPayment()}
                spinner={spinner}
              >
                {t("payments.payButton").concat(" $")}
                {formatUSDBalance(priceUSD)}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p>@2023 Nefentus all rights are reserved</p>
              <img src={NefentusLogo} style={{ width: "2rem" }} />
            </div>
          </div>
        </div>
      </div>
      <PasswordPopup
        show={pwd}
        setShow={setPwd}
        password={password}
        setPassword={setPassword}
        onConfirm={async () => {
          const res = await backend_API.checkPassword(password);
          if (res) {
            doPayment();
          } else {
            setPassword("");
            setErrorMessage(t("messages.error.passwordCorrect"));
          }
        }}
      />
    </div>
  );
};

export default ReceivePayment;

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
  className,
}) => {
  return (
    <div
      className={`${styles.optionLineWrapper} ${className}`}
      style={{
        borderRadius: dropdown ? "8px" : "0",
      }}
    >
      <div className={styles.optionLine}>
        <div className={styles.iconContainer}>
          <img src={icon} className={styles.icon} alt={alt} />
        </div>
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}> {optionTitle} </p>
          {optionDescription && (
            <p
              className={`${styles.optionDescription} ${
                optionDescription === "loading..." ? styles.skeletonLoader : ""
              }`}
            >
              {" "}
              {optionDescription !== "loading..." ? optionDescription : ""}{" "}
            </p>
          )}
        </div>
      </div>
      {dropdown && <img src={DropDownIcon} alt="dropdown" />}
    </div>
  );
};

const RadioInput = ({ isPerson, setPerson, setChanged }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={styles.inputWrapper}>
      <p className={styles.label}>{t("payments.legalStatus").concat("*")}</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "0.8rem",
        }}
      >
        <div
          onClick={() => {
            setPerson(true);
            setChanged && setChanged(true);
          }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
            border: `1px solid ${isPerson ? "#28C8F0" : "var(--border-color)"}`,
            borderRadius: "0.6rem",
            padding: "0.8rem",
            background: "var(--card-color)",
            cursor: "pointer",
          }}
        >
          <div>
            <img src={theme === "dark" ? PersonDark : PersonLight} />
            <p style={{ fontSize: "1.2rem" }}>{t("payments.person")}</p>
          </div>
          <div
            style={{
              width: "1.4rem",
              height: "1.4rem",
              padding: "1px",
              border: `1px solid ${
                isPerson ? "#28C8F0" : "var(--border-color)"
              }`,
              borderRadius: "50%",
            }}
          >
            <div
              style={{
                background: `${isPerson ? "#28C8F0" : "none"}`,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        </div>
        <div
          onClick={() => {
            setPerson(false);
            setChanged && setChanged(true);
          }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
            border: `1px solid ${isPerson ? "var(--border-color)" : "#28C8F0"}`,
            borderRadius: "0.6rem",
            padding: "0.8rem",
            background: "var(--card-color)",
            cursor: "pointer",
          }}
        >
          <div>
            <img src={theme === "dark" ? BuildingDark : BuildingLight} />
            <p style={{ fontSize: "1.2rem" }}>{t("payments.company")}</p>
          </div>
          <div
            style={{
              width: "1.4rem",
              height: "1.4rem",
              padding: "1px",
              border: `1px solid ${
                isPerson ? "var(--border-color)" : "#28C8F0"
              }`,
              borderRadius: "50%",
            }}
          >
            <div
              style={{
                background: `${isPerson ? "none" : "#28C8F0"}`,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, placeholder, value, setValue, setChanged, type }) => {
  const handleChange = () => {
    if (setChanged) {
      setChanged(true);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      {label && <p className={styles.label}>{label}</p>}

      <input
        className={styles.input}
        placeholder={placeholder}
        type={type ? "password" : "text"}
        value={value}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        onBlur={(e) => {
          handleChange();
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleChange();
          }
        }}
      />
    </div>
  );
};

export const PaymentInfo = ({
  fullName,
  setFullName,
  email,
  setEmail,
  country,
  setCountry,
  address,
  setAddress,
  isPerson,
  setPerson,
  tax,
  setTax,
  business,
  setBusiness,
  setReverseCharge,
  taxInfo,
  setChanged,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (taxInfo && country) {
      if (taxInfo.country !== country && !isPerson) {
        setReverseCharge(true);
      } else {
        setReverseCharge(false);
      }
      setChanged(true);
    }
  }, [country, isPerson, taxInfo]);

  return (
    <div className={styles.payInfoBody}>
      <div className={styles.row}>
        <Input
          placeholder={`e.g. John Doe`}
          label={t("payments.name").concat("*")}
          value={fullName}
          setValue={setFullName}
          setChanged={setChanged}
        />
      </div>
      <div className={styles.row}>
        <Input
          placeholder={`yourmail@mail.com`}
          label={t("payments.email").concat("*")}
          value={email}
          setValue={setEmail}
          setChanged={setChanged}
        />
      </div>
      <div className={styles.row}>
        <CombinedInput
          country={country}
          setCountry={setCountry}
          value={address}
          setValue={setAddress}
          setChanged={setChanged}
        />
      </div>
      {setPerson && (
        <div className={styles.row}>
          <RadioInput
            isPerson={isPerson}
            setPerson={setPerson}
            // setChanged={setChanged}
          />
        </div>
      )}
      {!isPerson && (
        <div className={styles.row}>
          <Input
            placeholder={t("payments.taxNumber")}
            label={t("payments.taxNumber")}
            value={tax}
            setValue={setTax}
            setChanged={setChanged}
          />
          <Input
            placeholder={`e.g. Google`}
            label={t("payments.company")}
            value={business}
            setValue={setBusiness}
            setChanged={setChanged}
          />
        </div>
      )}
    </div>
  );
};

export const ProductInfo = ({
  productPic,
  name,
  price,
  amount,
  setAmount,
  setChanged,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (amount <= 0) {
      setAmount(1);
    }
    setChanged(true);
  }, [amount]);

  return (
    <div className={styles.productWrapper}>
      {productPic && productPic.toLowerCase() != "null" && (
        <img src={productPic} />
      )}
      <div className={styles.productInfo}>
        <span>{name}</span>
        <div className={styles.quantityWrapper}>
          <p>{t("products.view.quantity")}</p>
          <div>
            <div onClick={() => setAmount((prev) => prev - 1)}>-</div>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div onClick={() => setAmount((prev) => prev + 1)}>+</div>
          </div>
        </div>
      </div>
    </div>
  );
};
