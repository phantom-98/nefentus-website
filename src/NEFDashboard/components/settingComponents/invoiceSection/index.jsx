import React, { useContext, useEffect, useState } from "react";
import backendAPI from "../../../../api/backendAPI";
import { getWalleBackground } from "../../../../utils";
import ArrowDownIcon from "../../../../assets/newDashboardIcons/down-arrow.svg";
import { Button, Dropdown, Flex, Input, Skeleton, Switch } from "antd";
import WalletAddressFormatter from "../../../../func/walletAddressFormatter";
import VatNumberModal from "./vatNumberModal";
import "./invoiceSection.css";
import { MessageContext } from "../../../../context/message";
import { useTranslation } from "react-i18next";

const InvoiceSection = ({ segment }) => {
  const backend_API = new backendAPI();
  const { t } = useTranslation();
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [data, setData] = useState({});
  const [vatModal, setVatModal] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    if (wallets?.length > 0) loadSettings();
  }, [wallets]);
  const invoiceOptions = [
    {
      title: "Funds receiving wallet",
      subtitle:
        "Choose the wallet that receives funds when creating an invoice or selling product.",
    },
    {
      title: "VAT Number",
      actionItem: (
        <Flex
          align="center"
          justify="space-between"
          className="invoice-action-item-container"
        >
          <div className="default-text-gray vat-number-input">
            {data?.vatNumber}
          </div>
          <Button
            className="default-text-gray vat-number-change-button"
            onClick={() => setVatModal(true)}
          >
            Change
          </Button>
        </Flex>
      ),
    },
    {
      title: "Enable Invoicing",
      actionItem: (
        <Flex
          align="center"
          justify="space-between"
          className="invoice-action-item-container"
        >
          <div className="default-text-gray enable-invoicing-value">
            {data?.enableInvoicing ? "On" : "Off"}
          </div>
          <Switch
            className="invoice-section-switch"
            checked={data?.enableInvoicing}
            onChange={(toggle) => updateSettings(toggle, "enableInvoicing")}
          />
        </Flex>
      ),
    },
  ];

  const loadSettings = async () => {
    const invoice = await backend_API.getInvoiceSettings();
    const res = await invoice.json();
    setData(res);
    if (res?.walletAddress) {
      setSelectedWallet(
        wallets?.find(
          (wallet) => wallet?.address == res?.walletAddress?.split("--")[1],
        ),
      );
    }
  };

  const fetchWallets = async () => {
    setLoader(true);
    const list = await backend_API.getWalletAddresses();
    const modifiedList = list.map((wallet, index) => ({
      ...wallet,
      name: wallet?.type,
      ...getWalleBackground(wallet?.type),
    }));
    setWallets([...modifiedList]);
    setLoader(false);
  };

  const updateSettings = async (value, key) => {
    const payload = { ...data, [key]: value };
    const response = await backend_API.updateInvoiceSettings(payload);
    if (response == null) {
      setErrorMessage(t("messages.error.general"));
      return;
    } else {
      setInfoMessage(t("messages.success.general"));
      loadSettings();
    }
  };

  const onWalletChange = (e) => {
    updateSettings(
      wallets[+e?.key]?.name + "--" + wallets[+e?.key]?.address,
      "walletAddress",
    );
  };

  const onSubmitVat = (value, key) => {
    updateSettings(value, key);
    setVatModal(false);
  };

  return (
    <>
      {vatModal && (
        <VatNumberModal
          open={vatModal}
          onClose={() => setVatModal(false)}
          onSubmit={(value, key) => {
            onSubmitVat(value, key);
          }}
          autoFilledValue={data?.vatNumber}
        />
      )}

      <Flex vertical gap={32} className="invoice-section-option-wrapper">
        {invoiceOptions?.map((option, index) => (
          <Flex
            key={index}
            align="center"
            justify="space-between"
            className={option?.title.replaceAll(" ", "-").toLowerCase()}
          >
            <Flex vertical gap={2}>
              <div className="default-text invoice-section-option-title">
                {option?.title}
              </div>
              {option?.subtitle && (
                <div className="default-text-gray invoice-section-option-subtitle">
                  {option?.subtitle}
                </div>
              )}
            </Flex>
            {index == 0 ? (
              loader ? (
                <div className="invoice-action-item-container">
                  <Flex
                    align="center"
                    gap={6}
                    className="invoice-wallet-container invoice-section-wallet-dropdown"
                  >
                    <Skeleton.Avatar size="default" shape="circle" />
                    <Flex vertical>
                      <Skeleton.Input style={{ height: 24 }} active />
                      <Skeleton.Input
                        style={{ height: 20, marginTop: 4 }}
                        active
                      />
                    </Flex>
                  </Flex>
                </div>
              ) : (
                <Dropdown
                  menu={{
                    items: wallets?.map((wallet, index) => ({
                      key: index.toString(),
                      label: (
                        <Flex align="center" gap={6}>
                          <div className="invoice-wallet-option-icon">
                            <img src={wallet?.logo} width={16} height={16} />
                          </div>
                          <div>
                            <div className="default-text wallet-option-name">
                              {wallet?.name == "internal"
                                ? "Nefentus"
                                : wallet?.name}
                            </div>
                            <div className="default-text-gray">
                              {WalletAddressFormatter(wallet?.address)}
                            </div>
                          </div>
                        </Flex>
                      ),
                    })),
                    onClick: (e) => onWalletChange(e),
                  }}
                  overlayClassName="invoice-action-item-container"
                  trigger={["click"]}
                  onOpenChange={(e) => console.log(e)}
                >
                  <Flex
                    align="center"
                    gap={6}
                    className="invoice-wallet-container invoice-section-wallet-dropdown"
                  >
                    <div className="invoice-wallet-icon">
                      <img src={selectedWallet?.logo} width={24} height={24} />
                    </div>
                    <div className="invoice-wallet-title-subcontainer">
                      <div className="default-text wallet-option-name">
                        {selectedWallet?.name}
                      </div>
                      <div className="default-text-gray">
                        {WalletAddressFormatter(selectedWallet?.address)}
                      </div>
                    </div>
                    <img src={ArrowDownIcon} alt="icon" />
                  </Flex>
                </Dropdown>
              )
            ) : (
              option?.actionItem
            )}
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default InvoiceSection;
