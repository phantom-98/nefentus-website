const TableQR = ({ link }) => {
  return (
    <div>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={link} style={{ height: "2rem", width: "auto" }} alt="" />
      </a>
    </div>
  );
};

export default TableQR;
