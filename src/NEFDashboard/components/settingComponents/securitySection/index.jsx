import React, { useContext, useEffect, useState } from "react";
import { Button, Flex, Switch } from "antd";
import "./securitySection.css";
import PasswordModal from "./passwordModal";
import SeedPhraseModal from "./seedPhraseModal";
import AuthenticatorModal from "./AuthenticatorModal";
import AntiPhishingModal from "./AntiPhishingModal";
import RecoverWalletModal from "./RecoverWalletModal";
import backend_API from "../../../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../../context/message";
import { useAuth } from "../../../../context/auth/authContext";

const SecuritySection = ({ recommendRecover }) => {
  const backendAPI = new backend_API();
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const { setInfoMessage } = useContext(MessageContext);
  const [passwordModal, setPasswordModal] = useState(false);
  const [seedModal, setSeedModal] = useState(false);
  const [authenticatorModal, setAuthenticatorModal] = useState(false);
  const [antiPhishingModal, setAntiPhishingModal] = useState(false);
  const [recoverWalletModal, setRecoverWalletModal] = useState(
    recommendRecover || false,
  );
  const [status, setStatus] = useState(false);
  const [secretToken, setSecretToken] = useState("");

  useEffect(() => {
    if (Object.keys(user)?.length > 0) {
      setStatus(user?.hasTotp);
    }
  }, [user]);

  const handleOtp = async (status) => {
    const response = await backendAPI.setupOtp({ active: status });
    if (response.status === 200) {
      setUser({ ...user, hasOtp: status });
      setInfoMessage(t("messages.success.updateSettings"));
    }
  };

  const disableTotp = async () => {
    const response = await backendAPI.setupTotp({
      active: false,
    });
    if (response?.ok) {
      setStatus(false);
      setInfoMessage(t("messages.success.updateSettings"));
    }
  };

  const handleTotpSecretKey = async () => {
    backendAPI.getTotpToken().then(async (token) => {
      setSecretToken(token);
      setAuthenticatorModal(true);
    });
  };

  const handleTotpVerify = async (token) => {
    const response = await backendAPI.verifyTotpToken(
      user?.email,
      token,
      false,
      () => {},
    );
    if (response?.status === 200) {
      const response2 = await backendAPI.setupTotp({
        active: true,
      });

      if (response2 == null) {
      } else {
        setStatus(true);
        setInfoMessage(t("security.scanModal.verifyCode"));
        setAuthenticatorModal(false);
        setSecretToken("");
      }
    }
    if (response.status === 400) {
      setReset(true);
      setTimeout(() => {
        setReset(false);
      });
    }
  };

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
          checked={authenticatorModal || status}
          onChange={(e) => {
            if (e) {
              handleTotpSecretKey();
            } else {
              disableTotp();
              setAuthenticatorModal(e);
            }

            console.log(e);
          }}
        />
      ),
    },
    {
      title: "One-time passwords via email",
      subTitle:
        "Setup Multi-Factor-Authentication based on one-time password sent via email.",
      actionItem: (
        <Switch
          className="security-switch"
          checked={user?.hasOtp}
          onChange={(value) => handleOtp(value)}
        />
      ),
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
      {authenticatorModal && secretToken?.length > 0 && (
        <AuthenticatorModal
          open={authenticatorModal}
          onClose={() => {
            setAuthenticatorModal(false);
            setStatus(user?.hasTotp);
            setSecretToken("");
          }}
          onSuccess={(value) => {
            handleTotpVerify(value);
          }}
          secretToken={secretToken}
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
          recommendRecover={recommendRecover}
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
