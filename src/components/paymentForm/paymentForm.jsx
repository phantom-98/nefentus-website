import styles from "./paymentForm.module.css";
import Button from "../button/button";
import Popup, { QRPopup } from "../../dashboardNew/components/popup/popup";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../context/message";
import vendorDashboardApi from "../../api/vendorDashboardApi";
import { useTranslation } from "react-i18next";
// import { useAuth } from "../../../context/auth/authContext";
import Input, {
  CombinedInput,
  CurrencySelectWithLabel,
  Options,
  RadioOption,
  RadioSelect,
  Textarea,
} from "../input/input";
import PersonDark from "../../../assets/icon/dark/user-square.svg";
import PersonLight from "../../../assets/icon/light/user-square.svg";
import BuildingDark from "../../../assets/icon/dark/building.svg";
import BuildingLight from "../../../assets/icon/light/building.svg";
import TrashDark from "../../../assets/icon/dark/trash.svg";
import TrashLight from "../../../assets/icon/light/trash.svg";
import { useTheme } from "../../context/themeContext/themeContext";
import { formatUSDBalance } from "../../utils";
import { getCurrencySymbol } from "../../countries";

const PaymentForm = ({ setLoadingData }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  // const { currencyRate } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState(1000);
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isPerson, setPerson] = useState(true);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxNumber, setTaxNumber] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [note, setNote] = useState("");
  const [taxInfo, setTaxInfo] = useState();
  const [items, setItems] = useState([
    {
      name: "",
      price: 0,
      quantity: 1,
      total: 0,
    },
  ]);
  const [reverseCharge, setReverseCharge] = useState(false);
  const { clearMessages, setErrorMessage, setInfoMessage } =
    useContext(MessageContext);
  const [qrValue, setQRValue] = useState("");

  const vendorAPI = new vendorDashboardApi();

  async function createInvoice() {
    // Check data
    if (!amount) {
      setErrorMessage(t("messages.error.amountValid"));
      return;
    }
    if (!reverseCharge && !taxPercent) {
      setErrorMessage(t("messages.error.taxPercentValid"));
      return;
    }
    setShowCreate(false);
    // if (!email) {
    //   setErrorMessage(t("messages.validation.validEmail"));
    //   return;
    // }
    // if (!name) {
    //   setErrorMessage(t("messages.validation.nameValid"));
    //   return;
    // }
    // if (!company) {
    //   setErrorMessage(t("messages.validation.companyValid"));
    //   return;
    // }
    // if (!address) {
    //   setErrorMessage(t("messages.validation.addressValid"));
    //   return;
    // }
    // if (!taxNumber) {
    //   setErrorMessage(t("messages.validation.taxNumberValid"));
    //   return;
    // }

    const data = {
      amount: parseFloat(amount),
      email,
      name,
      company,
      address,
      taxNumber,
      vatPercent: taxPercent,
      items: items.filter((item) => item.total !== 0),
      reverseCharge,
      currency,
      note,
      country,
      person: isPerson,
    };

    // Create invoice
    const invoiceLinkPart = await vendorAPI.createInvoice(data);

    if (invoiceLinkPart) {
      const invoiceLink = window.location.origin + "/pay/" + invoiceLinkPart;
      setQRValue(invoiceLink);
      setShowPopup("qrcode");
      setLoadingData((prev) => !prev);
    } else {
      setErrorMessage(t("messages.error.createInvoice"));
    }
  }
  async function loadTaxInfo() {
    const info = await vendorAPI.getTaxInfo();
    if (info && info[0]) {
      setTaxInfo(info[0]);
    }
  }
  async function loadInvoiceNumber() {
    const no = await vendorAPI.getInvoiceNumber();
    no && setInvoiceNo(no);
  }

  useEffect(() => {
    loadTaxInfo();
  }, []);

  useEffect(() => {
    setAmount(
      items.reduce((prev, current) => {
        return parseFloat(current.total) + parseFloat(prev);
      }, 0),
    );
  }, [items]);

  useEffect(() => {
    if (taxInfo && country) {
      if (taxInfo.country !== country && !isPerson) {
        setReverseCharge(true);
        setTaxPercent(null);
      } else {
        setReverseCharge(false);
      }
    }
  }, [country, isPerson, taxInfo]);

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
          }}
        >
          {t("payments.table.title")}
        </p>
        <Button
          onClick={() => {
            loadInvoiceNumber();
            setName("");
            setEmail("");
            setCompany("");
            setCountry("");
            setAddress("");
            setPerson(true);
            setCurrency("USD");
            setTaxNumber("");
            setTaxPercent();
            setItems([{ name: "", price: 0, quantity: 1, total: 0 }]);
            setAmount("");
            setReverseCharge(false);
            setNote("");
            setShowCreate(true);
          }}
          width="16rem"
        >
          {t("payments.createInvoice")}
        </Button>
      </div>
      <Popup
        show={showCreate}
        setShow={setShowCreate}
        title={t("payments.title")}
        confirmTitle={t("general.confirm")}
        cancelTitle={t("general.cancel")}
        onClose={() => setShowCreate(false)}
        onConfirm={() => {
          createInvoice();
        }}
      >
        <div className={styles.row}>
          <p style={{ fontSize: "1.4rem", marginBottom: "0.1rem" }}>
            {t("invoice.title")}{" "}
            <span style={{ fontSize: "1.6rem" }}>#{invoiceNo}</span>
          </p>
          <p style={{ fontSize: "1.2rem" }}>{t("payments.buyer.customer")}</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <Input
              label={t("payments.buyer.fullName").concat("*")}
              placeholder={"John Doe"}
              value={name}
              setState={setName}
              dashboard
            />
            <Input
              label={t("payments.buyer.email").concat("*")}
              placeholder={"receiver@email.com"}
              value={email}
              setState={setEmail}
              dashboard
            />
          </div>
          <CombinedInput
            country={country}
            setCountry={setCountry}
            value={address}
            setValue={setAddress}
            dashboard
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                {t("payments.legalStatus")}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <RadioOption
                  icon={theme === "dark" ? PersonDark : PersonLight}
                  content={t("payments.person")}
                  value={isPerson}
                  onClick={() => {
                    setPerson(true);
                  }}
                  horizon={true}
                  style={{
                    width: "50%",
                  }}
                />
                <RadioOption
                  icon={theme === "dark" ? BuildingDark : BuildingLight}
                  content={t("payments.company")}
                  value={!isPerson}
                  onClick={() => {
                    setPerson(false);
                  }}
                  horizon={true}
                  style={{
                    width: "50%",
                  }}
                />
              </div>
            </div>
            <CurrencySelectWithLabel
              label={t("products.createProductModal.currency").concat("*")}
              value={currency}
              setValue={setCurrency}
            />
          </div>
          {!isPerson && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `1fr ${isPerson ? "" : "1fr"}`,
                gap: "1rem",
              }}
            >
              <Input
                placeholder={t("payments.taxNumber")}
                label={t("payments.taxNumber")}
                value={taxNumber}
                setState={setTaxNumber}
                dashboard
              />
              <Input
                placeholder={`e.g. Google`}
                label={t("payments.company")}
                value={company}
                setState={setCompany}
                dashboard
              />
            </div>
          )}
          {reverseCharge ? (
            <>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "var(--text2-color)",
                  width: "48rem",
                }}
              >
                {t("payments.tax.reverseCharge")}
              </p>
            </>
          ) : (
            <RadioSelect
              label={t("products.createProductModal.vat")}
              value={taxPercent}
              setValue={setTaxPercent}
              options={
                taxInfo
                  ? JSON.parse(taxInfo.vatPercent).map((tax, index) => {
                      return {
                        value: tax,
                        label: tax + "%",
                        content:
                          index == 0
                            ? t("payments.tax.standard")
                            : t("payments.tax.reduced"),
                      };
                    })
                  : []
              }
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1.2rem" }}>{t("payments.items.title")}</p>
            <p
              style={{
                fontSize: "1.2rem",
                padding: "0.4rem 2rem 0.2rem",
                border: "1px solid var(--border-color)",
                borderRadius: "0.6rem",
                cursor: "pointer",
              }}
              onClick={() => {
                setItems((prev) => [
                  ...prev,
                  {
                    name: "",
                    price: 0,
                    quantity: 1,
                    total: 0,
                  },
                ]);
              }}
            >
              + {t("payments.items.add")}
            </p>
          </div>
          <table
            style={{
              borderSpacing: "1rem",
              margin: "-1rem",
            }}
          >
            <thead
              style={{
                fontSize: "1.2rem",
                textAlign: "left",
                overflowWrap: "nowrap",
              }}
            >
              <th>{t("payments.items.name")}</th>
              <th style={{ width: "10rem" }}>{t("payments.items.price")}</th>
              <th style={{ width: "8rem" }}>{t("payments.items.quantity")}</th>
              <th style={{ width: "12rem" }}>{t("payments.items.total")}</th>
              <th style={{ width: "2rem" }}></th>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr
                    style={{
                      fontSize: "1.2rem",
                    }}
                    className={styles.items}
                  >
                    <td>
                      <input
                        value={item.name}
                        onChange={(e) => {
                          setItems((prev) =>
                            prev.map((t, i) => {
                              if (i === index)
                                return {
                                  ...t,
                                  name: e.target.value,
                                };
                              else return t;
                            }),
                          );
                        }}
                        style={{ textAlign: "left" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          setItems((prev) =>
                            prev.map((t, i) => {
                              if (i === index)
                                return {
                                  ...t,
                                  price: parseFloat(e.target.value),
                                  total:
                                    parseFloat(e.target.value) * t.quantity,
                                };
                              else return t;
                            }),
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          setItems((prev) =>
                            prev.map((t, i) => {
                              if (i === index)
                                return {
                                  ...t,
                                  quantity: parseFloat(e.target.value),
                                  total: parseFloat(e.target.value) * t.price,
                                };
                              else return t;
                            }),
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input readOnly value={item.total} />
                    </td>
                    <td>
                      <img
                        onClick={() => {
                          setItems((prev) =>
                            prev.filter((t, i) => i !== index),
                          );
                        }}
                        src={theme === "dark" ? TrashDark : TrashLight}
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "3rem",
              fontSize: "1.2rem",
            }}
          >
            <p>{t("payments.subtotal")}</p>
            <p>
              {getCurrencySymbol()[currency]}
              {formatUSDBalance(amount)}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "3rem",
              fontSize: "1.2rem",
            }}
          >
            <p>{t("payments.vatValue")}</p>
            <p>
              {reverseCharge ? (
                <span>RC</span>
              ) : (
                taxPercent && <span>{taxPercent}%</span>
              )}
              <span style={{ marginLeft: "3rem" }}>
                {getCurrencySymbol()[currency]}
                {formatUSDBalance((amount * taxPercent) / 100)}
              </span>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "3rem",
              paddingTop: "2rem",
              fontSize: "1.2rem",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <p>{t("payments.totalDue")}</p>
            <p>
              {getCurrencySymbol()[currency]}
              {formatUSDBalance((amount * ((taxPercent ?? 0) + 100)) / 100)}
            </p>
          </div>
          <Textarea
            label={t("payments.note").concat(":")}
            placeholder={"receiver@mail.com"}
            value={note}
            setState={setNote}
            dashboard
          />
        </div>
      </Popup>

      {showPopup === "qrcode" && (
        <QRPopup
          show={showPopup}
          setShow={setShowPopup}
          price={amount}
          currency={currency}
          taxNumber={taxNumber}
          name={name}
          email={email}
          company={company}
          address={address}
          link={qrValue}
        />
      )}
    </div>
  );
};

export default PaymentForm;
