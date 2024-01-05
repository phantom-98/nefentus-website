import styles from "./receivePayment.module.css";
import { useState, useEffect, useContext, Children } from "react";
import { Link } from "react-router-dom";
import Tabs from "../tabs";
import TopInfo from "../../dashboard/topInfo/topInfo";
import Table from "../../components/table";
import MessageComponent from "../message";
import { MessageContext } from "../../context/message";
import NefentusLogo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../assets/logo/WalletConnect.svg";
import DropDownIcon from "../../assets/icon/dropdown.svg";
import backendAPI from "../../api/backendAPI";
import { web3Api, uniswapApi } from "../../api/web3Api";
import Button from "../../components/button/button";
import useInternalWallet from "../../hooks/internalWallet";
import {
  useConnect,
  useDisconnect,
  metamaskWallet,
  useConnectionStatus,
  useAddress,
} from "@thirdweb-dev/react";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { currencies } from "../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import { nullToZeroAddress } from "../../utils";
import { useTranslation } from "react-i18next";

const ReceivePayment = ({
  priceUSD,
  seller,
  children,
  info,
  transInfoArg,
  disabled,
}) => {
  let internalWalletAddress = useInternalWallet();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [internalPayIdx, setInternalPayIdx] = useState(-1); // Index of the currency to pay with (or -1 if not selected)

  const metamask = {
    connect: useConnect(),
    disconnect: useDisconnect(),
    config: metamaskWallet(),
    address: useAddress(),
    status: useConnectionStatus(),
  };
  console.log("MetaMask status: " + metamask.status);
  console.log("MetaMask address: " + metamask.address);

  const wallets = [
    {
      type: "internal",
      title: "Nefentus",
      icon: NefentusLogo,
      description: "",
      alt: "Nefentus Wallet",
    },
    {
      type: "metamask",
      title: "MetaMask",
      icon: MetaMaskLogo,
      description: "",
      alt: "MetaMask Wallet",
    },
    {
      type: "walletconnect",
      title: "WalletConnect",
      icon: WalletConnectLogo,
      description: "",
      alt: "MetaMask Wallet",
    },
  ];
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);

  const cryptos = currencies.map((currency) => {
    return {
      title: currency.abbr,
      icon: currency.icon,
    };
  });
  const [selectedCryptoIndex, setSelectedCryptoIndex] = useState(0);

  const { balances, fetchBalances } = useBalances(metamask);
  const { prices, fetchPrices } = usePrices(metamask);

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const backend_API = new backendAPI();

  useEffect(() => {
    clearMessages();
  }, []);

  useEffect(() => {
    fetchPrices();
    fetchBalances();

    if (metamask.status === "connected" && metamask.address) {
      registerWallet();
    }
  }, [metamask.status, metamask.address]);

  async function registerWallet() {
    const result = await backend_API.registerWalletAddress(metamask.address);
  }

  async function handleBuy(providerSource, currencyIdx) {
    // Checks
    if (!(priceUSD > 0.0)) {
      setErrorMessage(t("messages.error.invalidPrice"));
      return;
    }
    if (!seller) {
      setErrorMessage(t("messages.error.invalidUserId"));
      return;
    }

    // Currently not used because it is always paid in Ethereum
    const currency = currencies[currencyIdx];
    const stablecoinAddress = currencies[1].address;
    const quantity = 1;

    if (providerSource === "metamask") {
      const web3API = new web3Api(providerSource);

      const hierarchy = await backend_API.getHierarchy(seller.id);
      console.log(hierarchy);

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
          metamask.address,
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

      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          {seller && (
            <div className={styles.sellerWrapper}>
              <p style={{ fontSize: "1.2rem", color: "#B1B1B1" }}>
                Seller Info
              </p>
              <div className={styles.sellerContainer}>
                <div className={styles.avatarWrapper}>
                  {seller.s3Url && <img src={seller.s3Url} />}
                  {!seller.s3Url && (
                    <span style={{ fontSize: "1.4rem", marginTop: "0.3rem" }}>
                      {seller.firstName[0]}
                      {seller.lastName[0]}
                    </span>
                  )}
                </div>
                <div
                  className={styles.sellerInfo}
                  style={{ borderRight: "1px solid #313131" }}
                >
                  <p className={styles.sellerTitle}>{t("payments.name")}</p>
                  <p className={styles.sellerValue}>
                    {seller.firstName} {seller.lastName}
                  </p>
                </div>
                <div
                  className={styles.sellerInfo}
                  style={{ borderRight: "1px solid #313131" }}
                >
                  <p className={styles.sellerTitle}>{t("payments.email")}</p>
                  <p className={styles.sellerValue}>{seller.email}</p>
                </div>
                <div className={styles.sellerInfo}>
                  <p className={styles.sellerTitle}>{t("payments.company")}</p>
                  <p className={styles.sellerValue}>{seller.business}</p>
                </div>
              </div>
            </div>
          )}
          <div className={styles.payInfoWrapper}>
            <div className={styles.payInfoHeader}>
              <h1 className={styles.headerTitle}>Payment Details</h1>
              <p className={styles.headerDescription}>
                Complete remittance by providing your payment details
              </p>
            </div>
            {info}
          </div>
        </div>

        <div className={styles.productBuy}>
          <div className={styles.body}>
            <div className={styles.total}>
              <p>Total in USDT</p>
              <p>${priceUSD}</p>
            </div>
            {children ? (
              children
            ) : (
              <div className={styles.crypto}>
                <p className={styles.cryptoTitle}>Cryptocurrency amount</p>
                <p className={styles.cryptoEqual}>≈</p>
                <p className={styles.cryptoAmount}>0.0763 BTC</p>
              </div>
            )}
            <div
              className={styles.walletWrapper}
              style={{
                borderBottom: "1px solid #313131",
                borderTop: "1px solid #313131",
              }}
            >
              <div className={styles.chooseWallet}>
                <p>Choose Wallet</p>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="add">
                    <path
                      id="Vector"
                      d="M14.5977 10.25H10.0977V14.75H8.59766V10.25H4.09766V8.75H8.59766V4.25H10.0977V8.75H14.5977V10.25Z"
                      fill="#E9E9E9"
                    />
                  </g>
                </svg>
              </div>
              <Select
                data={wallets}
                selectedIndex={selectedWalletIndex}
                setSelectedIndex={setSelectedWalletIndex}
              />
            </div>
            <div className={styles.paymentWrapper}>
              <div style={{ width: "35%" }}>
                <Select
                  data={cryptos}
                  selectedIndex={selectedCryptoIndex}
                  setSelectedIndex={setSelectedCryptoIndex}
                />
              </div>
              <Button style={{ width: "65%", height: "60px" }}>
                Pay ${priceUSD}
              </Button>
            </div>
          </div>
          <p>
            By clicking on button you agree to the{" "}
            <a style={{ textDecoration: "underline" }}>Terms of Service</a>
          </p>
        </div>

        {/* {!disabled && (
          <div className={`${styles.productBuy}`}>
            <div className={styles.body}>
              <Tabs
                tabIds={["internal", "metamask"]}
                initActiveTab={"internal"}
                getHeader={(tabId) => {
                  if (tabId === "metamask") {
                    return (
                      <>
                        <img
                          src={MetaMaskLogo}
                          className={styles.tabNavLogo}
                          alt="MetaMask Wallet"
                        />{" "}
                        MetaMask
                      </>
                    );
                  } else if (tabId === "internal") {
                    return (
                      <>
                        <img
                          src={NefentusLogo}
                          className={styles.tabNavLogo}
                          alt="Nefentus Wallet"
                        />{" "}
                        Nefentus Wallet
                      </>
                    );
                  }
                }}
                getBody={(tabId) => {
                  if (tabId === "metamask") {
                    return (
                      <div className={styles.tabContent}>
                        {metamask.status === "connected" && (
                          <div className={styles.table}>
                            {currencies.map((currency, idx) => (
                              <CryptoLine
                                key={currency.abbr}
                                currency={currency}
                                balance={balances[0][idx]}
                                price={prices[idx]}
                                priceProduct={priceUSD}
                                onClick={() => {
                                  handleBuy("metamask", idx);
                                }}
                              />
                            ))}
                          </div>
                        )}
                        {metamask.status === "disconnected" && (
                          <div className={styles.center}>
                            <Button
                              className={styles.metamaskConnectButton}
                              onClick={() =>
                                metamask.connect(metamask.config, {
                                  chainId: 1,
                                })
                              }
                            >
                              {t("products.connect")}MetaMask
                            </Button>
                          </div>
                        )}
                        {metamask.status === "unknown" && (
                          <div className={styles.center}>
                            <Button
                              className={styles.metamaskConnectButton}
                              disabled
                            >
                              MetaMask{t("products.notAvailable")}
                            </Button>
                          </div>
                        )}
                        {metamask.status === "connecting" && (
                          <div className={styles.center}>
                            <Button
                              className={styles.metamaskConnectButton}
                              disabled
                            >
                              {t("products.connecting")}
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  } else if (tabId === "internal") {
                    return (
                      <div className={styles.tabContent}>
                        {!internalWalletAddress && (
                          <div className={styles.center}>
                            <Button
                              className={styles.nefentusLoginButton}
                              onClick={() => {}}
                            >
                              {t("products.login")}Nefentus
                            </Button>
                          </div>
                        )}
                        {internalWalletAddress && (
                          <div className={styles.table}>
                            {currencies.map((currency, idx) => (
                              <CryptoLine
                                key={currency.abbr}
                                currency={currency}
                                balance={balances[1][idx]}
                                price={prices[idx]}
                                priceProduct={priceUSD}
                                onClick={() => {
                                  setInternalPayIdx(idx);
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                }}
                beforeChangeTab={() => {}}
              />
            </div>
            <p>By clicking on button you agree to the <a style={{textDecoration: "underline"}}>Terms of Service</a></p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ReceivePayment;

const CryptoLine = ({ balance, price, currency, priceProduct, onClick }) => {
  let balanceToken = "loading";
  let balanceUSD = "loading";
  if (balance) {
    balanceToken = balance;
    if (price) {
      balanceUSD = balance * price;
    }
  }

  let buttonActive = false;
  if (balanceUSD) {
    // Currently, we can only pay in Ethereum
    buttonActive = balanceUSD > priceProduct && currency.abbr === "ETH";
  }

  return (
    <div className={styles.line}>
      <div className={styles.lineLeft}>
        <img src={currency.icon} className={styles.icon} alt="" />
        <div>
          <p className={styles.name}>{currency.name}</p>
          <p className={styles.abbr}>{currency.abbr}</p>
        </div>
      </div>

      <div className={styles.amounts}>
        <p className={styles.dollar}>≈ {formatUSDBalance(balanceUSD)} USD</p>
        <p className={styles.crypto}>
          {formatTokenBalance(balanceToken, currency.decimals)} {currency.abbr}
        </p>
      </div>

      <div className={styles.actions}>
        {buttonActive && (
          <Button
            className={styles.buyButton}
            onClick={onClick}
            color={"white"}
          >
            Pay
          </Button>
        )}
      </div>
    </div>
  );
};

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
          // optionDescription={data[selectedIndex].description}
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
                    // optionDescription={item.description}
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
    <div className={styles.optionLineWrapper}>
      <div className={styles.optionLine}>
        <div className={styles.iconContainer}>
          <img src={icon} className={styles.icon} alt={alt} />
        </div>
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}> {optionTitle} </p>
          <p className={styles.optionDescription}> {optionDescription} </p>
        </div>
      </div>
      {dropdown && <img src={DropDownIcon} alt="dropdown" />}
    </div>
  );
};

const Input = ({ label, placeholder, value, setValue, type }) => {
  const handleChange = (e) => {
    if (setValue) {
      setValue(e.target.value);
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
        onChange={handleChange}
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
        />
      </div>
      <div className={styles.row}>
        <Input
          placeholder={`yourmail@mail.com`}
          label={t("payments.email").concat("*")}
          value={email}
          setValue={setEmail}
        />
      </div>
      <div className={styles.row}>
        <Input
          placeholder={`Country, City, Street`}
          label={t("payments.address")}
          value={address}
          setValue={setAddress}
        />
      </div>
      <div className={styles.row}>
        <Input
          placeholder={`Tax Number`}
          label={t("payments.taxNumber")}
          value={tax}
          setValue={setTax}
          type
        />
        <Input
          placeholder={`e.g. Google`}
          label={t("payments.company")}
          value={business}
          setValue={setBusiness}
        />
      </div>
    </div>
  );
};

export const ProductInfo = ({ productPic, price, amount, setAmount }) => {
  return (
    <div className={styles.productWrapper}>
      <div className={styles.productImage}>
        <p className={styles.productInfoTitle}>Product</p>
        <img
          className={styles.productImageWrapper}
          src={productPic}
          alt="Product Preview"
        />
        <div className={styles.productLandscape}>
          <p style={{ fontSize: "16px", color: "#f6f6f6" }}>
            Landscape design services
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <p>Details</p>
            <img src={DropDownIcon} />
          </div>
        </div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productPriceContainer}>
          <p className={styles.productLabel}>Price</p>
          <p className={styles.productValue}>${price}</p>
        </div>
        <div className={styles.productAmountContainer}>
          <p className={styles.productLabel}>Amount</p>
          <input
            className={styles.productValue}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
