import { useState } from "react";
import { QRPopup } from "../popup/popup";

const TableQR = ({ link }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={() => setShow(true)}>
        <img src={link} style={{ height: "2rem", width: "auto" }} alt="" />
      </div>
      <QRPopup show={show} setShow={setShow} />
    </>
  );
};

export default TableQR;
