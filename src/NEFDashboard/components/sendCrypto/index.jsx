import React, { useContext, useEffect, useState } from "react";
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
import { PlusOutlined } from "@ant-design/icons";
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
  walletConnect,
} from "@thirdweb-dev/react";
import { useTranslation } from "react-i18next";

const SendCrypto = ({ openSendModal, onCloseModal, handleSubmitCrypto }) => {
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);
  const { t } = useTranslation();
  const [currencyItems, setcurrencyItems] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCryptoDrawer, setOpenCryptoDrawer] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [wallets, setWallets] = useState([]);
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

  const currencyList = currencies();
  const backend_API = new backendAPI();
  const uniSwap = new uniswapApi();
  const { fetchBalanceForWallet } = useBalances();
  const { prices } = usePrices();
  const connect = useConnect();
  const switchNetwork = useSwitchChain();

  const items = [
    {
      key: "1",
      label: (
        <Flex align="center" gap={8}>
          <div>Quotes</div>
          <img src={InfoIcon} />
        </Flex>
      ),
      children: (
        <div>
          <div className="total-amount-collapse-item">
            <Flex align="center" justify="space-between">
              <img src={LocalGasStation} alt="gas station logo" />
              <div>
                {((gasValues?.gasPrice * gasLimit) / 10 ** 18).toFixed(10)} ETH
              </div>
            </Flex>
            <Flex align="center" justify="space-between">
              <div className="default-text">Estimated gas fee:</div>
              <div>
                <span className="default-text-gray">Max fee: </span>
                <span className="default-text">
                  {((gasValues?.maxFeePerGas * gasLimit) / 10 ** 18).toFixed(
                    10,
                  )}{" "}
                  ETH
                </span>
              </div>
            </Flex>
          </div>
          <Flex
            align="center"
            justify="space-between"
            className="total-amount-collapse-item"
          >
            <div>
              <span className="default-text-gray">Gas Price: </span>
              <span className="default-text">
                {Math.round(gasValues?.gasPrice / 10 ** 9)} gwei
              </span>
            </div>
            <div>
              <span className="default-text-gray">Gas Limit: </span>
              <span className="default-text">
                {Math.round(gasValues?.maxPriorityFeePerGas / 10 ** 6)}
              </span>
            </div>
          </Flex>
        </div>
      ),
      extra: <div className="default-text-gray">View details</div>,
    },
  ];
  useEffect(() => {
    if (prices.every((amount) => amount != undefined)) fetchWallets();
  }, [prices]);

  useEffect(() => {
    if (currencyItems?.length) setSelectedCurrency(currencyItems[0]);
  }, [currencyItems]);

  useEffect(() => {
    setTotal(
      +(selectedCoin?.price * selectedCoin?.amount * +selectedCurrency?.price) +
        Math.round(gasValues?.gasPrice / 10 ** 9) * 0.0003,
    );
  }, [selectedCoin]);

  const fetchWallets = async () => {
    setLoader(true);
    const list = await backend_API.getWalletAddresses();

    const balance = await getWalletCryptoList(list[1]);

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

    setSelectedWallet(modifiedList[1]);
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
        // setTotal(totalBalance || 0);

        if (totalBalance > 0) {
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
        }
        return cryptoBalances;
      })
      .catch((e) => {
        console.log(e);
        return [];
      });
  };

  const fetchGasPrice = async (blockchain) => {
    const resp = await uniSwap.getGasValues(blockchain);
    setGasValues(resp);
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

  const handleAmount = (value) => {
    setSelectedCoin({ ...selectedCoin, amount: value });
    setPercentage(0);
  };

  const handleAmountPercentage = (percentage) => {
    handleAmount(((selectedCoin?.value * percentage) / 100)?.toFixed(9));
    setPercentage(percentage);
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

    // const sendCurrency = currencies().find(
    //   (currency) => currency.abbr === withdrawCurrency,
    // );
    // console.log(sendCurrency);
    // if (!sendCurrency) {
    //   setErrorMessage(t("dashboard.cryptoCard.sendModal.correctCurrencyError"));
    //   return;
    // }

    // Check password
    // const backend_Api = new backendAPI();
    // const passwordCorrect = await backend_Api.checkPassword(password);
    // console.log("passwordCorrect: " + passwordCorrect);
    // if (!passwordCorrect) {
    //   setErrorMessage(t("dashboard.cryptoCard.sendModal.correctPasswordError"));
    //   return;
    // }

    //Before withdraw
    // setIsWithdrawing(true);

    // Withdraw
    const tokenAddress = selectedCoin?.address;
    if (!selectedWallet?.internal) {
      const currentWalletConfig =
        selectedWallet?.type?.toLowerCase() === "metamask"
          ? metamaskWallet()
          : selectedWallet?.type?.toLowerCase() === "walletconnect"
          ? walletConnect({
              qrModal: "walletConnect",
              qrModalOptions: {
                themeMode: "light",
              },
              recommended: true,
            })
          : selectedWallet?.type?.toLowerCase() === "coinbase"
          ? coinbaseWallet({ recommended: true, qrmodal: "coinbase" })
          : // : selectedWallet?.type?.toLowerCase() === "trust"
            // ? trustWallet({
            //     projectId: "57e1cfc18509bb9cc4d51638ce8d18ed",
            //     recommended: true,
            //   })
            null;

      setInfoMessage(t("messages.success.connecting"));
      // if (
      //   selectedWallet?.name?.toLowerCase() === "walletconnect" ||
      //   selectedWallet?.name?.toLowerCase() === "coinbase"
      // )
      //   setShow(false);
      const response = await connect(currentWalletConfig)
        .then(async (res) => {
          setInfoMessage(t("messages.success.connected"));
          // setShow(true);
          return true;
        })
        .catch(() => {
          setErrorMessage(t("messages.error.connectionCancel"));
          // setIsWithdrawing(false);
          return false;
        });
      if (!response) return;

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
        console.log(error);
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
        "",
      );
      if (ret) {
        setInfoMessage(t("messages.success.withdrawal"));
        // if (onSuccess) onSuccess();
      } else {
        setErrorMessage(t("messages.error.withdraw"));
      }
    }

    // setPassword("");
    // setIsWithdrawing(false);
    handleSubmitCrypto();
  };

  return (
    <Modal
      title={
        step == 1 ? (
          <Flex align={"center"} gap={4} className="send-modal-title">
            <img src={ArrowUpLeft} />
            <div className="default-text-gray send-crypto-title">
              Send Crypto
            </div>
          </Flex>
        ) : (
          <Flex align={"center"} gap={4} className="send-modal-title">
            <img
              src={ArrowLeft}
              alt="arrow-left"
              className="cursor-pointer"
              onClick={() => setStep(step - 1)}
            />
            {/* <div>Cancel</div> */}
            <div className="send-crypto-step2-title">Confirm Payment</div>
          </Flex>
        )
      }
      open={openSendModal}
      onOk={handleSubmitCrypto}
      onCancel={onCloseModal}
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
            <div className="default-text-gray">To</div>
            <Input
              placeholder={"Enter wallet address (0x) "}
              className="send-crypto-wallet-address"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
          </Flex>
        </Col>
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
                        <div> {selectedCoin?.amount}</div>
                      </Flex>
                    ) : (
                      <div>
                        {selectedCurrency?.icon +
                          formatTokenBalance(
                            selectedCoin?.price *
                              selectedCoin?.amount *
                              +selectedCurrency?.price,
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
                      onClick={exchangeCurrency}
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
                        ? selectedCoin?.price *
                          selectedCoin?.amount *
                          +selectedCurrency?.price
                        : selectedCoin?.amount
                    }
                    onChange={(e) => handleAmount(e.target.value)}
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
                        <div>{selectedCoin?.name}</div>
                        <img src={ArrowDown} />
                      </>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Col>
            <Col>
              <Flex align={"center"} justify="space-between">
                {[25, 50, 75, 100].map((value, index) => (
                  <Button
                    size={"large"}
                    key={index}
                    className={
                      percentage === value && "send-modal-percentage-active"
                    }
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
          </>
        ) : (
          <div>
            <Flex vertical align="center" justify="center" gap={8}>
              <div className="default-text-gray send-crypto-title">Amount</div>
              <div className="send-crypto-amount default-text">
                {selectedCoin?.amount + " " + selectedCoin?.abbr}{" "}
              </div>
              <Flex align="center" gap={2}>
                <img src={SwapHorizontal} />
                <div className="default-text send-crypto-title">
                  ≈
                  {selectedCurrency?.icon +
                    selectedCoin?.price *
                      selectedCoin?.amount *
                      +selectedCurrency?.price}
                </div>
              </Flex>
            </Flex>

            <Collapse
              expandIconPosition={"end"}
              items={items}
              className="total-amount-collapse"
            />
            <Flex
              justify="space-between"
              align="center"
              className="send-crypto-total-amount-row"
            >
              <div className="default-text send-crypto-title">Total</div>
              <div className="default-text">≈${total}</div>
              {/* <div className="default-text">0.07631 BTC</div> */}
            </Flex>
          </div>
        )}
        {step == 1 ? (
          <Button
            className="send-crypto-footer-button"
            onClick={() => setStep(step + 1)}
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
        onClose={onCloseDrawer}
        open={openDrawer || openCryptoDrawer}
        getContainer={false}
        height={300}
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
                  icon={<PlusOutlined />}
                  onClick={() => walletRef?.current?.click()}
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
                          className="send-crypto-drawer-coin-logo"
                        >
                          <img src={cryptoCoin?.icon} />
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
