import React, { useContext, useEffect, useState } from "react";
import styles from "../../../dashboardNew/components/paymentForm/paymentForm.module.css";
import PersonLight from "../../../assets/icon/light/user-square.svg";
import PersonDark from "../../../assets/icon/dark/user-square.svg";
import BuildingDark from "../../../assets/icon/dark/building.svg";
import BuildingLight from "../../../assets/icon/light/building.svg";
import { useTranslation } from "react-i18next";
import TrashDark from "../../../assets/icon/dark/trash.svg";
import "./createInvoice.css";
import TrashLight from "../../../assets/icon/light/trash.svg";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { Button } from "antd";
import Input, {
  CombinedInput,
  CurrencySelectWithLabel,
  RadioOption,
  RadioSelect,
  Textarea,
} from "../../../components/input/input";
import { useTheme } from "../../../context/themeContext/themeContext";
import { getCurrencySymbol } from "../../../countries";
import { formatUSDBalance } from "../../../utils";
import { QRPopup } from "../../../dashboardNew/components/popup/popup";
import { MessageContext } from "../../../context/message";

const CreateInvoice = ({ invoice, setInvoice }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [showCreate, setShowCreate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { clearMessages, setErrorMessage, setInfoMessage } =
    useContext(MessageContext);

  const vendorAPI = new vendorDashboardApi();

  async function loadInvoiceNumber() {
    const no = await vendorAPI.getInvoiceNumber();
    no && setInvoice({ ...invoice, invoiceNo: no });
  }

  async function loadTaxInfo() {
    const info = await vendorAPI.getTaxInfo();
    if (info && info[0]) {
      setInvoice({ ...invoice, taxInfo: info[0] });
    }
  }

  async function createInvoice() {
    // Check data
    if (!invoice?.amount) {
      setErrorMessage(t("messages.error.amountValid"));
      return;
    }
    if (!invoice?.reverseCharge && !invoice?.taxPercent) {
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
      amount: parseFloat(invoice?.totalDue),
      email: invoice?.email,
      name: invoice?.name,
      company: invoice?.company,
      address: invoice?.address,
      taxNumber: invoice?.taxNumber,
      vatPercent: invoice?.taxPercent,
      items: invoice?.items.filter((item) => item.total !== 0),
      reverseCharge: invoice?.reverseCharge,
      currency: invoice?.currency,
      note: invoice?.note,
      country: invoice?.country,
      person: invoice?.isPerson,
    };

    // Create invoice
    const invoiceLinkPart = await vendorAPI.createInvoice(data);

    if (invoiceLinkPart) {
      const invoiceLink = window.location.origin + "/pay/" + invoiceLinkPart;
      setInvoice({ ...invoice, qrValue: invoiceLink });
      // setQRValue(invoiceLink);
      setShowPopup("qrcode");
    } else {
      setErrorMessage(t("messages.error.createInvoice"));
    }
  }

  useEffect(() => {
    if (invoice?.taxInfo && invoice?.country) {
      if (
        invoice?.taxInfo?.country !== invoice?.country &&
        !invoice?.isPerson
      ) {
        setInvoice({ ...invoice, reverseCharge: true, taxPercent: null });
      } else {
        setInvoice({ ...invoice, reverseCharge: false });
      }
    }
  }, [invoice?.country, invoice?.isPerson, invoice?.taxInfo]);

  useEffect(() => {
    loadInvoiceNumber();
    loadTaxInfo();
    return () => {
      setInvoice({ ...invoice, invoiceNo: "NEF1000" });
      // setInvoiceNo(1000);
    };
  }, []);

  useEffect(() => {
    const itemsAmount = invoice?.items.reduce((prev, current) => {
      return parseFloat(current.total) + parseFloat(prev);
    }, 0);
    setInvoice({
      ...invoice,
      amount: itemsAmount,
      swapCost: itemsAmount * 0.05,
      totalDue:
        (itemsAmount || 0) +
        (invoice?.transactionCost?.amount_dollar || 0) +
        (itemsAmount * 0.05 || 0),
    });
  }, [invoice?.items]);

  return (
    <div className="CreateInvoiceContainer">
      <div className={styles.row}>
        <p style={{ fontSize: "1.4rem", marginBottom: "0.1rem" }}>
          {t("invoice.title")}{" "}
          <span style={{ fontSize: "1.6rem" }}>#{invoice?.invoiceNo}</span>
        </p>
        <p style={{ fontSize: "1.2rem" }}>{t("payments.buyer.customer")}</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
          className="create-invoice-personal-detail"
        >
          <Input
            label={t("payments.buyer.fullName").concat("*")}
            placeholder={"John Doe"}
            value={invoice?.name}
            setState={(value) => setInvoice({ ...invoice, name: value })}
            dashboard
          />
          <Input
            label={t("payments.buyer.email").concat("*")}
            placeholder={"receiver@email.com"}
            value={invoice?.email}
            setState={(value) => setInvoice({ ...invoice, email: value })}
            dashboard
          />
        </div>
        <CombinedInput
          country={invoice?.country}
          setCountry={(value) => setInvoice({ ...invoice, country: value })}
          value={invoice?.address}
          setValue={(value) => setInvoice({ ...invoice, address: value })}
          // dashboard
          createInvoice
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
                value={invoice?.isPerson}
                onClick={() => {
                  setInvoice({ ...invoice, isPerson: true });
                }}
                horizon={true}
                style={{
                  width: "50%",
                }}
                createInvoice
              />
              <RadioOption
                icon={theme === "dark" ? BuildingDark : BuildingLight}
                content={t("payments.company")}
                value={!invoice?.isPerson}
                onClick={() => {
                  setInvoice({ ...invoice, isPerson: false });
                }}
                horizon={true}
                style={{
                  width: "50%",
                }}
                createInvoice
              />
            </div>
          </div>
          <CurrencySelectWithLabel
            label={t("products.createProductModal.currency").concat("*")}
            value={invoice?.currency}
            setValue={(value) => setInvoice({ ...invoice, currency: value })}
          />
        </div>
        {!invoice?.isPerson && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `1fr ${invoice?.isPerson ? "" : "1fr"}`,
              gap: "1rem",
            }}
            className="create-invoice-personal-detail"
          >
            <Input
              placeholder={t("payments.taxNumber")}
              label={t("payments.taxNumber")}
              value={invoice?.taxNumber}
              setState={(value) => setInvoice({ ...invoice, taxNumber: value })}
              dashboard
            />
            <Input
              placeholder={`e.g. Google`}
              label={t("payments.company")}
              value={invoice?.company}
              setState={(value) => setInvoice({ ...invoice, company: value })}
              dashboard
            />
          </div>
        )}
        {invoice?.reverseCharge ? (
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
          <>
            <div className="tax-value-section">
              <RadioSelect
                label={t("products.createProductModal.vat")}
                value={invoice?.taxPercent}
                setValue={(value) =>
                  setInvoice({ ...invoice, taxPercent: value })
                }
                options={
                  invoice?.taxInfo
                    ? JSON.parse(invoice?.taxInfo?.vatPercent).map(
                        (tax, index) => {
                          return {
                            value: tax,
                            label: tax + "%",
                            content:
                              index == 0
                                ? t("payments.tax.standard")
                                : t("payments.tax.reduced"),
                          };
                        },
                      )
                    : []
                }
                createInvoice={true}
              />
              <RadioSelect
                value={invoice.taxPercent}
                setValue={(value) =>
                  setInvoice({ ...invoice, taxPercent: value })
                }
                options={[
                  {
                    value: 0,
                    label: 0 + "%",
                    content: t("payments.tax.reduced"),
                  },
                ]}
                createInvoice={true}
              />
            </div>
          </>
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
              setInvoice({
                ...invoice,
                items: [
                  ...invoice?.items,
                  {
                    name: "",
                    price: 0,
                    quantity: 1,
                    total: 0,
                  },
                ],
              });
              // setItems((prev) => [
              //   ...prev,
              //   {
              //     name: "",
              //     price: 0,
              //     quantity: 1,
              //     total: 0,
              //   },
              // ]);
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
          <tbody className="invoice-items-table-input">
            {invoice?.items?.map((item, index) => {
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
                        setInvoice({
                          ...invoice,
                          items: invoice?.items?.map((t, i) => {
                            if (i === index)
                              return {
                                ...t,
                                name: e.target.value,
                              };
                            else return t;
                          }),
                        });
                      }}
                      style={{
                        textAlign: "left",
                        background: "var(--BG2, #171717)",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => {
                        setInvoice({
                          ...invoice,
                          items: invoice?.items?.map((t, i) => {
                            if (i === index)
                              return {
                                ...t,
                                price: e.target.value,
                                total: e.target.value * t.quantity,
                              };
                            else return t;
                          }),
                        });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        setInvoice({
                          ...invoice,
                          items: invoice?.items?.map((t, i) => {
                            if (i === index)
                              return {
                                ...t,
                                quantity: e.target.value,
                                total: e.target.value * t.price,
                              };
                            else return t;
                          }),
                        });
                      }}
                    />
                  </td>
                  <td>
                    <input readOnly value={item.total} />
                  </td>
                  <td>
                    <img
                      onClick={() => {
                        setInvoice({
                          ...invoice,
                          items: invoice?.items?.filter((t, i) => i !== index),
                        });
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
            {getCurrencySymbol()[invoice?.currency]}
            {formatUSDBalance(invoice?.amount)}
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
            {invoice?.reverseCharge ? (
              <span>RC</span>
            ) : (
              invoice?.taxPercent && <span>{invoice?.taxPercent}%</span>
            )}
            <span style={{ marginLeft: "3rem" }}>
              {getCurrencySymbol()[invoice?.currency]}
              {formatUSDBalance(
                (+invoice?.amount * +invoice?.taxPercent) / 100,
              )}
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
            {getCurrencySymbol()[invoice?.currency]}
            {formatUSDBalance(
              (invoice?.amount * ((+invoice?.taxPercent || 0) + 100)) / 100,
            )}
          </p>
        </div>
        <Textarea
          label={t("payments.note").concat(":")}
          placeholder={"receiver@mail.com"}
          value={invoice?.note}
          setState={(value) => setInvoice({ ...invoice, note: value })}
          dashboard
          createInvoice
        />
        <div className="invoice-btn-wrapper">
          <Button>Cancel</Button>
          <Button onClick={() => createInvoice()}>Create invoice</Button>
        </div>
      </div>
      {showPopup === "qrcode" && (
        <QRPopup
          show={showPopup}
          setShow={setShowPopup}
          price={invoice?.amount}
          currency={invoice?.currency}
          taxNumber={invoice?.taxNumber}
          name={invoice?.name}
          email={invoice?.email}
          company={invoice?.company}
          address={invoice?.address}
          link={invoice?.qrValue}
        />
      )}
    </div>
  );
};

export default CreateInvoice;
