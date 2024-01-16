import styles from "./receivePayment.module.css";
import { useState, useEffect, useContext } from "react";
import MessageComponent from "../message";
import { MessageContext } from "../../context/message";
import NefentusLogo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../assets/logo/WalletConnect.svg";
import DropDownIcon from "../../assets/icon/dropdown.svg";
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
  useNetwork,
} from "@thirdweb-dev/react";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { currencies, blockchainToUSDC, chainId } from "../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import { nullToZeroAddress } from "../../utils";
import { useTranslation } from "react-i18next";
import Popup from "../../dashboardNew/components/popup/popup";
import { useTheme } from "../../context/themeContext/themeContext";

const ReceivePayment = ({
  priceUSD,
  seller,
  children,
  info,
  transInfoArg,
  disabled,
}) => {
  const { internalWalletAddress, fetchInternalWalletAddress } =
    useInternalWallet();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const externalWallets = [
    {
      connect: useConnect(),
      disconnect: useDisconnect(),
      config: metamaskWallet(),
      address: useAddress(),
      status: useConnectionStatus(),
    },
    {
      connect: useConnect(),
      disconnect: useDisconnect(),
      config: walletConnect(),
      address: useAddress(),
      status: useConnectionStatus(),
    },
  ];

  const [cryptoAmount, setCryptoAmount] = useState("0");

  const { balances, fetchBalances } = useBalances();
  const { prices, fetchPrices } = usePrices();
  const [, switchNetwork] = useNetwork();
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const formatWalletAddress = (address, symbolCount = 8) => {
    if (!address || address.length <= symbolCount * 2 + 2) {
      return address;
    }

    const start = address.substring(0, symbolCount + 2);
    const end = address.substring(address.length - symbolCount);
    return `${start}....${end}`;
  };

  const formatBalance = (balance) => {
    if (balance) {
      return balance.toFixed(2);
    }
    return null;
  };

  const wallets = [
    {
      type: "internal",
      title: "Nefentus",
      description: formatWalletAddress(internalWalletAddress),
      icon: NefentusLogo,
      alt: "Nefentus Wallet",
    },
    {
      type: "metamask",
      title: "MetaMask",
      icon: MetaMaskLogo,
      description: formatWalletAddress(externalWallets[0].address),
      alt: "MetaMask Wallet",
    },
    {
      type: "walletconnect",
      title: "WalletConnect",
      icon: WalletConnectLogo,
      description: formatWalletAddress(externalWallets[1].address),
      alt: "Wallet Connect",
    },
  ];
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

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backend_API = new backendAPI();

  useEffect(() => {
    clearMessages();
  }, []);

  useEffect(() => {
    if (internalWalletAddress) {
      setShow(false);
    }
  }, [internalWalletAddress]);
  useEffect(() => {
    if (
      externalWallets[0].status === "connected" &&
      externalWallets[0].address
    ) {
      registerWallet(externalWallets[0]);
    }
    if (
      externalWallets[1].status === "connected" &&
      externalWallets[1].address
    ) {
      registerWallet(externalWallets[1]);
    }
  }, [
    externalWallets[0].status,
    externalWallets[0].address,
    externalWallets[1].status,
    externalWallets[1].address,
  ]);

  useEffect(() => {
    if (selectedWalletIndex == 0) {
      if (internalWalletAddress) {
        fetchBalances(internalWalletAddress);
      } else {
        !isDisable && setDisable(true);
        setShow(true);
      }
    } else {
      const exWallet = externalWallets[selectedWalletIndex - 1];
      if (exWallet.status == "disconnected") {
        exWallet.connect(exWallet.config, {
          chainId: 1,
        });
        !isDisable && setDisable(true);
      } else if (exWallet.status == "unknown") {
        !isDisable && setDisable(true);
      } else if (exWallet.status == "connecting") {
        !isDisable && setDisable(true);
      } else if (exWallet.status == "connected") {
        fetchBalances(exWallet.address);
      }
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
  }, [balances, prices]);

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
        BUSD: 2,
      };
      setCryptoAmount(
        formatTokenBalance(priceUSD / price, round[currency.abbr]),
      );
    } else {
      setCryptoAmount("Loading...");
    }
  }, [selectedCryptoIndex, prices]);

  async function registerWallet(externalWallet) {
    if (!externalWallet.address) return;
    const result = await backend_API.registerWalletAddress(
      externalWallet.address,
    );
  }

  async function handleBuy() {
    if (isDisable) return;
    // Checks
    if (!(priceUSD > 0.0)) {
      setErrorMessage(t("messages.error.invalidPrice"));
      return;
    }
    if (!seller) {
      setErrorMessage(t("messages.error.invalidUserId"));
      return;
    }
    const currency = currencies()[selectedCryptoIndex];
    const walletAddress =
      selectedWalletIndex == 0
        ? internalWalletAddress
        : externalWallets[selectedWalletIndex - 1].address;
    const payWithExternalwallet = selectedWalletIndex != 0;

    const currencyAddress = currency.address;
    // Get stablecoin from backend
    const stablecoin = blockchainToUSDC(currency.blockchain);
    const quantity = 1;

    if (payWithExternalwallet) {
      await switchNetwork(chainId(currency.blockchain));

      const web3API = new web3Api();

      const [hierarchy, fees] = await Promise.all([
        backend_API.getHierarchy(seller.id),
        backend_API.getFees(seller.id),
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
        stablecoin.address,
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

  async function signin() {
    try {
      const response = await backend_API.login(email, password, false);
      if (response == null) {
        setErrorMessage(t("messages.error.loginData"));
        return;
      } else {
        setShow(false);
        fetchInternalWalletAddress();
      }
    } catch (error) {
      setErrorMessage(t("messages.error.login"));
    }
  }

  return (
    <div className={styles.container}>
      <MessageComponent />

      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          {seller && (
            <div className={styles.sellerWrapper}>
              <p style={{ fontSize: "1.2rem", color: "#B1B1B1" }}>
                {t("payments.seller")}
              </p>
              <div
                className={styles.sellerContainer}
                style={{
                  backgroundColor: `${theme == "dark" ? "" : "white"}`,
                  borderColor: `${theme == "dark" ? "" : "#0000001a"}`,
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
                <div
                  className={styles.sellerInfo}
                  style={{
                    borderRight: `1px solid ${
                      theme == "dark" ? "#313131" : "#0000001a"
                    }`,
                  }}
                >
                  <p className={styles.sellerTitle}>{t("payments.name")}</p>
                  <p
                    className={styles.sellerValue}
                    style={{ color: `${theme == "dark" ? "" : "#111111"}` }}
                  >
                    {seller.firstName} {seller.lastName}
                  </p>
                </div>
                <div
                  className={styles.sellerInfo}
                  style={{
                    borderRight: `1px solid ${
                      theme == "dark" ? "#313131" : "#0000001a"
                    }`,
                  }}
                >
                  <p className={styles.sellerTitle}>{t("payments.email")}</p>
                  <p
                    className={styles.sellerValue}
                    style={{ color: `${theme == "dark" ? "" : "#111111"}` }}
                  >
                    {seller.email}
                  </p>
                </div>
                <div className={styles.sellerInfo}>
                  <p className={styles.sellerTitle}>{t("payments.company")}</p>
                  <p
                    className={styles.sellerValue}
                    style={{ color: `${theme == "dark" ? "" : "#111111"}` }}
                  >
                    {seller.business}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className={styles.payInfoWrapper}>
            <div className={styles.payInfoHeader}>
              <h1
                className={styles.headerTitle}
                style={{ color: `${theme == "dark" ? "" : "#111111"}` }}
              >
                {t("payments.pay.title")}
              </h1>
              <p className={styles.headerDescription}>
                {t("payments.pay.description")}
              </p>
            </div>
            {info}
          </div>
        </div>

        <div className={styles.productBuy}>
          <div
            className={styles.body}
            style={{
              backgroundColor: `${theme == "dark" ? "" : "white"}`,
              borderColor: `${theme == "dark" ? "" : "#0000001a"}`,
            }}
          >
            <div
              className={styles.total}
              style={{
                borderBottom: `1px solid ${
                  theme == "dark" ? "#313131" : "#0000001a"
                }`,
              }}
            >
              <p>{t("payments.total")}</p>
              <p>${formatUSDBalance(priceUSD)}</p>
            </div>
            {children}
            <div className={styles.crypto}>
              <p className={styles.cryptoTitle}>{t("payments.cryptoAmount")}</p>
              <div className={styles.cryptoBody}>
                <div
                  className={styles.cryptoAmount}
                  style={{
                    color: theme == "dark" ? "" : "#111111",
                    borderColor: theme == "dark" ? "" : "#0000001a",
                  }}
                >
                  {cryptoAmount}
                </div>
                <div style={{ width: "50%" }}>
                  <Select
                    data={cryptos}
                    selectedIndex={selectedCryptoIndex}
                    setSelectedIndex={setSelectedCryptoIndex}
                  />
                </div>
              </div>
            </div>
            <div
              className={styles.walletWrapper}
              style={{
                borderBottom: `1px solid ${
                  theme == "dark" ? "#313131" : "#0000001a"
                }`,
                borderTop: `1px solid ${
                  theme == "dark" ? "#313131" : "#0000001a"
                }`,
              }}
            >
              <div className={styles.chooseWallet}>
                <p>{t("payments.chooseWallet")}</p>
              </div>
              <Select
                data={wallets}
                selectedIndex={selectedWalletIndex}
                setSelectedIndex={setSelectedWalletIndex}
              />
            </div>
            <div className={styles.paymentWrapper}>
              <Button
                style={{ width: "100%", height: "60px" }}
                disabled={isDisable}
                onClick={() => handleBuy()}
              >
                {t("payments.payButton")} ${formatUSDBalance(priceUSD)}
              </Button>
            </div>
          </div>
          <p>
            {t("payments.agree")}{" "}
            <a style={{ textDecoration: "underline" }}>{t("payments.terms")}</a>{" "}
            {t("payments.agree2")}
          </p>
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
    </div>
  );
};

export default ReceivePayment;

const Select = ({ data, selectedIndex, setSelectedIndex }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`option ${styles.select}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <SelectOption
          icon={data[selectedIndex].icon}
          optionTitle={data[selectedIndex].title}
          optionDescription={data[selectedIndex].description}
          alt={data[selectedIndex].alt}
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
  const { theme } = useTheme();
  return (
    <div
      className={styles.optionLineWrapper}
      style={{
        backgroundColor: `${theme == "dark" ? "" : "white"}`,
        borderColor: `${theme == "dark" ? "" : "#0000001a"}`,
      }}
    >
      <div className={styles.optionLine}>
        <div
          className={styles.iconContainer}
          style={{ backgroundColor: `${theme == "dark" ? "" : "#0000001a"}` }}
        >
          <img src={icon} className={styles.icon} alt={alt} />
        </div>
        <div className={styles.optionContainer}>
          <p
            className={styles.optionTitle}
            style={{ color: `${theme == "dark" ? "" : "#111111"}` }}
          >
            {" "}
            {optionTitle}{" "}
          </p>
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
  const { theme } = useTheme();
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
        style={{ backgroundColor: `${theme == "dark" ? "" : "white"}` }}
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
        <Input
          placeholder={t("payments.taxNumber")}
          label={t("payments.taxNumber")}
          value={tax}
          setValue={setTax}
          type
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
    </div>
  );
};

export const ProductInfo = ({
  productPic,
  name,
  description,
  price,
  amount,
  setAmount,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <div className={styles.productWrapper}>
      <div className={styles.productImage}>
        <p
          className={styles.productInfoTitle}
          style={{ color: theme == "dark" ? "" : "#111111" }}
        >
          {name}
        </p>
        <img
          className={styles.productImageWrapper}
          src={productPic}
          alt="Product Preview"
        />
        <p
          style={{
            fontSize: "16px",
            color: theme == "dark" ? "#f6f6f6" : "#111111a0",
          }}
        >
          {description}
        </p>
      </div>
      <div
        className={styles.productInfo}
        style={{
          borderTopColor: theme == "dark" ? "" : "#0000001a",
          borderBottomColor: theme == "dark" ? "" : "#0000001a",
        }}
      >
        <div
          className={styles.productPriceContainer}
          style={{ borderRightColor: theme == "dark" ? "" : "#0000001a" }}
        >
          <p
            className={styles.productLabel}
            style={{ color: theme == "dark" ? "" : "#111111" }}
          >
            {t("payments.price")}
          </p>
          <p
            className={styles.productValue}
            style={{
              color: theme == "dark" ? "" : "#111111",
              backgroundColor: theme == "dark" ? "" : "#e6e6e6",
            }}
          >
            ${price}
          </p>
        </div>
        <div className={styles.productAmountContainer}>
          <p
            className={styles.productLabel}
            style={{ color: theme == "dark" ? "" : "#111111" }}
          >
            {t("payments.amount")}
          </p>
          <input
            className={styles.productValue}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              color: theme == "dark" ? "" : "#111111",
              backgroundColor: theme == "dark" ? "" : "#e6e6e6",
            }}
          />
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
  const { theme } = useTheme();
  return (
    <Popup
      show={show}
      onClose={() => setShow(false)}
      onConfirm={signin}
      confirmTitle={t("login.button")}
      cancelTitle={t("general.cancel")}
    >
      <MessageComponent />
      <div className={styles.signinContainer}>
        <div>
          <p
            className={styles.title}
            style={{ color: `${theme == "dark" ? "" : "#111111"}` }}
          >
            {t("login.button")}
          </p>
          <p
            className={styles.description}
            style={{ color: `${theme == "dark" ? "" : "black"}` }}
          >
            {t("login.useNefentus")}
          </p>
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
