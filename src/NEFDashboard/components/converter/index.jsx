import React, { useState } from "react";
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
} from "antd";
import ArrowUpLeft from "../../../assets/newDashboardIcons/arrow-up-left.svg";
import ArrowDown from "../../../assets/newDashboardIcons/arrow-down.svg";
import ArrowLeft from "../../../assets/newDashboardIcons/arrow-left.svg";
import ArrowRight from "../../../assets/newDashboardIcons/arrow-right.svg";
import Ethereum from "../../../assets/newDashboardIcons/ethereum-logo.svg";
import Bitcoin from "../../../assets/icon/crypto/bitcoin.svg";
import EthereumLogo from "../../../assets/icon/crypto/ethereum.svg";
import SwapHorizontal from "../../../assets/newDashboardIcons/swap-horizontal.svg";
import AddIcon from "../../../assets/newDashboardIcons/add.svg";
import SwapVertical from "../../../assets/newDashboardIcons/swap-vertical.svg";
import InfoIcon from "../../../assets/newDashboardIcons/info-gray.svg";
import RefreshIcon from "../../../assets/newDashboardIcons/refresh-blue.svg";
import LocalGasStation from "../../../assets/newDashboardIcons/local-gas-station.svg";
import ConverterIcon from "../../../assets/newDashboardIcons/converter-gray.svg";
import SuccessIcon from "../../../assets/newDashboardIcons/success.svg";
import ConverterSuccessBackground from "../../../assets/newDashboardIcons/converter-success-background.svg";
import "./converter.css";

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
        <div className="converter-total-amount-collapse-item">
          <Flex align="center" justify="space-between">
            <img src={LocalGasStation} alt="gas station logo" />
            <Flex align="center" gap={16}>
              <div>$44.32</div>
              <div>0.000521 ETH</div>
            </Flex>
          </Flex>
          <Flex align="center" justify="space-between">
            <div className="default-text">Estimated gas fee:</div>
            <div>
              <span className="default-text-gray">Max fee: </span>
              <span className="default-text">0.012241 ETH</span>
            </div>
          </Flex>
        </div>
        <Flex
          align="center"
          className="converter-total-amount-collapse-item"
          gap={8}
        >
          <div className="default-text-gray">
            Quotes include a 0.05% Nefentus fee
          </div>
          <img src={InfoIcon} />
        </Flex>
      </div>
    ),
    extra: <div className="default-text-gray">View details</div>,
  },
];

const Converter = ({ openConvertModal, onCloseModal, handleConvertCrypto }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCryptoDrawer, setOpenCryptoDrawer] = useState(false);
  const [step, setStep] = useState(1);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setOpenCryptoDrawer(false);
  };
  return (
    <Modal
      title={
        step == 1 ? (
          <Flex align={"center"} gap={4} className="converter-content">
            <img src={ConverterIcon} />
            <div className="default-text-gray converter-title">
              Currency Swap
            </div>
          </Flex>
        ) : step == 2 ? (
          <Flex align={"center"} gap={4} className="converter-content">
            <img
              src={ArrowLeft}
              alt="arrow-left"
              className="cursor-pointer"
              onClick={() => setStep(step - 1)}
            />
            {/* <div>Cancel</div> */}
            <div className="converter-step2-title">Confirmation</div>
          </Flex>
        ) : null
      }
      open={openConvertModal}
      width={380}
      className="converter"
      footer={null}
      onCancel={onCloseModal}
    >
      <Flex
        vertical
        justify="center"
        gap={16}
        className={
          step == 3 ? "converter-body" : "converter-body converter-content"
        }
      >
        {step == 1 ? (
          <>
            <Col>
              <Flex vertical justify="center" gap={6}>
                <div className="default-text-gray">From</div>
                <Flex
                  className="converter-wallet-container converter-full-width"
                  align="center"
                  justify="space-between"
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <Flex align="center" gap={6}>
                    <div className="converter-logo-container">
                      <img src={ArrowUpLeft} className="converter-logo" />
                    </div>
                    <div>
                      <div className="default-text">MetaMask</div>
                      <div className="default-text-gray">fx43fwrwftg..fref</div>
                    </div>
                  </Flex>
                  <img />
                  <Col>
                    <img src={ArrowDown} />
                  </Col>
                </Flex>
              </Flex>
            </Col>
            <Col>
              <Flex vertical justify="center" gap={6}>
                <div className="default-text-gray">To</div>
                <Input
                  placeholder={"Enter wallet address (0x) "}
                  className="converter-wallet-address"
                />
              </Flex>
            </Col>
            <div>
              <Flex
                vertical
                gap={8}
                justify="center"
                className="converter-content converter-item"
              >
                <Flex align="center" justify="space-between" gap={8}>
                  <div className="default-text-gray">From</div>

                  <div>
                    <span className="default-text-gray">Available: </span>
                    <span className="default-text">0.5 BTC</span>
                  </div>
                </Flex>

                <Flex
                  align="center"
                  justify="space-between"
                  className="converter-currency-dropdown-row"
                >
                  <Flex
                    align="center"
                    gap={4}
                    className="converter-crypto-currency-dropdown"
                    onClick={() => setOpenCryptoDrawer(!openCryptoDrawer)}
                  >
                    <img src={Ethereum} />
                    <div>ETH</div>
                    <img src={ArrowDown} />
                  </Flex>
                  <div>0.005</div>
                </Flex>
              </Flex>
              <Flex
                align="center"
                justify="center"
                className="swap-between-items"
              >
                <img src={SwapVertical} alt="swap" />
              </Flex>

              <Flex
                vertical
                gap={8}
                justify="center"
                className="converter-content converter-item"
              >
                <Flex align="center" justify="space-between" gap={8}>
                  <div className="default-text-gray">To</div>

                  <div>
                    <span className="default-text-gray">Balance: </span>
                    <span className="default-text">0.0341 ETH</span>
                  </div>
                </Flex>

                <Flex
                  align="center"
                  justify="space-between"
                  className="converter-currency-dropdown-row"
                >
                  <Flex
                    align="center"
                    gap={4}
                    className="converter-crypto-currency-dropdown"
                    onClick={() => setOpenCryptoDrawer(!openCryptoDrawer)}
                  >
                    <img src={Ethereum} />
                    <div>ETH</div>
                    <img src={ArrowDown} />
                  </Flex>
                  <div>0.005432</div>
                </Flex>
              </Flex>
            </div>

            <Col>
              <Flex align="center" justify="center" gap={4}>
                <div className="default-text-gray">1BTC ≈ 12.041241 ETH</div>
                <img src={RefreshIcon} alt="refresh" />
              </Flex>
            </Col>
          </>
        ) : step == 2 ? (
          <div>
            <Flex
              align="center"
              justify="center"
              gap={24}
              className="converter-content"
            >
              <Flex
                vertical
                justify="center"
                align="center"
                gap={8}
                className="crypto-coin-block"
              >
                <img src={Bitcoin} alt="coin" width={46} height={46} />
                <Flex vertical justify="center" align="center">
                  <div className="default-text converter-title">BTC</div>
                  <div className="default-text converter-step2-amount">
                    0.005
                  </div>
                </Flex>
              </Flex>

              <Flex
                align="center"
                justify="center"
                className="converter-right-arrow"
              >
                <img src={ArrowRight} alt="swap" />
              </Flex>

              <Flex
                vertical
                justify="center"
                align="center"
                gap={8}
                className="crypto-coin-block"
              >
                <img src={EthereumLogo} alt="coin" width={46} height={46} />
                <Flex vertical justify="center" align="center">
                  <div className="default-text converter-title">ETH</div>
                  <div className="default-text converter-step2-amount">
                    ≈ 0.051245
                  </div>
                </Flex>
              </Flex>
            </Flex>

            <Collapse
              // defaultActiveKey={["1"]}
              // onChange={onChange}
              expandIconPosition={"end"}
              items={items}
              className="converter-total-amount-collapse"
            />
          </div>
        ) : (
          <>
            <div
              style={{ backgroundImage: `url(${ConverterSuccessBackground})` }}
              className="converter-success-container"
            >
              <Flex
                vertical
                align="center"
                justify="center"
                className="converter-success-logo"
                gap={12}
              >
                <img src={SuccessIcon} alt="success" />
                <div className="default-text converter-title">
                  Successful Currency Exchanged
                </div>
              </Flex>
            </div>
            <Flex
              align="center"
              justify="center"
              gap={24}
              className="converter-content step3-block-item"
            >
              <Flex align="center" gap={8} className="crypto-coin-block">
                <img src={Bitcoin} alt="coin" width={36} height={36} />
                <div>
                  <div className="default-text converter-title">BTC</div>
                  <div className="default-text converter-title">0.005</div>
                </div>
              </Flex>

              <Flex
                align="center"
                justify="center"
                className="converter-right-arrow"
              >
                <img src={ArrowRight} alt="swap" />
              </Flex>

              <Flex align="center" gap={8} className="crypto-coin-block">
                <img src={EthereumLogo} alt="coin" width={36} height={36} />
                <div>
                  <div className="default-text converter-title">ETH</div>
                  <div className="default-text converter-title">0.051245</div>
                </div>
              </Flex>
            </Flex>
          </>
        )}

        {step == 1 ? (
          <Button
            className="converter-footer-button"
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : step == 2 ? (
          <Button
            className="converter-footer-button"
            onClick={() => setStep(step + 1)}
          >
            Swap
          </Button>
        ) : (
          <Button
            className="converter-footer-button back-to-home"
            onClick={handleConvertCrypto}
          >
            Back to Home
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
          <div className="converter-drawer-bar"></div>

          {openDrawer ? (
            <>
              <Flex align="center" justify="space-between">
                <div className="default-text-gray drawer-connect-wallet-title">
                  Connected Wallets
                </div>
                <Button
                  icon={<img src={AddIcon} />}
                  onClick={() => walletRef?.current?.click()}
                >
                  Add Wallet
                  {/* <ConnectWallet ref={walletRef} /> */}
                </Button>
              </Flex>
              <Flex vertical>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Flex
                    align="center"
                    gap={6}
                    className="converter-drawer-wallet"
                    onClick={onCloseDrawer}
                    key={index}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className="converter-drawer-wallet-logo"
                    >
                      <img src={ArrowUpLeft} />
                    </Flex>
                    <div>
                      <div className="default-text">MetaMask</div>
                      <div className="default-text-gray">fx43fwrwftg..fref</div>
                    </div>
                  </Flex>
                ))}
              </Flex>
            </>
          ) : (
            <Flex vertical>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Flex
                  className="converter-drawer-wallet"
                  onClick={onCloseDrawer}
                  key={index}
                  justify="space-between"
                >
                  <Flex align="center" gap={6}>
                    <Flex
                      align="center"
                      justify="center"
                      className="converter-drawer-coin-logo"
                    >
                      <img src={ArrowUpLeft} />
                    </Flex>
                    <div>
                      <div className="default-text">Ethereum</div>
                      <div className="default-text-gray">USDT</div>
                    </div>
                  </Flex>
                  <div>
                    <div>1.0006</div>
                    <div>$70,323.34</div>
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
export default Converter;
