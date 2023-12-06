import Card from "../card/card";
import styles from "./cryptoCard.module.css";

import { useEffect, useState, useContext } from "react";
import useInternalWallet from "../../../hooks/internalWallet";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import backendAPI from "../../../api/backendAPI";
import { currencies } from "../../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../../utils";
import { MessageContext } from "../../../context/message";
import ModalOverlay from "../../../dashboard/modal/modalOverlay";
import MessageComponent from "../../../components/message";
import TopInfo from "../../../dashboard/topInfo/topInfo";
import CopyValue from "../../../dashboard/copyValue";
import inputStyles from "../../../components/input/input.module.css";
import Input, { Options } from "../../../components/input/input";
import Button from "../button/button";
import Popup from "../popup/popup";

const CryptoCard = () => {
  const [activeToggle, setActiveToggle] = useState(false);
  let internalWalletAddress = useInternalWallet();
  const metamask = {
    connect: useConnect(),
    disconnect: useDisconnect(),
    config: metamaskWallet(),
    address: useAddress(),
    status: useConnectionStatus(),
  };
  const backend_API = new backendAPI();
  const [cryptList, setCryptList] = useState([]);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  const { balances, fetchBalances } = useBalances(metamask);
  const { prices, fetchPrices } = usePrices(metamask);

  useEffect(() => {
    fetchPrices();
    fetchBalances();

    if (metamask.status === "connected" && metamask.address) {
      registerWallet();
    }

    async function registerWallet() {
      const result = await backend_API.registerWalletAddress(metamask.address);
    }
  }, [metamask.status, metamask.address]);

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
        <div className={styles.label}>Crypto Market</div>

        <div className={styles.buttonWrapper}>
          <div className={styles.btn}>
            <p>Hide Zero Balance Assets</p>

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
              Receive
            </Button>
            <Button onClick={() => setOpenWithdrawModal(true)}>Send</Button>
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
        walletAddress={internalWalletAddress}
        setOpenReceiveModal={setOpenReceiveModal}
      />

      <SendModal show={openWithdrawModal} setShow={setOpenWithdrawModal} />
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

  return (
    <Popup
      show={show}
      onConfirm={() => {
        setOpenReceiveModal(false);
        clearMessages();
      }}
      confirmTitle="Close"
    >
      <MessageComponent />
      <TopInfo
        title={"Receive funds"}
        description={
          "Receive funds by sending cryptocurrency to the address below."
        }
      />
      <div className={styles.modalInputs}>
        <div>
          <div className={inputStyles.inputWrapper}>
            <p className={`${inputStyles.label} ${inputStyles.dashboardLabel}`}>
              Wallet address
            </p>

            <CopyValue
              value={walletAddress}
              onCopy={() => setInfoMessage("Wallet address copied!")}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};

const SendModal = ({ show, setShow }) => {
  const [withdrawCurrency, setWithdrawCurrency] = useState(currencies[0].abbr);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const withdraw = async () => {
    if (isWithdrawing) return;

    if (withdrawAmount === "") {
      setErrorMessage("Please enter an amount to withdraw.");
      return;
    }

    if (withdrawAddress === "") {
      setErrorMessage("Please enter an address to withdraw to.");
      return;
    }

    if (password === "") {
      setErrorMessage("Please enter your password.");
      return;
    }

    const sendCurrency = currencies.find(
      (currency) => currency.abbr === withdrawCurrency,
    );
    if (!sendCurrency) {
      setErrorMessage("Please select a correct currency to withdraw.");
      return;
    }

    // Check password
    const backend_Api = new backendAPI();
    const passwordCorrect = await backend_Api.checkPassword(password);
    console.log("passwordCorrect: " + passwordCorrect);
    if (!passwordCorrect) {
      setErrorMessage("You did not provide the correct password!");
      return;
    }

    //Before withdraw
    setPassword("");
    setIsWithdrawing(true);
    setInfoMessage("Withdrawing...");

    // Withdraw
    const tokenAddress = sendCurrency.address;

    const ret = await backend_Api.send(
      tokenAddress,
      withdrawAmount,
      withdrawAddress,
      password,
    );
    if (ret) {
      setInfoMessage("Withdrawal successful!");
      fetchBalances();
    } else {
      setErrorMessage("Withdrawal failed!");
    }
  };

  return (
    <Popup
      show={show}
      cancelTitle="Close"
      confirmTitle="Withdraw"
      onClose={() => {
        setShow(false);
        clearMessages();
      }}
      onConfirm={() => withdraw()}
    >
      <MessageComponent />
      <TopInfo
        title={"Withdraw funds"}
        description={"You requested to withdraw funds from your account."}
      />

      <div className={styles.modalInputs}>
        <Options
          dashboard
          label="Currency options"
          placeholder="Select Currency Option"
          value={withdrawCurrency}
          options={currencies.map((item) => item.abbr)}
          setValue={setWithdrawCurrency}
        />

        <Input
          dashboard
          label="Amount"
          placeholder="Enter amount"
          value={withdrawAmount}
          setState={setWithdrawAmount}
        />

        <Input
          dashboard
          label="Address"
          placeholder="Enter address"
          value={withdrawAddress}
          setState={setWithdrawAddress}
        />

        <Input
          dashboard
          label="Password"
          placeholder="Enter password"
          value={password}
          setState={setPassword}
          secure
        />
      </div>
    </Popup>
  );
};
