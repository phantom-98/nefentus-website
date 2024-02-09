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
import { getCurrentWallet, setCurrentWallet } from "../../../utils";
import backendAPI from "../../../api/backendAPI";

const ProfileCard = ({ type, setActiveWallet = (val) => {}, wallet = {} }) => {
  const [firstName] = useState(localStorage.getItem("firstName"));
  const [lastName] = useState(localStorage.getItem("lastName"));
  const [email] = useState(localStorage.getItem("email"));
  const [profileImage] = useState(localStorage.getItem("profile_pic"));
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
    fetchBalances();
    fetchPrices();
  }, [wallet]);

  useEffect(() => {
    if (!Object.keys(wallet).length && internalWalletAddress) {
      fetchWallets();
    }
  }, [wallets]);

  const fetchWallets = async () => {
    if (
      wallets.some(
        (wal) =>
          (wal.status == "connecting" || wal.status == "connected") &&
          wal.address === undefined,
      )
    ) {
      return;
    } else {
      let connectedWallets = [];
      wallets.map((wallet) => {
        if (
          wallet?.status === "connected" &&
          wallet?.address &&
          wallet?.walletDetail?.walletId === wallet?.name?.toLocaleLowerCase()
        ) {
          connectedWallets.push(wallet);
          registerWallet(wallet);
        }
      });

      const internalWallet = {
        name: "Internal Wallet",
        address: internalWalletAddress,
        icon: Ethereum,
      };
      connectedWallets.push(internalWallet);
      setWalletOptions(connectedWallets);
      const wallet = localStorage.getItem("Wallet") || null;
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
      localStorage.setItem("Wallet", JSON.stringify(internalWallet));
      setActiveWallet(internalWallet);
    }
  };

  const registerWallet = async (wallet) => {
    const result = await backend_API.registerWalletAddress(wallet);
  };

  const handleWallet = async (data) => {
    setCurrentWallet(data);
    setActiveWallet(data);
    const response = await backend_API.patchPreferredWallet({
      address: data?.address,
    });
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

      {type === "affiliate" ? (
        <>
          <div className={styles.wallet}>
            <p className={styles.main}>Affiliate link:</p>
            <div className={styles.link}>
              <img src={Clipboard} alt="" />
              <p className={styles.subtitle}>
                https://nefentus.com/affiliate=ccc738232
              </p>
            </div>
          </div>
        </>
      ) : (
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
      )}
    </Card>
  );
};

export default ProfileCard;
