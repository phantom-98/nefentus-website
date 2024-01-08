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

  const [cryptoAmount, setCryptoAmount] = useState("0 ETH");

  const { balances, fetchBalances } = useBalances(metamask);
  const { prices, fetchPrices } = usePrices(metamask);

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

  const wallets = [
    {
      type: "metamask",
      title: "MetaMask",
      icon: MetaMaskLogo,
      description: formatWalletAddress(metamask.address),
      alt: "MetaMask Wallet",
    },
    {
      type: "internal",
      title: "Nefentus",
      description: formatWalletAddress(internalWalletAddress),
      icon: NefentusLogo,
      alt: "Nefentus Wallet",
    },
    // {
    //   type: "walletconnect",
    //   title: "WalletConnect",
    //   icon: WalletConnectLogo,
    //   alt: "Wallet Connect",
    // },
  ];
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const cryptos = currencies.map((currency) => {
    return {
      title: currency.abbr,
      icon: currency.icon,
    };
  });
  const [selectedCryptoIndex, setSelectedCryptoIndex] = useState(0);

  const [isDisable, setDisable] = useState(true);

  const backend_API = new backendAPI();

  useEffect(() => {
    clearMessages();
  }, []);

  useEffect(() => {
    fetchPrices();
    fetchBalances();

    if (metamask.status === "connected" && metamask.address) {
      registerWallet();
      if (wallets[selectedWalletIndex].type == "metamask") {
        setDisable(false || disabled);
      }
    }
  }, [metamask.status, metamask.address]);

  useEffect(() => {
    const wallet = wallets[selectedWalletIndex];
    if (wallet.type == "internal") {
      if (internalWalletAddress) {
        if (
          balances[selectedWalletIndex][selectedCryptoIndex] *
            prices[selectedCryptoIndex] <
          priceUSD
        )
          setDisable(true);
        else setDisable(false || disabled);
      } else {
        setDisable(true);
      }
    } else if (wallet.type == "metamask") {
      if (metamask.status == "disconnected") {
        metamask.connect(metamask.config, {
          chainId: 1,
        });
        setDisable(true);
      } else if (metamask.status == "unknown") {
        setDisable(true);
      } else if (metamask.status == "connecting") {
        setDisable(true);
      } else if (metamask.status == "connected") {
        if (
          balances[selectedWalletIndex][selectedCryptoIndex] *
            prices[selectedCryptoIndex] <
          priceUSD
        )
          setDisable(true);
        else setDisable(false || disabled);
      }
    } else if (wallet.type == "walletconnect") {
      setDisable(true);
    }
  }, [selectedWalletIndex, balances, prices]);

  useEffect(() => {
    const currency = currencies[selectedCryptoIndex];
    const price = prices[selectedCryptoIndex];
    console.log(currency, price, " --- crypto ---");
    if (typeof price == "number") {
      const round = {
        ETH: 5,
        BTC: 6,
        USDT: 2,
        USDC: 2,
        DAI: 2,
      };
      setCryptoAmount(
        formatTokenBalance(priceUSD / price, round[currency.abbr]) +
          " " +
          currency.abbr,
      );
    } else {
      setCryptoAmount("Loading...");
    }
  }, [selectedCryptoIndex, prices]);

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
                {t("payments.seller")}
              </p>
              <div className={styles.sellerContainer}>
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
              <h1 className={styles.headerTitle}>{t("payments.pay.title")}</h1>
              <p className={styles.headerDescription}>
                {t("payments.pay.description")}
              </p>
            </div>
            {info}
          </div>
        </div>

        <div className={styles.productBuy}>
          <div className={styles.body}>
            <div className={styles.total}>
              <p>{t("payments.total")}</p>
              <p>${formatUSDBalance(priceUSD)}</p>
            </div>
            {children ? (
              children
            ) : (
              <div className={styles.crypto}>
                <p className={styles.cryptoTitle}>
                  {t("payments.cryptoAmount")}
                </p>
                <p className={styles.cryptoEqual}>≈</p>
                <p className={styles.cryptoAmount}>{cryptoAmount}</p>
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
                <p>{t("payments.chooseWallet")}</p>
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
              <Button
                style={{ width: "65%", height: "60px" }}
                disabled={isDisable}
                onClick={() => {
                  if (!isDisable)
                    handleBuy(
                      wallets[selectedWalletIndex].type,
                      selectedCryptoIndex,
                    );
                }}
              >
                {t("payments.payButton")} ${formatUSDBalance(priceUSD)}
              </Button>
            </div>
          </div>
          <p>
            {t("payments.agree")}{" "}
            <a style={{ textDecoration: "underline" }}>{t("payments.terms")}</a>
          </p>
        </div>
      </div>
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
  return (
    <div className={styles.optionLineWrapper}>
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
          placeholder={t("payments.addressHint")}
          label={t("payments.address")}
          value={address}
          setValue={setAddress}
        />
      </div>
      <div className={styles.row}>
        <Input
          placeholder={t("payments.taxNumber")}
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

export const ProductInfo = ({
  productPic,
  name,
  description,
  price,
  amount,
  setAmount,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.productWrapper}>
      <div className={styles.productImage}>
        <p className={styles.productInfoTitle}>{name}</p>
        <img
          className={styles.productImageWrapper}
          src={productPic}
          alt="Product Preview"
        />
        <p style={{ fontSize: "16px", color: "#f6f6f6" }}>{description}</p>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productPriceContainer}>
          <p className={styles.productLabel}>{t("payments.price")}</p>
          <p className={styles.productValue}>${price}</p>
        </div>
        <div className={styles.productAmountContainer}>
          <p className={styles.productLabel}>{t("payments.amount")}</p>
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
