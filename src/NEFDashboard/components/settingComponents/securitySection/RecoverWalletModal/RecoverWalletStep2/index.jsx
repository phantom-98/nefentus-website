import React, { useContext, useState } from "react";
import { Button, Flex, Input } from "antd";
import PasswordLight from "../../../../../../assets/newDashboardIcons/change-password-light.svg";
import "./recoverWalletStep2.css";
import backend_API from "../../../../../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../../../../context/message";

const RecoverWalletStep2 = ({ onClose, password }) => {
  const backendAPI = new backend_API();
  const { t } = useTranslation();
  const { setErrorMessage, setInfoMessage, clearMessages } =
    useContext(MessageContext);
  const [seedPhrase, setSeedPhrase] = useState(Array(12).fill(""));

  const onChangeSeed = (e, index) => {
    let updatedSeed = [...seedPhrase];
    updatedSeed[index] = e.target.value;
    setSeedPhrase([...updatedSeed]);
  };

  const handleRecoverWallet = async () => {
    const res = await backendAPI.recoverWallet(seedPhrase?.join(" "), password);
    if (res) {
      setInfoMessage(t("security.items.recoverInfoMessage"));
      onClose();
    } else {
      setErrorMessage(t("security.items.recoverErrorMessage"));
    }
    clearMessages();
  };

  return (
    <>
      <Flex vertical gap={16} className="seed-modal-padding">
        <Flex
          gap={8}
          align="stretch"
          className="recover-wallet-step2-description"
        >
          <div className="recover-wallet-step2-list-icon">
            <img src={PasswordLight} alt="icon" />
          </div>
          <div className="default-text">
            To restore your wallet, enter your seed phrase.
          </div>
        </Flex>
        <Flex gap={8} wrap>
          {seedPhrase?.map((seed, index) => (
            <Flex
              gap={6}
              align="center"
              className="recover-wallet-step2-value-container"
              key={index}
            >
              <div>{index + 1}</div>
              <Input value={seed} onChange={(e) => onChangeSeed(e, index)} />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        className="recover-wallet-step2-footer"
      >
        <Button className="recover-wallet-step2-cancel" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="recover-wallet-step2-continue"
          onClick={handleRecoverWallet}
        >
          Continue
        </Button>
      </Flex>
    </>
  );
};

export default RecoverWalletStep2;
