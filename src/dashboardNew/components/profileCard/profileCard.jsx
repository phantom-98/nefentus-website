import { useState, useEffect } from "react";
import Card from "../card/card";

import Clipboard from "../../../assets/icon/clipboard.svg";

import styles from "./profileCard.module.css";
import useInternalWallet from "../../../hooks/internalWallet";
import { useTranslation } from "react-i18next";
import { Options, OptionsWithImage } from "../../../components/input/input";
import ProfileImg from "../../../assets/icon/user.svg";
import {
  metamaskWallet,
  useAddress,
  useConnectionStatus,
  useWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import MetaMaskLogo from "../../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../../assets/logo/WalletConnect.svg";
import Ethereum from "../../../assets/icon/crypto/ethereum.svg";
import CoinbaseLogo from "../../../assets/logo/coinbase.svg";
import TrustLogo from "../../../assets/logo/trust.png";
import backendAPI from "../../../api/backendAPI";
import { useAuth } from "../../../context/auth/authContext";
import { getWalletIcon } from "../../../utils";

const ProfileCard = ({ type, setActiveWallet = (val) => {}, wallet = {} }) => {
  const { user, setUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [walletOptions, setWalletOptions] = useState([]);
  const backend_API = new backendAPI();

  const { internalWalletAddress, fetchInternalWalletAddress } =
    useInternalWallet();

  const { t } = useTranslation();

  const wallets = [
    {
      connect: walletConnect(),
      icon: WalletConnectLogo,
      name: "WalletConnect",
      address: useAddress(),
      status: useConnectionStatus(),
      walletDetail: useWallet(),
    },
    {
      connect: metamaskWallet(),
      icon: MetaMaskLogo,
      name: "MetaMask",
      address: useAddress(),
      status: useConnectionStatus(),
      walletDetail: useWallet(),
    },
  ];

  const { balances, fetchBalances } = useBalances(wallet);
  const { prices, fetchPrices } = usePrices(wallet);

  useEffect(() => {
    if (Object.keys(user)?.length) {
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setEmail(user?.email);
      setProfileImage(user?.profileImage);
    }
  }, [user]);

  useEffect(() => {
    fetchBalances();
    fetchPrices();
  }, [wallet]);

  useEffect(() => {
    if (!Object.keys(wallet).length && internalWalletAddress) {
      fetchWallets();
    }
  }, [wallets]);

  const fetchWallets = async () => {
    const list = await backend_API.getWalletAddresses();

    const internalWallet = {
      name: "Internal Wallet",
      address: internalWalletAddress,
      icon: Ethereum,
    };
    setWalletOptions(
      list.map((wallet) => ({
        ...wallet,
        name: wallet?.type,
        icon: getWalletIcon(wallet?.type),
      })),
    );
    const wallet = user?.Wallet || null;
    if (wallet) {
      if (
        JSON.parse(wallet).name != internalWallet.name ||
        (JSON.parse(wallet).name == internalWallet.name &&
          JSON.parse(wallet).address == internalWallet.address)
      ) {
        setActiveWallet(JSON.parse(wallet));
        return;
      }
    }
    setUser({ ...user, Wallet: JSON.stringify(internalWallet) });
    setActiveWallet(internalWallet);
    // }
  };

  const handleWallet = async (data) => {
    setUser({
      ...user,
      wallet: JSON.stringify(data, (key, value) => {
        if (key === "walletDetail") {
          return undefined; // Exclude 'walletDetail' property
        }
        return value;
      }),
    });
    setActiveWallet(data);
  };

  return (
    <Card className={styles.profileCard}>
      <div className={` ${styles.profileWrapper}`}>
        <div className={styles.profileImage}>
          <img
            src={profileImage !== "null" ? profileImage : ProfileImg}
            alt=""
          />
        </div>
        <div>
          <p className={styles.main}>{`${firstName} ${lastName}`}</p>
          <p className={styles.subtitle}>{email}</p>
        </div>
      </div>

      <>
        <div className={styles.wallet}>
          {/* <p className={styles.main}>{t("dashboard.wallet")}:</p>
          <p className={styles.subtitle}>{internalWalletAddress}</p> */}
          <OptionsWithImage
            label={t("dashboard.cryptoCard.sendModal.walletLabel")}
            dashboard
            wallet={wallet}
            options={walletOptions}
            setValue={(data) => {
              handleWallet(data);
            }}
          />
        </div>
        <div className={styles.plan}>
          <p className={styles.main}>{t("dashboard.plan")}:</p>
          <p className={styles.subtitle}>{t("dashboard.enterprise")}</p>
        </div>
      </>
    </Card>
  );
};

export default ProfileCard;
