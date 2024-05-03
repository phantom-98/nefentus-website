import Button from "../button/button";
import Card from "../card/card";
import styles from "./cryptoCard.module.css";

import { useContext, useEffect, useState } from "react";
import {
  CoreWallet,
  bloctoWallet,
  coin98Wallet,
  coreWallet,
  cryptoDefiWallet,
  frameWallet,
  metamaskWallet,
  okxWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  useConnect,
  useNetworkMismatch,
  useSwitchChain,
  useWallet,
  walletConnect,
  xdefiWallet,
  zerionWallet,
} from "@thirdweb-dev/react";
import useInternalWallet from "../../../hooks/internalWallet";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import backendAPI from "../../../api/backendAPI";
import { currencies, blockchainToName, chainId } from "../../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../../utils";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../context/message";
import MessageComponent from "../../../components/message";
import TopInfo from "../../../dashboard/topInfo/topInfo";
import CopyValue from "../../../dashboard/copyValue";
import inputStyles from "../../../components/input/input.module.css";
import Input, { Options } from "../../../components/input/input";
import Popup from "../popup/popup";
import { web3Api } from "../../../api/web3Api";
import { coinbaseWallet } from "@thirdweb-dev/react";
import { trustWallet } from "@thirdweb-dev/react";
import { useAuth } from "../../../context/auth/authContext";

const CryptoCard = ({ wallet }) => {
  const { internalWalletAddress } = useInternalWallet();

  const [activeToggle, setActiveToggle] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [cryptList, setCryptList] = useState([]);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  const { t } = useTranslation();
  const currencyList = currencies();

  const { balances, fetchBalances } = useBalances(wallet);
  const { prices, fetchPrices } = usePrices(wallet);

  const connectedWallet = useWallet();
  const connect = useConnect();

  useEffect(() => {
    updateInfo();
  }, [wallet]);

  const updateInfo = () => {
    fetchBalances(wallet?.address);
    fetchPrices();
  };

  useEffect(() => {
    if (wallet?.name == "ETH" || wallet?.name == "Internal Wallet")
      setIsExternal(false);
    else setIsExternal(true);
  }, [wallet]);

  useEffect(() => {
    const data = currencyList.map((currency, index) => ({
      ...currency,
      middleName: blockchainToName(currency.blockchain),
      middleInfo: "Network",
      price: prices[index],
      value: balances[index],
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
            if (activeToggle && cryptItem?.value === 0) return false;
            return true;
          })
          .map((item, index) => {
            return <CryptoItem key={index} data={item} />;
          })}
      </div>

      <ReceiveModal
        show={openReceiveModal}
        walletAddress={wallet?.address ?? internalWalletAddress}
        setOpenReceiveModal={setOpenReceiveModal}
      />

      <SendModal
        show={openWithdrawModal}
        setShow={setOpenWithdrawModal}
        isExternal={isExternal}
        onSuccess={updateInfo}
        wallet={wallet}
        connectedWallet={connectedWallet}
        connect={connect}
      />
    </Card>
  );
};

export default CryptoCard;

const CryptoItem = ({ data }) => {
  let balanceToken = "loading";
  let balanceUSD = "loading";
  const { currencyRate } = useAuth();
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
          <div className={styles.subtitle}>
            {currencyRate.symbol}
            {formatUSDBalance(data.price * currencyRate.rate)}
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.title}>{data.middleName}</div>
        <div className={styles.subtitle}>{data.middleInfo}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          {currencyRate.symbol}
          {formatUSDBalance(
            balanceUSD === "loading"
              ? balanceUSD
              : formatUSDBalance(balanceUSD * currencyRate.rate),
          )}
        </div>
        <div className={styles.tooltip}>
          <span className={styles.tooltiptext}>
            {" "}
            {formatTokenBalance(balanceToken, data.decimals)}
          </span>
          <div className={styles.subtitle}>
            {formatTokenBalance(balanceToken)} {data.abbr}
          </div>
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
            {/* <p className={`${inputStyles.label} ${inputStyles.dashboardLabel}`}>
              {t("dashboard.cryptoCard.wallet")}
            </p> */}

            <CopyValue
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
  onSuccess,
  wallet,
  connectedWallet,
  connect,
}) => {
  const [withdrawCurrency, setWithdrawCurrency] = useState(
    currencies()[0].abbr,
  );
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { t } = useTranslation();
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const isMismatched = useNetworkMismatch();
  const switchNetwork = useSwitchChain();

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

    const sendCurrency = currencies().find(
      (currency) => currency.abbr === withdrawCurrency,
    );
    console.log(sendCurrency);
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
    setIsWithdrawing(true);

    // Withdraw
    const tokenAddress = sendCurrency.address;
    if (isExternal) {
      const currentWalletConfig =
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
        connectedWallet?.walletId?.toLowerCase() != wallet?.name?.toLowerCase()
      ) {
        setInfoMessage(t("messages.success.connecting"));
        if (
          wallet?.name?.toLowerCase() === "walletconnect" ||
          wallet?.name?.toLowerCase() === "coinbase"
        )
          setShow(false);
        const response = await connect(currentWalletConfig)
          .then(async (res) => {
            setInfoMessage(t("messages.success.connected"));
            setShow(true);
            return true;
          })
          .catch(() => {
            setErrorMessage(t("messages.error.connectionCancel"));
            setIsWithdrawing(false);
            return false;
          });
        if (!response) return;
      }

      setInfoMessage(t("dashboard.cryptoCard.sendModal.withdrawing"));

      const web3API = new web3Api();

      try {
        await switchNetwork(chainId(sendCurrency.blockchain));

        const txReceipt = await web3API.send(
          tokenAddress,
          sendCurrency.blockchain,
          withdrawAmount,
          withdrawAddress,
        );
        if (txReceipt.status === 1) {
          setInfoMessage(t("messages.success.withdrawal"));
          if (onSuccess) onSuccess();
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
        sendCurrency.blockchain,
        withdrawAmount,
        wallet?.address,
        withdrawAddress,
        password,
      );
      if (ret) {
        setInfoMessage(t("messages.success.withdrawal"));
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(t("messages.error.withdraw"));
      }
    }

    setPassword("");
    setIsWithdrawing(false);
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
      spinner={isWithdrawing}
    >
      <MessageComponent />
      {/* <TopInfo 
       description={t("dashboard.cryptoCard.sendModal.description")}
       /> */}

      <div className={styles.modalInputs}>
        <Options
          dashboard
          label={t("dashboard.cryptoCard.sendModal.currencyLabel")}
          placeholder={t("dashboard.cryptoCard.sendModal.currencyPlaceholder")}
          value={withdrawCurrency}
          options={currencies().map((item) => item.abbr)}
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
