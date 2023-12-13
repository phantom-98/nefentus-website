import { useState } from "react";
import QRCode from "react-qr-code";
import { QRPopup } from "../popup/popup";

const TableQR = ({ link, data }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => setShow(true)}
      >
        <QRCode value={link} size={20} />
      </div>
      <QRPopup
        show={show}
        setShow={setShow}
        address={data.address}
        company={data.company}
        email={data.email}
        link={link}
        name={data.name}
        price={data.price}
        taxNumber={data.taxNumber}
        onClick={() => {}}
      />
    </>
  );
};

export default TableQR;
