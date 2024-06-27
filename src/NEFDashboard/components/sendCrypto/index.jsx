import React, { useContext, useEffect, useMemo, useState } from "react";
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
import Ethereum from "../../../assets/newDashboardIcons/ethereum-logo.svg";
import AddIcon from "../../../assets/newDashboardIcons/add.svg";
import SwapHorizontal from "../../../assets/newDashboardIcons/swap-horizontal.svg";
import SwapVertical from "../../../assets/newDashboardIcons/swap-vertical.svg";
import InfoIcon from "../../../assets/newDashboardIcons/info-gray.svg";
import LocalGasStation from "../../../assets/newDashboardIcons/local-gas-station.svg";
import USDC from "../../../assets/icon/crypto/usdc.svg";
import WalletAddressFormatter from "../../../func/walletAddressFormatter";
import "./sendCrypto.css";
import { blockchainToName, chainId, currencies } from "../../../constants";
import backendAPI from "../../../api/backendAPI";
import useBalances from "../../../hooks/balances";
import {
  formatTokenBalance,
  formatUSDBalance,
  getWalleBackground,
  getWalletIcon,
} from "../../../utils";
import usePrices from "../../../hooks/prices";
import { uniswapApi, web3Api } from "../../../api/web3Api";
import { MessageContext } from "../../../context/message";
import {
  coinbaseWallet,
  metamaskWallet,
  useConnect,
  useSwitchChain,
  useConnectedWallet,
  useSetConnectedWallet,
  walletConnect,
  useDisconnect,
  useCreateWalletInstance,
  xdefiWallet,
  rabbyWallet,
  oneKeyWallet,
  cryptoDefiWallet,
  coreWallet,
  coin98Wallet,
  okxWallet,
  phantomWallet,
  rainbowWallet,
  frameWallet,
  bloctoWallet,
  zerionWallet,
  safeWallet,
  trustWallet,
} from "@thirdweb-dev/react";
import { useTranslation } from "react-i18next";
import GasDetail from "./gasDetails";
import { getCurrencyFlag, getCurrencySymbol } from "../../../countries";

const SendCrypto = ({
  openSendModal,
  onCloseModal,
  handleSubmitCrypto,
  onWalletSuccess,
}) => {
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);
  const { t } = useTranslation();
  const [currencyItems, setcurrencyItems] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCryptoDrawer, setOpenCryptoDrawer] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [wallets, setWallets] = useState([]);
  const [password, setPassword] = useState("");
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [receiverAddress, setReceiverAddress] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [toggleCurrency, setToggleCurrency] = useState(false);
  const [amountInCrypto, setAmountInCrypto] = useState();
  const [amountInCurrency, setAmountInCurrency] = useState();
  const [gasValues, setGasValues] = useState({});
  const [loader, setLoader] = useState(true);
  const [buttonLoder, setButtonLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const backend_API = new backendAPI();
  const { balances, fetchBalances } = useBalances();
  const { prices, fetchPrices } = usePrices();
  const disconnect = useDisconnect();
  const switchNetwork = useSwitchChain();
  const setConnectedWallet = useSetConnectedWallet();
  const createWalletInstance = useCreateWalletInstance();

  const fetchCurrencyRates = async () => {
    const res = await backend_API.getRateList("USD");
    console.log("rates", res);
    if (res) {
      setcurrencyItems(res);
      setSelectedCurrency(res[0]);
    }
  };

  const fetchWallets = async () => {
    setLoader(true);
    const list = await backend_API.getWalletAddresses();

    const modifiedList = list.map((wallet, index) => ({
      ...wallet,
      name:
        wallet?.type == "internal"
          ? "Nefentus"
          : wallet?.type?.substring(0, 1).toUpperCase() +
            wallet?.type?.substring(1),
      ...getWalleBackground(wallet?.type),
    }));

    setSelectedWallet(modifiedList[0]);
    setWallets([...modifiedList]);
    setLoader(false);
  };

  const handleAmount = (value) => {
    setPercentage(null);
    if (toggleCurrency) {
      setAmountInCurrency(value || amountInCurrency);
      setAmountInCrypto(
        (value || amountInCurrency) /
          selectedCoin.price /
          selectedCurrency.rate,
      );
    } else {
      setAmountInCrypto(value || amountInCrypto);
      setAmountInCurrency(
        (value || amountInCrypto) * selectedCoin.price * selectedCurrency.rate,
      );
    }
  };

  const onWalletConnect = async (wlt = selectedWallet) => {
    const currentWalletConfig =
      wlt?.type?.toLowerCase() === "metamask"
        ? metamaskWallet()
        : wlt?.type?.toLowerCase() === "walletconnect"
        ? walletConnect({
            // projectId: "4b9cb6ce8bcff9cedc49607dd34435e5",
            qrModal: "walletConnect", // or "walletConnect"
            qrModalOptions: {
              themeMode: "light",
            },
            recommended: true,
          })
        : wlt?.type?.toLowerCase() === "coinbase"
        ? coinbaseWallet({ recommended: true, qrmodal: "coinbase" })
        : wlt?.type?.toLowerCase() === "trust"
        ? trustWallet({
            projectId: "57e1cfc18509bb9cc4d51638ce8d18ed",
            recommended: true,
          })
        : wlt?.type?.toLowerCase() == "safe"
        ? safeWallet()
        : wlt?.type?.toLowerCase() == "zerionwallet"
        ? zerionWallet()
        : wlt?.type?.toLowerCase() == "blocto"
        ? bloctoWallet()
        : wlt?.type?.toLowerCase() == "frame"
        ? frameWallet()
        : wlt?.type?.toLowerCase() == "rainbowwallet"
        ? rainbowWallet()
        : wlt?.type?.toLowerCase() == "phantom"
        ? phantomWallet()
        : wlt?.type?.toLowerCase() == "okx"
        ? okxWallet()
        : wlt?.type?.toLowerCase() == "coin98"
        ? coin98Wallet()
        : wlt?.type?.toLowerCase() == "core"
        ? coreWallet()
        : wlt?.type?.toLowerCase() == "cryptodefi"
        ? cryptoDefiWallet()
        : wlt?.type?.toLowerCase() == "onekey"
        ? oneKeyWallet()
        : wlt?.type?.toLowerCase() == "rabby"
        ? rabbyWallet()
        : wlt?.type?.toLowerCase() == "xdefi"
        ? xdefiWallet()
        : null;

    const response = createWalletInstance(currentWalletConfig);
    await response.connect();
    setConnectedWallet(response);
    onWalletSuccess(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setOpenCryptoDrawer(false);
  };

  const exchangeCurrency = () => {
    setToggleCurrency(!toggleCurrency);
  };

  const handlePayment = async () => {
    // if (isWithdrawing) return;
    if (!amountInCrypto) {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.amountError"));
      return;
    }

    if (!receiverAddress) {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.addressError"));
      return;
    }

    // Withdraw
    setButtonLoader(true);
    const tokenAddress = selectedCoin?.address;
    if (!selectedWallet?.internal) {
      setInfoMessage(t("dashboard.cryptoCard.sendModal.withdrawing"));

      const web3API = new web3Api();

      try {
        await switchNetwork(chainId(selectedCoin?.blockchain));

        const txReceipt = await web3API.send(
          tokenAddress,
          selectedCoin?.blockchain,
          typeof amountInCrypto == "string"
            ? amountInCrypto
            : `${amountInCrypto?.toFixed(7)}`,
          receiverAddress,
        );
        if (txReceipt.status === 1) {
          setInfoMessage(t("messages.success.withdrawal"));
          // fetching balances again
          // if (onSuccess) onSuccess();
        } else {
          setErrorMessage(t("messages.error.withdraw"));
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(t("messages.error.withdraw"));
      }
    } else {
      const ret = await backend_API.send(
        tokenAddress,
        selectedCoin?.blockchain,
        amountInCrypto,
        selectedWallet?.address,
        receiverAddress,
        password,
      );
      if (ret) {
        setInfoMessage(t("messages.success.withdrawal"));
      } else {
        setErrorMessage(t("messages.error.withdraw"));
      }
    }
    setButtonLoader(false);
    await disconnect();
    onWalletSuccess(false);
    handleSubmitCrypto();
  };

  useEffect(() => {
    if (openSendModal) {
      fetchPrices();
      fetchWallets();
      fetchCurrencyRates();
      setCryptoList([...currencies()]);
      setSelectedCoin({
        ...currencies()[0],
        index: 0,
      });
    }
  }, [openSendModal]);

  useEffect(() => {
    fetchBalances(selectedWallet?.address);
    onWalletConnect();
  }, [selectedWallet]);

  useEffect(() => {
    setCryptoList(
      currencies().map((crypto, index) => ({
        ...crypto,
        price: prices[index],
        balance: balances[index],
      })),
    );
    setSelectedCoin((prev) => ({
      ...prev,
      price: prices[prev.index],
      balance: balances[prev.index],
    }));
  }, [prices, balances]);

  useEffect(() => {
    handleAmount();
  }, [toggleCurrency, selectedCoin, selectedCurrency]);

  useEffect(() => {
    if (gasValues?.gas != undefined && percentage) {
      const v =
        (selectedCoin.balance * percentage) / 100.0 -
        (gasValues?.native == selectedCoin.abbr ? gasValues.gas : 0.0);
      console.log("percentage", (selectedCoin.balance * percentage) / 100.0);
      setAmountInCrypto(v);
      setAmountInCurrency(v * selectedCoin.price * selectedCurrency.rate);
    }
  }, [gasValues, percentage]);

  return (
    <Modal
      title={
        step == 1 ? (
          <Flex align={"center"} gap={4} className="send-modal-title">
            <img src={ArrowUpLeft} />
            <div className="default-text send-crypto-title">
              {t("sendModal.step1-title")}
            </div>
          </Flex>
        ) : (
          <Flex align={"center"} gap={4} className="send-modal-title">
            <img
              src={ArrowLeft}
              alt="arrow-left"
              className="cursor-pointer"
              onClick={() => setStep(() => step - 1)}
            />
            {/* <div>Cancel</div> */}
            <div className="send-crypto-step2-title">
              {t("sendModal.step2-title")}
            </div>
          </Flex>
        )
      }
      open={openSendModal}
      onCancel={async () => {
        if (openDrawer || openCryptoDrawer) onCloseDrawer();
        else {
          await disconnect();
          onWalletSuccess(false);
          onCloseModal();
        }
      }}
      width={380}
      className="send-crypto"
      footer={null}
    >
      <Flex
        vertical
        justify="center"
        gap={16}
        className="send-crypto-body send-crypto-content"
      >
        <Col>
          <Flex vertical justify="center" gap={6}>
            <div className="default-text-gray">{t("sendModal.from")}</div>
            {loader ? (
              <Skeleton.Input active className="wallet-skeleton" />
            ) : (
              <Flex
                className="send-crypto-wallet-container send-crypto-full-width"
                align="center"
                justify="space-between"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <Flex align="center" gap={6}>
                  <div className="send-crypto-logo-container">
                    <img
                      src={selectedWallet?.logo}
                      className="send-crypto-logo"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <div className="default-text send-modal-wallet-title">
                      {selectedWallet?.name}
                    </div>
                    <div className="default-text-gray">
                      {WalletAddressFormatter(selectedWallet?.address)}
                    </div>
                  </div>
                </Flex>
                <img />
                <Col>
                  <img src={ArrowDown} />
                </Col>
              </Flex>
            )}
          </Flex>
        </Col>
        <Col>
          <Flex vertical justify="center" gap={6}>
            <div className="default-text-gray">{t("sendModal.to")}</div>
            <Input
              placeholder={t("sendModal.walletAddressPlaceholder")}
              className="send-crypto-wallet-address"
              value={receiverAddress}
              disabled={disable}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
          </Flex>
        </Col>
        {selectedWallet?.type === "internal" && step == 1 && (
          <Col>
            <Flex vertical justify="center" gap={6}>
              <div className="default-text-gray">{t("sendModal.password")}</div>
              <Input.Password
                placeholder={t("sendModal.passwordPlaceholder")}
                className="send-crypto-wallet-address"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Flex>
          </Col>
        )}
        {step == 1 ? (
          <>
            <Col>
              <Flex vertical justify="center" gap={8}>
                <Flex align="center" justify="space-between">
                  <div className="default-text-gray">
                    {t("sendModal.amountTitle")}
                  </div>
                  <Flex align="center" className="send-modal-swap-currency">
                    {toggleCurrency ? (
                      <Flex align="center">
                        <img
                          src={selectedCoin?.icon}
                          alt="icon"
                          width={14}
                          height={14}
                        />
                        <div> {formatTokenBalance(amountInCrypto, 4)}</div>
                      </Flex>
                    ) : (
                      <div>
                        {getCurrencySymbol()[selectedCurrency.to]}
                        {formatTokenBalance(amountInCurrency, 2)}
                      </div>
                    )}

                    <img
                      src={SwapVertical}
                      alt="swap"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => exchangeCurrency()}
                    />
                  </Flex>
                </Flex>
                <Flex align="center" justify={"space-between"} gap={8}>
                  <Input
                    placeholder={"0.0"}
                    size="large"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    value={toggleCurrency ? amountInCurrency : amountInCrypto}
                    disabled={disable}
                    onChange={(e) => {
                      handleAmount(e.target.value);
                    }}
                    className={`crypto-amount-input ${
                      amountInCrypto < 0 && "crypto-amount-danger"
                    }`}
                  />
                  <Flex
                    align="center"
                    gap={4}
                    className="crypto-currency-dropdown"
                    onClick={() => setOpenCryptoDrawer(!openCryptoDrawer)}
                  >
                    {toggleCurrency ? (
                      <>
                        <div>{getCurrencySymbol()[selectedCurrency?.to]}</div>
                        <div>{selectedCurrency?.name}</div>
                        <img src={ArrowDown} />
                      </>
                    ) : (
                      <>
                        <img src={selectedCoin?.icon} width={24} />
                        <div>{selectedCoin?.abbr}</div>
                        <img src={ArrowDown} />
                      </>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Col>
            <Col>
              <Flex align={"center"} justify="space-between" gap={8}>
                {[25, 50, 75, 100].map((value, index) => (
                  <Button
                    size={"large"}
                    key={index}
                    className={`amount-percentage ${
                      percentage === value && "send-modal-percentage-active"
                    }`}
                    onClick={() => setPercentage(value)}
                  >
                    {value}%
                  </Button>
                ))}
              </Flex>
            </Col>
            <Col>
              <Flex align="center" justify="space-between">
                <div className="default-text-gray">
                  {t("sendModal.balance")}
                </div>
                <Flex align="center" gap={6}>
                  <div>{formatTokenBalance(selectedCoin?.balance, 4)}</div>
                  <div>{selectedCoin?.abbr}</div>
                </Flex>
              </Flex>
            </Col>
          </>
        ) : (
          <Flex vertical justify="center" gap={16}>
            <Flex vertical align="center" justify="center" gap={8}>
              <div className="default-text-gray send-crypto-title">
                {t("sendModal.amount")}
              </div>
              <div className="send-crypto-amount default-text">
                {amountInCrypto + " " + selectedCoin?.abbr}{" "}
              </div>
              <Flex align="center" gap={2}>
                <img src={SwapHorizontal} />
                <div className="default-text send-crypto-title">
                  ≈{getCurrencySymbol()[selectedCurrency.to]}{" "}
                  {formatUSDBalance(
                    amountInCurrency +
                      selectedCurrency.rate * gasValues?.gasUSD,
                  )}
                </div>
              </Flex>
            </Flex>
          </Flex>
        )}

        <GasDetail
          token={selectedCoin}
          currency={selectedCurrency.to}
          rate={selectedCurrency.rate}
          setFee={setGasValues}
        />
        {step == 1 ? (
          <Button
            className="send-crypto-footer-button"
            loading={buttonLoder}
            disabled={
              selectedCoin?.balance < amountInCrypto ||
              amountInCrypto == "" ||
              amountInCrypto <= 0 ||
              (selectedWallet.type === "internal" && !password)
            }
            onClick={() => {
              if (selectedWallet.type === "internal") {
                setButtonLoader(true);
                backend_API.checkPassword(password).then((res) => {
                  if (res) {
                    setStep(2);
                  } else {
                    setPassword("");
                  }
                  setButtonLoader(false);
                });
              } else {
                setStep(2);
              }
            }}
          >
            {t("sendModal.next")}
          </Button>
        ) : (
          <Button
            loading={buttonLoder}
            disabled={!receiverAddress}
            className="send-crypto-footer-button"
            onClick={handlePayment}
          >
            {t("confirm")}
          </Button>
        )}
      </Flex>

      <Drawer
        title={null}
        placement="bottom"
        closable={false}
        onClose={() => {
          onCloseDrawer();
        }}
        open={openDrawer || openCryptoDrawer}
        getContainer={false}
        height={300}
        className="send-crypto-drawer"
      >
        <Flex vertical gap={8} justify="center">
          <div className="send-crypto-drawer-bar"></div>

          {openDrawer ? (
            <>
              <Flex align="center" justify="space-between">
                <div className="default-text-gray drawer-connect-wallet-title">
                  {t("sendModal.connectedWallets")}
                </div>
                <Button
                  icon={<img src={AddIcon} />}
                  onClick={() => walletRef?.current?.click()}
                  className="send-crypto-add-wallet"
                >
                  {t("sendModal.addWallet")}
                </Button>
              </Flex>
              <Flex vertical>
                {wallets?.map((wallet, index) => (
                  <Flex
                    align="center"
                    gap={6}
                    className={
                      selectedWallet?.address === wallet?.address
                        ? "send-crypto-selected-wallet send-crypto-drawer-wallet"
                        : "send-crypto-drawer-wallet"
                    }
                    onClick={() => {
                      setSelectedWallet(wallet);
                      onCloseDrawer();
                    }}
                    key={index}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className="send-crypto-drawer-wallet-logo"
                    >
                      <img src={wallet?.logo} width={24} height={24} />
                    </Flex>
                    <div>
                      <div className="default-text send-modal-wallet-title">
                        {wallet?.name}
                      </div>
                      <div className="default-text-gray">
                        {WalletAddressFormatter(wallet?.address)}
                      </div>
                    </div>
                  </Flex>
                ))}
              </Flex>
            </>
          ) : (
            <Flex vertical>
              {toggleCurrency
                ? currencyItems?.map((item, index) => (
                    <Flex
                      className="send-crypto-drawer-wallet"
                      onClick={() => {
                        setSelectedCurrency(item);
                        onCloseDrawer();
                      }}
                      key={index}
                      justify="space-between"
                    >
                      <Flex align="center" gap={6}>
                        <Flex
                          align="center"
                          justify="center"
                          className="send-crypto-drawer-coin-logo"
                        >
                          {getCurrencyFlag()[item?.to]}
                        </Flex>
                        <div className="default-text">{item?.to}</div>
                      </Flex>
                      <div className="crypto-coin-value">
                        ${formatUSDBalance(1 / item?.rate)}
                      </div>
                    </Flex>
                  ))
                : cryptoList?.map((cryptoCoin, index) => (
                    <Flex
                      className="send-crypto-drawer-wallet"
                      onClick={() => {
                        setSelectedCoin({
                          ...cryptoCoin,
                          index,
                        });
                        onCloseDrawer();
                      }}
                      key={index}
                      justify="space-between"
                    >
                      <Flex align="center" gap={6}>
                        <Flex
                          align="center"
                          justify="center"
                          // className="send-crypto-drawer-coin-logo"
                        >
                          <img src={cryptoCoin?.icon} width={36} height={36} />
                        </Flex>
                        <div>
                          <div className="default-text">{cryptoCoin?.abbr}</div>
                          <div className="default-text-gray">
                            {blockchainToName(cryptoCoin?.blockchain)}
                          </div>
                        </div>
                      </Flex>
                      <div className="crypto-coin-value">
                        <div>
                          {" "}
                          {formatTokenBalance(cryptoCoin?.balance, 4) ?? 0}
                        </div>
                        <div>${cryptoCoin?.price?.toFixed(2)}</div>
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
export default SendCrypto;
