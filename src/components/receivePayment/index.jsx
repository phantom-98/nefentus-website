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
import DropDownIcon from "../../assets/icon/dropdown.svg";
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
import Popup from "../../dashboardNew/components/popup/popup";
import { useAuth } from "../../context/auth/authContext";
import { useTheme } from "../../context/themeContext/themeContext";
import { GasDetails } from "../gasDetails/gasDetails";
import { useNavigate } from "react-router-dom";

const ReceivePayment = ({
  priceUSD,
  seller,
  children,
  info,
  transInfoArg,
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
      description: formatTokenBalance(balances[index]),
    };
  });
  const [selectedCryptoIndex, setSelectedCryptoIndex] = useState(0);

  const [isDisable, setDisable] = useState(true);
  const [onPageLogin, setOnPageLogin] = useState(false);

  // const [show, setShow] = useState(false);
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwd, setPwd] = useState(false);
  const { handleBuy } = usePayment({
    password,
    priceUSD,
    seller,
    transInfoArg,
    switchNetwork,
    switchAccount,
  });

  const backend_API = new backendAPI();

  useEffect(() => {
    fetchProfile();
    clearMessages();
  }, []);

  useEffect(() => {
    if (internalWalletAddress) {
      // setShow(false);
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
      priceUSD * currencyRate.rate
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
        formatTokenBalance(
          (priceUSD * currencyRate.rate) / price,
          round[currency.abbr],
        ),
      );
    } else {
      setCryptoAmount("Loading...");
    }
  }, [selectedCryptoIndex, prices, priceUSD]);

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    if (connectedWallet) {
      fetchBalances(activeExternalWalletAddress);
    }
  }, [connectedWallet, activeExternalWalletAddress]);

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
    fetchBalances(wallet?.address);
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

  // async function signin() {
  //   try {
  //     const response = await backend_API.login(email, password, false);
  //     if (response == null) {
  //       setErrorMessage(t("messages.error.loginData"));
  //       return;
  //     } else {
  //       await disconnect();
  //       setUser(response);
  //       // setShow(false);
  //       setOnPageLogin(true);
  //       fetchInternalWalletAddress();
  //       fetchWallets();
  //     }
  //   } catch (error) {
  //     setErrorMessage(t("messages.error.login"));
  //   }
  // }

  const selectInternalWallet = async () => {
    if (!Object.keys(user)?.length) {
      navigate("/login", {
        state: { redirectUrl: `/pay/${transInfoArg.invoiceLink}` },
      });
    } //setShow(true);
    else {
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
                  <div className={styles.walletWrapper}>
                    <div className={styles.chooseWallet}>
                      <p>{t("payments.chooseWallet")}</p>
                    </div>
                    <div className={styles.fullWidthBox}>
                      {internalWalletAddress /*&& !onPageLogin*/ && (
                        <Select
                          data={wallets}
                          selectedIndex={selectedWalletIndex}
                          setSelectedIndex={setSelectedWalletIndex}
                        />
                      )}
                      {/* {((!onPageLogin && !Object.keys(user)?.length) ||
                        (onPageLogin && Object.keys(user)?.length)) && ( */}
                      {!Object.keys(user)?.length && (
                        <div className={styles.unlogged}>
                          {/* {onPageLogin && selectedWalletIndex == 0 ? (
                            <div className={styles.internalWalletContainer}>
                              <img
                                src={NefentusLogo}
                                alt="logo"
                                style={{ width: "2.4rem" }}
                              />
                              <div>
                                <div className={styles.internalWalletTitle}>
                                  {wallets[selectedWalletIndex]?.title}
                                </div>
                                <div className={styles.internalWalletAddress}>
                                  {formatWalletAddress(
                                    wallets[selectedWalletIndex]?.address,
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : ( */}
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
                          {/* )} */}

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
                    {currencyRate.symbol}
                    {formatUSDBalance(priceUSD * currencyRate.rate)}
                  </p>
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
                currency={currencies()[selectedCryptoIndex]}
                cryptoAmount={parseFloat(cryptoAmount)}
                usdAmount={parseFloat(priceUSD)}
              />
              <div className={styles.paymentWrapper}>
                <Button
                  style={{ width: "100%" }}
                  disabled={isDisable}
                  onClick={() => doPayment()}
                  spinner={spinner}
                >
                  {t("payments.payButton")} {currencyRate.symbol}
                  {formatUSDBalance(priceUSD * currencyRate.rate)}
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
                {t("payments.payButton")} {currencyRate.symbol}
                {formatUSDBalance(priceUSD * currencyRate.rate)}
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
      {/* <SigninPopup
        show={show}
        setShow={setShow}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signin={signin}
      /> */}
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
            <p className={styles.optionDescription}> {optionDescription} </p>
          )}
        </div>
      </div>
      {dropdown && <img src={DropDownIcon} alt="dropdown" />}
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
  address,
  setAddress,
  tax,
  setTax,
  business,
  setBusiness,
  setChanged,
}) => {
  const { t } = useTranslation();

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
        <Input
          placeholder={t("payments.addressHint")}
          label={t("payments.address")}
          value={address}
          setValue={setAddress}
          setChanged={setChanged}
        />
      </div>
      <div className={styles.row}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Input
            placeholder={t("payments.taxNumber")}
            label={t("payments.taxNumber")}
            value={tax}
            setValue={setTax}
            type
            setChanged={setChanged}
          />
          <Input
            placeholder={"0.00%"}
            label={t("payments.vat").concat(" %")}
            setChanged={setChanged}
          />
        </div>
        <Input
          placeholder={`e.g. Google`}
          label={t("payments.company")}
          value={business}
          setValue={setBusiness}
          setChanged={setChanged}
        />
      </div>
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

// const SigninPopup = ({
//   show,
//   setShow,
//   email,
//   setEmail,
//   password,
//   setPassword,
//   signin,
// }) => {
//   const { t } = useTranslation();
//   return (
//     <Popup
//       show={show}
//       onClose={() => {
//         setShow(false);
//         setPassword("");
//       }}
//       onConfirm={signin}
//       confirmTitle={t("login.button")}
//       cancelTitle={t("general.cancel")}
//     >
//       <MessageComponent />
//       <div className={styles.signinContainer}>
//         <div>
//           <p>{t("login.button")}</p>
//           <p>{t("login.useNefentus")}</p>
//         </div>
//         <Input
//           label={`${t("signUp.emailLabel")}*`}
//           placeholder={t("signUp.emailPlaceholder")}
//           value={email}
//           setValue={setEmail}
//         />
//         <Input
//           label={`${t("signUp.passwordLabel")}*`}
//           placeholder={t("signUp.passwordPlaceholder")}
//           value={password}
//           setValue={setPassword}
//           type
//         />
//       </div>
//     </Popup>
//   );
// };

const PasswordPopup = ({ show, setShow, password, setPassword, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <Popup
      show={show}
      onClose={() => {
        setShow(false);
        setPassword("");
      }}
      onConfirm={onConfirm}
      confirmTitle={t("general.confirm")}
      cancelTitle={t("general.cancel")}
    >
      <div className={styles.signinContainer}>
        <Input
          label={`${t("signUp.passwordLabel")}*`}
          placeholder={t("signUp.passwordPlaceholder")}
          value={password}
          setValue={setPassword}
          type
        />
      </div>
    </Popup>
  );
};
