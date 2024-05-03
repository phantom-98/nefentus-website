import { useState } from "react";
import QRCode from "react-qr-code";
import { QRPopup } from "../popup/popup";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { useAuth } from "../../../context/auth/authContext";

const TableQR = ({ link, data }) => {
  const { currencyRate } = useAuth();
  const [show, setShow] = useState(false);

  const requestDownload = async (invoice) => {
    const res = await new vendorDashboardApi().downloadInvoice(
      invoice,
      data.link,
    );

    if (res) {
      const element = document.createElement("a");
      if (!res) return;
      element.href = URL.createObjectURL(res);
      element.download = invoice + ".pdf";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

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
        price={(data.price * currencyRate.rate).toFixed(2)}
        taxNumber={data.taxNumber}
        onInvoice={data.email ? () => requestDownload("Invoice") : null}
        onReceipt={
          data.email && data.paidAt ? () => requestDownload("Receipt") : null
        }
      />
    </>
  );
};

export default TableQR;
