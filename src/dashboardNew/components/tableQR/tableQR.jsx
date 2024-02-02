import { useState } from "react";
import QRCode from "react-qr-code";
import { QRPopup } from "../popup/popup";
import vendorDashboardApi from "../../../api/vendorDashboardApi";

const TableQR = ({ link, data }) => {
  const [show, setShow] = useState(false);

  const requestDownload = async (invoice) => {
    const res = await new vendorDashboardApi().downloadInvoice(data.link);

    if (res) {
      const element = document.createElement("a");
      if (!res[invoice]) return;

      const html = new Blob([res[invoice]], {
        type: "text/html",
      });
      element.href = URL.createObjectURL(html);
      element.download = invoice + ".html";
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
        price={data.price}
        taxNumber={data.taxNumber}
        onInvoice={data.email ? () => requestDownload("invoice") : null}
        onReceipt={
          data.email && data.paidAt ? () => requestDownload("receipt") : null
        }
      />
    </>
  );
};

export default TableQR;
