import { useState } from "react";
import QRCode from "react-qr-code";
import { QRPopup } from "../popup/popup";
import vendorDashboardApi from "../../../api/vendorDashboardApi";

const TableQR = ({ link, data }) => {
  const [show, setShow] = useState(false);

  const requestDownload = async () => {
    const res = await new vendorDashboardApi().downloadInvoice(data.link);

    if (res) {
      const element = document.createElement("a");
      const invoice = new Blob([res.split("$$RGBSPLIT$$")[0]], {
        type: "text/html",
      });
      element.href = URL.createObjectURL(invoice);
      element.download = "invoice.html";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      const receipt = new Blob([res.split("$$RGBSPLIT$$")[1]], {
        type: "text/html",
      });
      element.href = URL.createObjectURL(receipt);
      element.download = "receipt.html";
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
        onDownload={data.paidAt ? () => requestDownload() : null}
      />
    </>
  );
};

export default TableQR;
