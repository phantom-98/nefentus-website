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
  const [total, setTotal] = useState(0);
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [receiverAddress, setReceiverAddress] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [toggleCurrency, setToggleCurrency] = useState(false);
  const [gasValues, setGasValues] = useState({});
  const [gasLimit] = useState(600_000);
  const [loader, setLoader] = useState(true);
  const [gasPriceLoader, setGasPriceLoader] = useState(true);
  const [disable, setDisable] = useState(false);
  const [step2GasValues, setStep2GasValues] = useState({});
  const [step2Amount, setStep2Amount] = useState(0);

  let gasPriceInterval;

  const currencyList = currencies();
  const backend_API = new backendAPI();
  const uniSwap = new uniswapApi();
  const { fetchBalanceForWallet } = useBalances();
  const { prices } = usePrices();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const switchNetwork = useSwitchChain();
  const setConnectedWallet = useSetConnectedWallet();
  const createWalletInstance = useCreateWalletInstance();
  const wallet = useConnectedWallet();

  useEffect(() => {
    if (prices.every((amount) => amount != undefined)) fetchWallets();
  }, [prices]);

  useEffect(() => {
    if (currencyItems?.length) setSelectedCurrency(currencyItems[0]);
  }, [currencyItems]);

  // handling intervals through step state
  useEffect(() => {
    if (step == 1 && Object.keys(selectedCoin)?.length) startGasPriceInterval();
    else setDisable(true);
    return () => clearInterval(gasPriceInterval);
  }, [step]);

  // This useeffect is useful for handling amount when gasPrice changes every 30 seconds
  // useEffect(() => {
  //   fetchGasValues();
  // }, [gasValues, step, selectedCoin]);

  const handleAmountPercentage = (percentage) => {
    if (selectedCoin?.value == 0) return;
    const updatedAmount =
      selectedCoin?.value -
      (gasValues?.gasPrice * gasLimit) / 10 ** selectedCoin?.decimals;
    if (updatedAmount > 0) {
      handleAmount(
        toggleCurrency
          ? (
              (selectedCoin?.price *
                updatedAmount *
                +selectedCurrency?.price *
                percentage) /
              100
            )?.toFixed(9)
          : ((updatedAmount * percentage) / 100)?.toFixed(9),
      );
      setPercentage(percentage);
    } else handleAmount(0, true);
  };

  const handleAmount = (value, isChanged = false) => {
    setSelectedCoin({
      ...selectedCoin,
      amount: toggleCurrency
        ? value / (+selectedCurrency?.price * selectedCoin?.price)
        : value,
      amount_for_currency: toggleCurrency
        ? value
        : selectedCoin?.price * value * +selectedCurrency?.price,
    });
    isChanged && setPercentage(0);
  };

  useMemo(() => {
    if (Object.keys(gasValues)?.length && selectedCoin?.amount != "") {
      if (step == 1) {
        const updatedAmount =
          selectedCoin?.price * selectedCoin?.amount * +selectedCurrency?.price;
        setTotal(updatedAmount);
        setStep2Amount(selectedCoin?.amount);
        setStep2GasValues({ ...gasValues });
      }
      percentage
        ? handleAmountPercentage(percentage)
        : handleAmount(
            toggleCurrency
              ? selectedCoin?.amount_for_currency
              : selectedCoin?.amount,
          );
    }
  }, [gasValues, step]);

  const startGasPriceInterval = (coin = selectedCoin) => {
    setDisable(false);
    if (Object.keys(coin)?.length && step == 1) {
      gasPriceInterval = setInterval(
        async () => await fetchGasPrice(coin?.abbr),
        30000,
      );
    }
  };

  const fetchWallets = async () => {
    setLoader(true);
    const list = await backend_API.getWalletAddresses();

    const balance = await getWalletCryptoList(list[0]);

    const modifiedList = list.map((wallet, index) => ({
      ...wallet,
      name: wallet?.type,
      balance:
        index == 0
          ? balance
              .map((balance, balanceIndex) => balance * prices[balanceIndex])
              .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0)
          : 0,
      ...getWalleBackground(wallet?.type),
    }));

    setSelectedWallet(modifiedList[0]);
    setWallets([...modifiedList]);
    setLoader(false);
  };

  const getWalletCryptoList = async (wallet) => {
    return await fetchBalanceForWallet(wallet?.address)
      .then(async (cryptoBalances) => {
        if (cryptoBalances.some((amount) => amount == undefined)) return [];
        const euroCurrency = await backend_API.getCurrencyRate();
        setcurrencyItems([
          {
            icon: "$",
            name: "USD",
            price: "1.00",
          },
          {
            icon: "€",
            name: "Euro",
            price: euroCurrency?.rate?.toFixed(2),
          },
        ]);

        let totalBalance = cryptoBalances
          .map((balance, index) => balance * prices[index])
          .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0);

        const pers = cryptoBalances?.map((balance, index) =>
          parseFloat(
            ((balance * prices[index]) / (totalBalance * 1.0)) * 100,
          ).toFixed(2),
        );
        const data = currencyList.map((currency, index) => ({
          ...currency,
          middleName: blockchainToName(currency.blockchain),
          middleInfo: "Network",
          price: prices[index],
          value: cryptoBalances[index],
          amount_dollar: parseFloat(
            (prices[index] * cryptoBalances[index]).toFixed(4),
          ),
          amount_euro:
            +euroCurrency?.rate * prices[index] * cryptoBalances[index],
          percentage: pers[index],
          icon:
            currency.name?.toLowerCase() == "ethereum" ||
            currency.name?.toLowerCase() == "wrapped ethereum"
              ? Ethereum
              : currency?.icon,
        }));
        setCryptoList(data);
        setSelectedCoin({ ...data[0], amount: "" });
        fetchGasPrice(data[0]?.abbr);
        startGasPriceInterval(data[0]);

        return cryptoBalances;
      })
      .catch((e) => {
        console.log(e);
        return [];
      });
  };

  const fetchGasPrice = async (blockchain = "ETH") => {
    uniSwap
      .getGasValues(blockchain)
      .then((resp) => {
        setGasPriceLoader(false);
        if (step == 1) setGasValues(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleActiveWallet = async (wlt) => {
    const balance = await getWalletCryptoList(wlt);
    setSelectedWallet({
      ...wlt,
      balance: balance
        .map((balance, balanceIndex) => balance * prices[balanceIndex])
        .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0),
    });
    onCloseDrawer();
    await onWalletConnect(wlt);
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

  const handleSelectedCoin = async (coin) => {
    setSelectedCoin({ ...coin, amount: "" });
    fetchGasPrice(coin?.abbr);
    onCloseDrawer();
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
    if (!selectedCoin?.amount) {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.amountError"));
      return;
    }

    if (!receiverAddress) {
      setErrorMessage(t("dashboard.cryptoCard.sendModal.addressError"));
      return;
    }

    // Withdraw
    const tokenAddress = selectedCoin?.address;
    if (!selectedWallet?.internal) {
      setInfoMessage(t("dashboard.cryptoCard.sendModal.withdrawing"));

      const web3API = new web3Api();

      try {
        await switchNetwork(chainId(selectedCoin?.blockchain));
        const txReceipt = await web3API.send(
          tokenAddress,
          selectedCoin?.blockchain,
          selectedCoin?.amount,
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
        setErrorMessage(t("messages.error.withdraw"));
      }
    } else {
      const backend_Api = new backendAPI();
      const ret = await backend_Api.send(
        tokenAddress,
        selectedCoin?.blockchain,
        selectedCoin?.amount,
        selectedWallet?.address,
        receiverAddress,
        password,
      );
      if (ret) {
        setInfoMessage(t("messages.success.withdrawal"));
        // if (onSuccess) onSuccess();
      } else {
        setErrorMessage(t("messages.error.withdraw"));
      }
    }
    await disconnect();
    // setPassword("");
    // setIsWithdrawing(false);
    onWalletSuccess(false);
    handleSubmitCrypto();
  };

  return (
    <Modal
      title={
        step == 1 ? (
          <Flex align={"center"} gap={4} className="send-modal-title">
            <img src={ArrowUpLeft} />
            <div className="default-text send-crypto-title">Send Crypto</div>
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
            <div className="send-crypto-step2-title">Confirm Payment</div>
          </Flex>
        )
      }
      open={openSendModal}
      onCancel={async () => {
        await disconnect();
        onWalletSuccess(false);
        onCloseModal();
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
            <div className="default-text-gray">From</div>
            {loader ? (
              <Skeleton.Input active className="wallet-skeleton" />
            ) : (
              <Flex
                className="send-crypto-wallet-container send-crypto-full-width"
                align="center"
                justify="space-between"
                onClick={() => !disable && setOpenDrawer(!openDrawer)}
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
            <div className="default-text-gray">To</div>
            <Input
              placeholder={"Enter wallet address (0x) "}
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
              <div className="default-text-gray">Password</div>
              <Input.Password
                placeholder={"Enter wallet address (0x) "}
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
                  <div className="default-text-gray">Enter Amount</div>
                  <Flex align="center" className="send-modal-swap-currency">
                    {toggleCurrency ? (
                      <Flex align="center">
                        <img
                          src={selectedCoin?.icon}
                          alt="icon"
                          width={14}
                          height={14}
                        />
                        <div>
                          {" "}
                          {formatTokenBalance(selectedCoin?.amount, 4)}
                        </div>
                      </Flex>
                    ) : (
                      <div>
                        {(selectedCurrency?.icon ?? "$") +
                          formatTokenBalance(
                            selectedCoin?.amount_for_currency,
                            2,
                          )}
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
                    value={
                      toggleCurrency
                        ? selectedCoin?.amount_for_currency
                        : selectedCoin?.amount
                    }
                    disabled={disable}
                    onChange={(e) => handleAmount(e.target.value, true)}
                    className="crypto-amount-input"
                  />
                  <Flex
                    align="center"
                    gap={4}
                    className="crypto-currency-dropdown"
                    onClick={() => setOpenCryptoDrawer(!openCryptoDrawer)}
                  >
                    {toggleCurrency ? (
                      <>
                        <div>{selectedCurrency?.icon}</div>
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
                    onClick={() => handleAmountPercentage(value)}
                  >
                    {value}%
                  </Button>
                ))}
              </Flex>
            </Col>
            <Col>
              <Flex align="center" justify="space-between">
                <div className="default-text-gray">Balance</div>
                <Flex align="center" gap={6}>
                  <div>{formatTokenBalance(selectedCoin?.value, 4)}</div>
                  <div>{selectedCoin?.abbr}</div>
                </Flex>
              </Flex>
            </Col>
            {gasPriceLoader ? (
              <Skeleton.Input active className="wallet-skeleton" />
            ) : (
              <GasDetail
                gasLimit={gasLimit}
                gasValues={gasValues}
                selectedCoin={selectedCoin}
                selectedCurrency={selectedCurrency}
              />
            )}
          </>
        ) : (
          <Flex vertical justify="center" gap={16}>
            <Flex vertical align="center" justify="center" gap={8}>
              <div className="default-text-gray send-crypto-title">Amount</div>
              <div className="send-crypto-amount default-text">
                {step2Amount + " " + selectedCoin?.abbr}{" "}
              </div>
              <Flex align="center" gap={2}>
                <img src={SwapHorizontal} />
                <div className="default-text send-crypto-title">
                  ≈{selectedCurrency?.icon + total}
                </div>
              </Flex>
            </Flex>

            <GasDetail
              gasLimit={gasLimit}
              gasValues={step2GasValues}
              selectedCoin={selectedCoin}
            />
          </Flex>
        )}
        {step == 1 ? (
          <Button
            className="send-crypto-footer-button"
            onClick={() => setStep(() => step + 1)}
            disabled={
              selectedCoin?.value < selectedCoin?.amount ||
              selectedCoin?.amount == "" ||
              selectedCoin?.amount == 0
            }
          >
            Next
          </Button>
        ) : (
          <Button className="send-crypto-footer-button" onClick={handlePayment}>
            Confirm
          </Button>
        )}
      </Flex>

      <Drawer
        title={null}
        placement="bottom"
        closable={false}
        onClose={() => {
          onCloseModal();
          disconnect();
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
                  Connected Wallets
                </div>
                <Button
                  icon={<img src={AddIcon} />}
                  onClick={() => walletRef?.current?.click()}
                  className="send-crypto-add-wallet"
                >
                  Add Wallet
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
                    onClick={() => handleActiveWallet(wallet)}
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
                        setOpenCryptoDrawer(!openCryptoDrawer);
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
                          <div>{item?.icon}</div>
                        </Flex>
                        <div className="default-text">{item?.name}</div>
                      </Flex>
                      <div className="crypto-coin-value">
                        {item?.price ?? 0}
                      </div>
                    </Flex>
                  ))
                : cryptoList?.map((cryptoCoin, index) => (
                    <Flex
                      className="send-crypto-drawer-wallet"
                      onClick={() => {
                        handleSelectedCoin(cryptoCoin);
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
                          <div className="default-text">{cryptoCoin?.name}</div>
                          <div className="default-text-gray">
                            {cryptoCoin?.middleName}
                          </div>
                        </div>
                      </Flex>
                      <div className="crypto-coin-value">
                        <div>
                          {" "}
                          {formatTokenBalance(cryptoCoin?.value, 4) ?? 0}
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
