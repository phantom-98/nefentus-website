import Button from "../button/button";
import Card from "../card/card";
import styles from "./cryptoCard.module.css";

import { useContext, useEffect, useState } from "react";
import useInternalWallet from "../../../hooks/internalWallet";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
  walletConnect,
  useWallet,
} from "@thirdweb-dev/react";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import backendAPI from "../../../api/backendAPI";
import { currencies } from "../../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../../utils";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../context/message";
import MessageComponent from "../../../components/message";
import TopInfo from "../../../dashboard/topInfo/topInfo";
import CopyValue from "../../../dashboard/copyValue";
import inputStyles from "../../../components/input/input.module.css";
import Input, {
  Options,
  OptionsWithImage,
  WalletField,
} from "../../../components/input/input";
import Popup from "../popup/popup";
import { web3Api } from "../../../api/web3Api";
import MetaMaskLogo from "../../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../../assets/logo/WalletConnect.svg";
import Ethereum from "../../../assets/icon/crypto/ethereum.svg";

const CryptoCard = () => {
  let internalWalletAddress = useInternalWallet();
  const [activeToggle, setActiveToggle] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [activeWallet, setActiveWallet] = useState({});
  const [walletOptions, setWalletOptions] = useState([]);

  const wallets = [
    {
      connect: walletConnect(),
      icon: WalletConnectLogo,
      name: "WalletConnect",
      address: useAddress(),
      status: useConnectionStatus(),
      walletDetail: useWallet(),
    },
    {
      connect: metamaskWallet(),
      icon: MetaMaskLogo,
      name: "MetaMask",
      address: useAddress(),
      status: useConnectionStatus(),
      walletDetail: useWallet(),
    },
  ];

  const { t } = useTranslation();
  const backend_API = new backendAPI();
  const [cryptList, setCryptList] = useState([]);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  const { balances, fetchBalances } = useBalances(activeWallet);
  const { prices, fetchPrices } = usePrices(activeWallet);

  useEffect(() => {
    fetchBalances();
    fetchPrices();
  }, [activeWallet]);

  useEffect(() => {
    if (!Object.keys(activeWallet).length && internalWalletAddress) {
      fetchWallets();
    }
  }, [wallets]);

  const fetchWallets = async () => {
    if (
      wallets.some(
        (wal) =>
          (wal.status == "connecting" || wal.status == "connected") &&
          wal.address === undefined,
      )
    ) {
      return;
    } else {
      let connectedWallets = [];
      wallets.map((wallet) => {
        if (
          wallet?.status === "connected" &&
          wallet?.address &&
          wallet?.walletDetail?.walletId === wallet?.name?.toLocaleLowerCase()
        ) {
          connectedWallets.push(wallet);
          registerWallet(wallet);
        }
      });

      const internalWallet = {
        name: "Internal Wallet",
        address: internalWalletAddress,
        icon: Ethereum,
      };
      connectedWallets.push(internalWallet);
      setWalletOptions(connectedWallets);
      setActiveWallet(internalWallet);
    }
  };

  const registerWallet = async (wallet) => {
    const result = await backend_API.registerWalletAddress(wallet);
  };

  useEffect(() => {
    const data = balances[1].map((balance, index) => ({
      ...currencies[index],
      middleName: "Ethereum",
      middleInfo: "Network",
      price: prices[index],
      value: balance,
    }));

    setCryptList(data);
  }, [prices, balances]);

  return (
    <Card>
      <div className={styles.top}>
        <div className={styles.label}>{t("dashboard.cryptoMarket")}</div>

        <div className={styles.buttonWrapper}>
          <div className={styles.btn}>
            <p>{t("dashboard.hideBalance")}</p>

            <div
              onClick={() => setActiveToggle((prev) => !prev)}
              className={`${activeToggle ? styles.activeToggle : ""} ${
                styles.toggle
              }`}
            >
              <div className={`${styles.toggleCircle}`}></div>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button color="light" onClick={() => setOpenReceiveModal(true)}>
              {t("dashboard.receive")}
            </Button>
            <Button onClick={() => setOpenWithdrawModal(true)}>
              {" "}
              {t("dashboard.send")}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {cryptList
          .filter((cryptItem) => {
            if (activeToggle && parseFloat(cryptItem.value) === 0) return false;
            return true;
          })
          .map((item, index) => (
            <CryptoItem key={index} data={item} />
          ))}
      </div>

      <ReceiveModal
        show={openReceiveModal}
        walletAddress={activeWallet?.address ?? internalWalletAddress}
        setOpenReceiveModal={setOpenReceiveModal}
      />

      <SendModal
        show={openWithdrawModal}
        setShow={setOpenWithdrawModal}
        isExternal={isExternal}
        wallet={activeWallet}
        walletOptions={walletOptions}
        setWallet={(data) => {
          if (data?.name == "ETH") setIsExternal(false);
          else setIsExternal(true);
          setActiveWallet(data);
        }}
      />
    </Card>
  );
};

export default CryptoCard;

const CryptoItem = ({ data }) => {
  let balanceToken = "loading";
  let balanceUSD = "loading";
  if (data.value) {
    balanceToken = data.value;
    if (data.price) {
      balanceUSD = data.value * data.price;
    }
  }

  return (
    <div className={styles.cryptoItem}>
      <div className={styles.left}>
        <img src={data.icon} alt="" />

        <div>
          <div className={styles.title}>{data.name}</div>
          <div className={styles.subtitle}>{`${parseFloat(data.price).toFixed(
            2,
          )}`}</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.title}>{data.middleName}</div>
        <div className={styles.subtitle}>{data.middleInfo}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>${formatUSDBalance(balanceUSD)}</div>
        <div className={styles.subtitle}>
          {formatTokenBalance(balanceToken, data.decimals)} {data.abbr}
        </div>
      </div>
    </div>
  );
};

const ReceiveModal = ({ show, walletAddress, setOpenReceiveModal }) => {
  const { setInfoMessage, clearMessages } = useContext(MessageContext);
  const { t } = useTranslation();

  return (
    <Popup
      show={show}
      onConfirm={() => {
        setOpenReceiveModal(false);
        clearMessages();
      }}
      confirmTitle={t("dashboard.cryptoCard.close")}
      title={t("dashboard.cryptoCard.receiveModal.title")}
    >
      {/* <TopInfo
        // title={t("dashboard.cryptoCard.receiveModal.title")}
        description={t("dashboard.cryptoCard.receiveModal.description")}
      /> */}
      <p className={styles.receiveModalDescription}>
        {t("dashboard.cryptoCard.receiveModal.description")}
      </p>
      <MessageComponent />
      <div className={styles.modalInputs}>
        <div>
          <div className={inputStyles.inputWrapper}>
            <p className={`${inputStyles.label} ${inputStyles.dashboardLabel}`}>
              {t("dashboard.cryptoCard.wallet")}
            </p>

            <CopyValue
              inputStyle={{ width: "78%" }}
              receiveModal
              value={walletAddress}
              onCopy={() =>
                setInfoMessage(t("dashboard.cryptoCard.walletCopied"))
              }
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};

const SendModal = ({
  show,
  setShow,
  isExternal,
  wallet,
  walletOptions,
  setWallet,
}) => {
  const [withdrawCurrency, setWithdrawCurrency] = useState(currencies[0].abbr);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { t } = useTranslation();
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const withdraw = async () => {
    if (isWithdrawing) return;

    if (withdrawAmount === "") {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.amountError"));
      return;
    }

    if (withdrawAddress === "") {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.addressError"));
      return;
    }

    if (password === "") {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.passwordError"));
      return;
    }

    const sendCurrency = currencies.find(
      (currency) => currency.abbr === withdrawCurrency,
    );
    if (!sendCurrency) {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.correctCurrencyError"));
      return;
    }

    // Check password
    const backend_Api = new backendAPI();
    const passwordCorrect = await backend_Api.checkPassword(password);
    console.log("passwordCorrect: " + passwordCorrect);
    if (!passwordCorrect) {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.correctPasswordError"));
      return;
    }

    //Before withdraw
    setPassword("");
    setIsWithdrawing(true);
    setInfoMessage(t("dashboard.cryptoCard.sendModal.withdrawing"));

    // Withdraw
    const tokenAddress = sendCurrency.address;
    // TODO! How to determine the right wallet?
    // const walletAddres = "";
    // const isExternal = false;
    if (isExternal) {
      const web3API = new web3Api("metamask");

      try {
        const txReceipt = await web3API.send(
          tokenAddress,
          withdrawAmount,
          withdrawAddress,
        );
        if (txReceipt.status === 1) {
          setInfoMessage(t("messages.success.withdrawal"));
          fetchBalances();
        } else {
          setErrorMessage(t("messages.error.withdraw"));
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(t("messages.error.withdraw"));
      }
    } else {
      const backend_Api = new backendAPI();
      const ret = await backend_Api.send(
        tokenAddress,
        withdrawAmount,
        withdrawAddress,
        password,
      );
      if (ret) {
        setInfoMessage(t("messages.success.withdrawal"));
        fetchBalances();
      } else {
        setErrorMessage(t("messages.error.withdraw"));
      }
    }
  };

  return (
    <Popup
      show={show}
      cancelTitle={t("general.close")}
      confirmTitle={t("general.withdraw")}
      onClose={() => {
        setShow(false);
        clearMessages();
      }}
      onConfirm={() => withdraw()}
      title={t("dashboard.cryptoCard.sendModal.title")}
    >
      <MessageComponent />
      {/* <TopInfo 
       description={t("dashboard.cryptoCard.sendModal.description")}
       /> */}

      <div className={styles.modalInputs}>
        <OptionsWithImage
          value={wallet?.name}
          label={t("dashboard.cryptoCard.sendModal.walletLabel")}
          icon={wallet?.icon}
          walletAddress={wallet?.address}
          dashboard
          wallet={wallet}
          options={walletOptions}
          setValue={setWallet}
        />

        <Options
          dashboard
          label={t("dashboard.cryptoCard.sendModal.currencyLabel")}
          placeholder={t("dashboard.cryptoCard.sendModal.currencyPlaceholder")}
          value={withdrawCurrency}
          options={currencies.map((item) => item.abbr)}
          setValue={setWithdrawCurrency}
        />

        <Input
          dashboard
          label={t("dashboard.cryptoCard.sendModal.amountLabel")}
          placeholder={t("dashboard.cryptoCard.sendModal.amountLabel")}
          value={withdrawAmount}
          setState={setWithdrawAmount}
        />

        <Input
          dashboard
          label={t("dashboard.cryptoCard.sendModal.addressLabel")}
          placeholder={t("dashboard.cryptoCard.sendModal.addressLabel")}
          value={withdrawAddress}
          setState={setWithdrawAddress}
        />

        <Input
          dashboard
          label={t("dashboard.cryptoCard.sendModal.passwordLabel")}
          placeholder={t("dashboard.cryptoCard.sendModal.passwordLabel")}
          value={password}
          setState={setPassword}
          secure
        />
      </div>
    </Popup>
  );
};
