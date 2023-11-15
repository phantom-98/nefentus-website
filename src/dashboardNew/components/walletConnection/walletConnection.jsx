const WalletConnection = ({ name, icon }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 20 }}>{name}</p>
      <img src={icon} style={{ height: 100 }} alt=" " />
    </div>
  );
};

export default WalletConnection;
