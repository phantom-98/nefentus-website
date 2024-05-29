import React, { useState } from "react";
import { Button, Flex, Switch } from "antd";
import "./securitySection.css";
import PasswordModal from "./passwordModal";
import SeedPhraseModal from "./seedPhraseModal";
import AuthenticatorModal from "./AuthenticatorModal";
import AntiPhishingModal from "./AntiPhishingModal";
import RecoverWalletModal from "./RecoverWalletModal";

const SecuritySection = () => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [seedModal, setSeedModal] = useState(false);
  const [authenticatorModal, setAuthenticatorModal] = useState(false);
  const [antiPhishingModal, setAntiPhishingModal] = useState(false);
  const [recoverWalletModal, setRecoverWalletModal] = useState(false);
  const list = [
    {
      title: "Password",
      subTitle: "Permanent password to login to your account.",
      actionItem: (
        <Button onClick={() => setPasswordModal(true)}>Change Password</Button>
      ),
    },
    {
      title: "Authenticator App",
      subTitle:
        "Setup Multi-Factor-Authentication using Google Authenticator, Authy, Lastpass or similar.",
      actionItem: (
        <Switch
          className="security-switch"
          onChange={(e) => setAuthenticatorModal(e)}
        />
      ),
    },
    {
      title: "One-time passwords via email",
      subTitle:
        "Setup Multi-Factor-Authentication based on one-time password sent via email.",
      actionItem: <Switch className="security-switch" />,
    },
    {
      title: "Anti-Phishing Code",
      subTitle:
        "Protect your account from phishing attempts. The anti-phishing code is added to every email received from Nefentus. If you see this code, the email is from Nefentus.",
      actionItem: (
        <Switch
          className="security-switch"
          onChange={(e) => setAntiPhishingModal(e)}
        />
      ),
    },
    {
      title: "Seed Phrase",
      subTitle:
        "A sequence of words that allows you to regain access to your crypto funds if you ever lose your crypto wallet.",
      actionItem: <Button onClick={() => setSeedModal(true)}>Change</Button>,
    },
    {
      title: "Recover Wallet",
      subTitle: "Recover your wallet using seed phrase.",
      actionItem: (
        <Button onClick={() => setRecoverWalletModal(true)}>
          Recover Wallet
        </Button>
      ),
    },
  ];
  return (
    <>
      {passwordModal && (
        <PasswordModal
          open={passwordModal}
          onClose={() => setPasswordModal(false)}
        />
      )}
      {seedModal && (
        <SeedPhraseModal open={seedModal} onClose={() => setSeedModal(false)} />
      )}
      {authenticatorModal && (
        <AuthenticatorModal
          open={authenticatorModal}
          onClose={() => setAuthenticatorModal(false)}
        />
      )}
      {antiPhishingModal && (
        <AntiPhishingModal
          open={antiPhishingModal}
          onClose={() => setAntiPhishingModal(false)}
        />
      )}
      {recoverWalletModal && (
        <RecoverWalletModal
          open={recoverWalletModal}
          onClose={() => setRecoverWalletModal(false)}
        />
      )}
      <Flex vertical gap={24}>
        {list?.map((option, index) => (
          <Flex
            justify="space-between"
            className="option-container"
            key={index}
          >
            <div>
              <div className="default-text option-title">{option?.title}</div>
              <div className="default-text-gray option-subtitle">
                {option?.subTitle}
              </div>
            </div>
            {option?.actionItem}
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default SecuritySection;
