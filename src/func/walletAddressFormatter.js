const WalletAddressFormatter = (walletAddress) => {
  return walletAddress?.length
    ? `${walletAddress.slice(0, 6)}....${walletAddress.slice(-4)}`
    : "";
};

export default WalletAddressFormatter;
