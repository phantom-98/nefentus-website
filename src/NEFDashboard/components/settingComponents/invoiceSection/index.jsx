import React, { useEffect, useState } from "react";
import backendAPI from "../../../../api/backendAPI";
import { getWalleBackground } from "../../../../utils";
import ArrowDownIcon from "../../../../assets/newDashboardIcons/down-arrow.svg";
import { Button, Dropdown, Flex, Input, Switch } from "antd";
import "./invoiceSection.css";
import WalletAddressFormatter from "../../../../func/walletAddressFormatter";

const InvoiceSection = ({ segment }) => {
  const backend_API = new backendAPI();
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState({});
  useEffect(() => {
    fetchWallets();
  }, []);
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
          <div className="default-text-gray vat-number-input">VAT32168</div>
          <Button className="default-text-gray vat-number-change-button">
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
          <div className="default-text-gray enable-invoicing-value">On</div>
          <Switch className="invoice-section-switch" />
        </Flex>
      ),
    },
  ];

  const fetchWallets = async () => {
    // setLoader(true);
    const list = await backend_API.getWalletAddresses();

    const modifiedList = list.map((wallet, index) => ({
      ...wallet,
      name: wallet?.type,
      ...getWalleBackground(wallet?.type),
    }));

    setSelectedWallet(modifiedList[1]);
    setWallets([...modifiedList]);
    // setLoader(false);
  };
  return (
    <Flex vertical gap={32}>
      {invoiceOptions?.map((option, index) => (
        <Flex key={index} align="center" justify="space-between">
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
          ) : (
            option?.actionItem
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default InvoiceSection;
