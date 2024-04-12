import styles from "./receivePayment.module.css";
import { useState, useEffect, useContext } from "react";
import MessageComponent from "../message";
import { MessageContext } from "../../context/message";
import NefentusLogo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../assets/logo/WalletConnect.svg";
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
  coinbaseWallet,
  trustWallet,
  useWallet,
  useCreateWalletInstance,
  useSetConnectedWallet,
  ConnectWallet,
} from "@thirdweb-dev/react";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { usePayment } from "../../hooks/payment";
import { currencies } from "../../constants";
import {
  formatTokenBalance,
  formatUSDBalance,
  getWalletIcon,
} from "../../utils";
import { useTranslation } from "react-i18next";
import Popup from "../../dashboardNew/components/popup/popup";
import { useAuth } from "../../context/auth/authContext";

const icons = ["walletconnect", "metamask", "coinbase", "trust"];

const formatWalletAddress = (address, symbolCount = 8) => {
  if (!address || address.length <= symbolCount * 2 + 2) {
    return address;
  }

  const start = address.substring(0, symbolCount + 2);
  const end = address.substring(address.length - symbolCount);
  return `${start}....${end}`;
};

const formatBalance = (balance, digits = 2) => {
  if (typeof balance === "number") {
    return balance.toFixed(digits);
  }
  return null;
};

const ReceivePayment = ({
  priceUSD,
  seller,
  children,
  info,
  transInfoArg,
  disabled,
  valid,
}) => {
  const { internalWalletAddress, fetchInternalWalletAddress } =
    useInternalWallet();
  const { t } = useTranslation();
  const { user, setUser, currencyRate } = useAuth();
  const [wallets, setWallets] = useState([]);
  const connectedWallet = useWallet();
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

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const cryptos = currencies().map((currency, index) => {
    return {
      title: currency.abbr,
      icon: currency.icon,
      description: formatBalance(balances[index]),
    };
  });
  const [selectedCryptoIndex, setSelectedCryptoIndex] = useState(0);

  const [isDisable, setDisable] = useState(true);
  const [onPageLogin, setOnPageLogin] = useState(false);

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwd, setPwd] = useState(false);
  const { handleBuy } = usePayment({
    password,
    priceUSD,
    seller,
    transInfoArg,
    switchNetwork,
  });

  const backend_API = new backendAPI();

  useEffect(() => {
    fetchProfile();
    clearMessages();
  }, []);

  useEffect(() => {
    if (internalWalletAddress) {
      setShow(false);
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
        title: wallet?.type?.charAt(0)?.toUpperCase() + wallet?.type?.slice(1),
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
        : // : wallet?.type?.toLowerCase() === "trust"
          // ? trustWallet({
          //     projectId: "57e1cfc18509bb9cc4d51638ce8d18ed",
          //     recommended: true,
          //     // qrModal: "trust",
          //   })
          null;
    if (
      connectedWallet === undefined ||
      connectedWallet?.walletId?.toLowerCase() != wallet?.title?.toLowerCase()
    ) {
      const response = createWalletInstance(currentWalletConfig);
      await response.connect();
      setConnectedWallet(response);
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

  async function signin() {
    try {
      const response = await backend_API.login(email, password, false);
      if (response == null) {
        setErrorMessage(t("messages.error.loginData"));
        return;
      } else {
        await disconnect();
        setUser(response);
        setShow(false);
        setOnPageLogin(true);
        fetchInternalWalletAddress();
        fetchWallets();
      }
    } catch (error) {
      setErrorMessage(t("messages.error.login"));
    }
  }

  const selectInternalWallet = async () => {
    if (!Object.keys(user)?.length) setShow(true);
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
        <div className={styles.left}>
          <div className={styles.productBuy}>
            <div className={styles.payInfoHeader}>
              <h1 className={styles.headerTitle}>{t("payments.pay.title")}</h1>
            </div>
            <div className={styles.body}>
              {children}
              <div className={styles.walletWrapper}>
                <div className={styles.chooseWallet}>
                  <p>{t("payments.chooseWallet")}</p>
                </div>
                <div className={styles.fullWidthBox}>
                  {internalWalletAddress && !onPageLogin && (
                    <Select
                      data={wallets}
                      selectedIndex={selectedWalletIndex}
                      setSelectedIndex={setSelectedWalletIndex}
                    />
                  )}
                  {((!onPageLogin && !Object.keys(user)?.length) ||
                    (onPageLogin && Object.keys(user)?.length)) && (
                    <>
                      {onPageLogin && selectedWalletIndex == 0 ? (
                        <div className={styles.internalWalletContainer}>
                          <img src={NefentusLogo} alt="logo" width={25} />
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
                      ) : (
                        <Button
                          className={styles.connectInternalButton}
                          onClick={selectInternalWallet}
                        >
                          <img src={NefentusLogo} alt="logo" width={25} />
                          <span>
                            {t("payments.pay.internalWalletButtonTitle")}
                          </span>
                        </Button>
                      )}
                      <div className={styles.or_divider}>{t("general.or")}</div>
                      {connectedWallet == undefined ? (
                        <div className={styles.connectWalletContainer}>
                          <ConnectWallet
                            // style={{ width: "100%" }}
                            btnTitle={t(
                              "payments.pay.externalWalletButtonTitle",
                            )}
                            onConnect={onConnectExternalWallet}
                            className={styles.externalWalletButton}
                          />
                        </div>
                      ) : (
                        <ConnectWallet
                          style={{ width: "100%" }}
                          btnTitle={t("payments.pay.externalWalletButtonTitle")}
                          onConnect={onConnectExternalWallet}
                          // className={styles.externalWalletButton}
                        />
                      )}
                    </>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_839_16182)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.0002 2.50065C5.85803 2.50065 2.50016 5.85852 2.50016 10.0007C2.50016 14.1428 5.85803 17.5007 10.0002 17.5007C14.1423 17.5007 17.5002 14.1428 17.5002 10.0007C17.5002 5.85852 14.1423 2.50065 10.0002 2.50065ZM0.833496 10.0007C0.833496 4.93804 4.93755 0.833984 10.0002 0.833984C15.0628 0.833984 19.1668 4.93804 19.1668 10.0007C19.1668 15.0633 15.0628 19.1673 10.0002 19.1673C4.93755 19.1673 0.833496 15.0633 0.833496 10.0007ZM9.16683 6.66732C9.16683 6.20708 9.53993 5.83398 10.0002 5.83398H10.0085C10.4687 5.83398 10.8418 6.20708 10.8418 6.66732C10.8418 7.12756 10.4687 7.50065 10.0085 7.50065H10.0002C9.53993 7.50065 9.16683 7.12756 9.16683 6.66732ZM10.0002 9.16732C10.4604 9.16732 10.8335 9.54041 10.8335 10.0007V13.334C10.8335 13.7942 10.4604 14.1673 10.0002 14.1673C9.53993 14.1673 9.16683 13.7942 9.16683 13.334V10.0007C9.16683 9.54041 9.53993 9.16732 10.0002 9.16732Z"
                          fill="#323232"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_839_16182">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
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
              <div style={{ width: "100%" }}>
                <GasDetails
                  currency={currencies()[selectedCryptoIndex]}
                  cryptoAmount={parseFloat(cryptoAmount)}
                  usdAmount={parseFloat(priceUSD)}
                />
              </div>
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
          <div
            className={styles.infoWrapper}
            style={{
              width: "60%",
              height: "80%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
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
                        {/* <p className={styles.sellerTitle}>{t("payments.name")}</p> */}
                        <p className={styles.sellerValue}>
                          {seller.firstName} {seller.lastName}
                        </p>
                        <p className={styles.sellerValue}>{seller.email}</p>
                      </div>
                    </div>
                    {/* <div className={styles.sellerInfo}>
                      <p className={styles.sellerTitle}>{t("payments.email")}</p>
                      <p className={styles.sellerValue}>{seller.email}</p>
                    </div> */}
                    <div
                      className={styles.sellerInfo}
                      style={{
                        borderLeft: "1px solid var(--border-color)",
                        paddingLeft: "2rem",
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
      <SigninPopup
        show={show}
        setShow={setShow}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signin={signin}
      />
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
            label={"VAT %"}
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
        <h1>{name}</h1>
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

const SigninPopup = ({
  show,
  setShow,
  email,
  setEmail,
  password,
  setPassword,
  signin,
}) => {
  const { t } = useTranslation();
  return (
    <Popup
      show={show}
      onClose={() => {
        setShow(false);
        setPassword("");
      }}
      onConfirm={signin}
      confirmTitle={t("login.button")}
      cancelTitle={t("general.cancel")}
    >
      <MessageComponent />
      <div className={styles.signinContainer}>
        <div>
          <p>{t("login.button")}</p>
          <p>{t("login.useNefentus")}</p>
        </div>
        <Input
          label={`${t("signUp.emailLabel")}*`}
          placeholder={t("signUp.emailPlaceholder")}
          value={email}
          setValue={setEmail}
        />
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

const GasDetails = ({
  show,
  currency,
  cryptoAmount,
  usdAmount,
  gasLimit = 600_000,
}) => {
  const { t } = useTranslation();
  const [gasValues, setGasValues] = useState({});
  const [gasPriceAsWei, setGasPrice] = useState(0);
  const [maxFee, setMaxFee] = useState(0);
  // const [gasFee, setGasFee] = useState(0);
  const [blockchain, setBlockchain] = useState(
    currencies().find((c) => currency.blockchain === c.abbr),
  );
  const [blockchainPrice, setBlockchainPrice] = useState(0);
  const uniswap = new uniswapApi();
  const [collapse, setCollapse] = useState(true);

  const init = async () => {
    setMaxFee((gasValues.gasPrice * gasLimit) / 10 ** blockchain.decimals);
    // setGasFee((estimatedGas * gasValues.gasPrice) / 10 ** blockchain.decimals);
    setBlockchainPrice(await uniswap.getNativeTokenPrice(blockchain.abbr));
  };

  const fetch = async () => {
    const res = await uniswap.getGasValues(blockchain.abbr);
    setGasValues(res);
    setGasPrice(res.gasPrice);
  };

  useEffect(() => {
    setBlockchain(currencies().find((c) => currency.blockchain === c.abbr));
  }, [currency]);

  useEffect(() => {
    fetch();
  }, [blockchain.abbr]);

  useEffect(() => {
    init();
  }, [gasValues]);

  return (
    <div className={styles.feeContainer} style={{ width: "100%" }}>
      <div
        className={styles.feeContainer}
        style={{
          gap: "0",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
        }}
      >
        <div style={{ padding: "1.2rem" }}>
          <div className={styles.feeRow}>
            <span>
              {t("payments.fee.gasPrice")}:{" "}
              {Math.round(gasPriceAsWei / 10 ** 9)} Gwei
            </span>
            <span>
              {t("payments.fee.gasLimit")}: {gasLimit}
            </span>
          </div>
          <div className={styles.feeRow}>
            <div
              style={{ display: "flex", gap: "0.4rem", alignItems: "start" }}
            >
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2667 4.02305L13.275 4.01471L10.6167 1.35638C10.375 1.11471 9.975 1.11471 9.73333 1.35638C9.49167 1.59805 9.49167 1.99805 9.73333 2.23971L11.05 3.55638C10.175 3.88971 9.58333 4.78138 9.73333 5.81471C9.86667 6.73138 10.65 7.47305 11.5667 7.57305C11.9583 7.61471 12.3 7.54805 12.625 7.40638V13.4147C12.625 13.873 12.25 14.248 11.7917 14.248C11.3333 14.248 10.9583 13.873 10.9583 13.4147V9.66471C10.9583 8.74805 10.2083 7.99805 9.29167 7.99805H8.45833V2.16471C8.45833 1.24805 7.70833 0.498047 6.79167 0.498047H1.79167C0.875 0.498047 0.125 1.24805 0.125 2.16471V14.6647C0.125 15.123 0.5 15.498 0.958333 15.498H7.625C8.08333 15.498 8.45833 15.123 8.45833 14.6647V9.24805H9.70833V13.298C9.70833 14.3897 10.4917 15.3814 11.575 15.4897C12.825 15.6147 13.875 14.6397 13.875 13.4147V5.49805C13.875 4.92305 13.6417 4.39805 13.2667 4.02305ZM6.79167 6.33138H1.79167V2.99805C1.79167 2.53971 2.16667 2.16471 2.625 2.16471H5.95833C6.41667 2.16471 6.79167 2.53971 6.79167 2.99805V6.33138ZM11.7917 6.33138C11.3333 6.33138 10.9583 5.95638 10.9583 5.49805C10.9583 5.03971 11.3333 4.66471 11.7917 4.66471C12.25 4.66471 12.625 5.03971 12.625 5.49805C12.625 5.95638 12.25 6.33138 11.7917 6.33138Z"
                  fill="#B1B1B1"
                />
              </svg>
              <span>{t("payments.fee.maxFee")}</span>
              <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>
                  {t("payments.fee.description")}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{ cursor: "pointer" }}
                >
                  <g clip-path="url(#clip0_839_16182)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0002 2.50065C5.85803 2.50065 2.50016 5.85852 2.50016 10.0007C2.50016 14.1428 5.85803 17.5007 10.0002 17.5007C14.1423 17.5007 17.5002 14.1428 17.5002 10.0007C17.5002 5.85852 14.1423 2.50065 10.0002 2.50065ZM0.833496 10.0007C0.833496 4.93804 4.93755 0.833984 10.0002 0.833984C15.0628 0.833984 19.1668 4.93804 19.1668 10.0007C19.1668 15.0633 15.0628 19.1673 10.0002 19.1673C4.93755 19.1673 0.833496 15.0633 0.833496 10.0007ZM9.16683 6.66732C9.16683 6.20708 9.53993 5.83398 10.0002 5.83398H10.0085C10.4687 5.83398 10.8418 6.20708 10.8418 6.66732C10.8418 7.12756 10.4687 7.50065 10.0085 7.50065H10.0002C9.53993 7.50065 9.16683 7.12756 9.16683 6.66732ZM10.0002 9.16732C10.4604 9.16732 10.8335 9.54041 10.8335 10.0007V13.334C10.8335 13.7942 10.4604 14.1673 10.0002 14.1673C9.53993 14.1673 9.16683 13.7942 9.16683 13.334V10.0007C9.16683 9.54041 9.53993 9.16732 10.0002 9.16732Z"
                      fill="#323232"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_839_16182">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              :
            </div>
            <div>
              <span>
                {formatBalance(maxFee, 8)} {blockchain.abbr}
              </span>
              <span style={{ marginLeft: "3rem" }}>
                ${formatUSDBalance(maxFee * blockchainPrice)}
              </span>
            </div>
          </div>
        </div>
        <div
          className={styles.feeRow}
          style={{
            padding: "1.2rem",
            borderTop: "1px solid var(--border-color)",
            fontSize: "1.4rem",
          }}
        >
          <span>{t("payments.fee.total")}:</span>
          <span>${formatUSDBalance(usdAmount + maxFee * blockchainPrice)}</span>
        </div>
      </div>
    </div>
  );
};
