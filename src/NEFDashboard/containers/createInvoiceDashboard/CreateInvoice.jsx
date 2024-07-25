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
import { Button, Flex } from "antd";
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

  // const [showCreate, setShowCreate] = useState(false);
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
    if (!invoice?.reverseCharge && isNaN(invoice?.taxPercent)) {
      setErrorMessage(t("messages.error.taxPercentValid"));
      return;
    }
    // setShowCreate(false);
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
      amount: parseFloat(invoice?.amount),
      email: invoice?.email,
      name: invoice?.name,
      company: invoice?.company,
      address: invoice?.address,
      taxNumber: invoice?.isPerson ? "" : invoice?.taxNumber,
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
      // setShowPopup("qrcode");
      setInfoMessage(t("messages.success.createInvoice"));
      setInvoice({
        name: "",
        email: "",
        address: "",
        country: "",
        company: "",
        invoiceNo: "",
        taxNumber: "",
        taxPercent: "",
        currency: "USD",
        qrValue: "",
        reverseCharge: false,
        isPerson: true,
        amount: "",
        note: "",
        taxInfo: 0,
        items: [
          {
            name: "",
            price: 0,
            quantity: 1,
            total: 0,
          },
        ],
      });
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
    if (!invoice?.invoiceNo) {
      loadInvoiceNumber();
    }
    if (!invoice?.taxInfo) {
      loadTaxInfo();
    }
  }, [invoice]);

  useEffect(() => {
    const itemsAmount = invoice?.items.reduce((prev, current) => {
      return parseFloat(current.total) + parseFloat(prev);
    }, 0);
    setInvoice({
      ...invoice,
      amount: itemsAmount,
      // swapCost: itemsAmount * 0.05,
      // totalDue:
      // (itemsAmount || 0) +
      // (invoice?.transactionCost?.amount_dollar || 0) +
      // (itemsAmount * 0.05 || 0),
    });
  }, [invoice?.items]);

  return (
    <div className="CreateInvoiceContainer">
      <Flex vertical gap={8} className="CreateInvoiceContainer-header">
        <h3>Invoice details</h3>
        <p>
          {t("invoice.title")}{" "}
          <span style={{ fontSize: "1.6rem" }}>#{invoice?.invoiceNo}</span>
        </p>
      </Flex>
      <Flex vertical gap={32} className="CreateInvoiceContainer-body">
        <Flex vertical gap={16} className="customer-info">
          <p className="customer-info-heading">
            {t("payments.buyer.customer")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              color: "var(--Light-grey2)",
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
          <Flex
            gap={16}
            className="status-currency-container"
            justify="space-between"
          >
            <Flex vertical gap={6} className="legal-status-container">
              <p className="default-text-gray create-invoice-normal-font">
                {t("payments.legalStatus")}
              </p>
              <Flex gap={6}>
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
                    height: "40px",
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
                    height: "40px",
                  }}
                  createInvoice
                />
              </Flex>
            </Flex>
            <CurrencySelectWithLabel
              label={t("products.createProductModal.currency").concat("*")}
              value={invoice?.currency}
              setValue={(value) => setInvoice({ ...invoice, currency: value })}
            />
          </Flex>
          {!invoice?.isPerson && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `1fr ${invoice?.isPerson ? "" : "1fr"}`,
                gap: "16px",
              }}
              className="create-invoice-personal-detail"
            >
              <Input
                placeholder={t("payments.taxNumber")}
                label={t("payments.taxNumber")}
                value={invoice?.taxNumber}
                setState={(value) =>
                  setInvoice({ ...invoice, taxNumber: value })
                }
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
                      ? [...JSON.parse(invoice?.taxInfo?.vatPercent), 0].map(
                          (tax, index) => {
                            return {
                              value: tax,
                              label: tax + "%",
                              content:
                                tax == 0
                                  ? t("payments.tax.zero")
                                  : index == 0
                                  ? t("payments.tax.standard")
                                  : t("payments.tax.reduced"),
                            };
                          },
                        )
                      : []
                  }
                  createInvoice={true}
                />
              </div>
            </>
          )}
        </Flex>
        <Flex vertical gap={16} className="invoice-item-wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "140%",
                color: "var(--White, #FAFAFA)",
              }}
            >
              {t("payments.items.title")}
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: " var(--light-grey, #E9E9E9)",
                padding: "6px 24px 6px 12px",
                border: "1px solid var(--Dark)",
                borderRadius: "6px",
                cursor: "pointer",
                background: "var(--BG2, #171717)",
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
            <thead className="item-table-head">
              <th>{t("payments.items.name")}</th>
              <th style={{ width: "10rem" }}>{t("payments.items.price")}</th>
              <th style={{ width: "8rem" }}>{t("payments.items.quantity")}</th>
              <th style={{ width: "12rem" }}>{t("payments.items.total")}</th>
              <th style={{ width: "2rem" }}></th>
            </thead>
            <tbody className=" ">
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
                        className="item-name-text item-name-field"
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
                        className="item-name-text item-sub-detail"
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
                        className="item-name-text item-sub-detail"
                      />
                    </td>
                    <td>
                      <input
                        readOnly
                        value={item.total}
                        className="item-name-text item-sub-detail"
                      />
                    </td>
                    <td>
                      <img
                        onClick={() => {
                          setInvoice({
                            ...invoice,
                            items: invoice?.items?.filter(
                              (t, i) => i !== index,
                            ),
                          });
                        }}
                        src={theme === "dark" ? TrashDark : TrashLight}
                        className="cursor-pointer"
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
            }}
          >
            <p
              className="default-text-gray"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
              {t("payments.subtotal")}
            </p>
            <p
              className="default-text"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
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
            <p
              className="default-text-gray"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
              {t("payments.vatValue")}
            </p>
            <p
              className="default-text"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
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
              borderTop: "1px solid var(--Dark)",
              color: "var(--White, #FAFAFA)",
            }}
          >
            <p
              style={{
                color: "var(--White, #FAFAFA)",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "140%",
              }}
            >
              {t("payments.totalDue")}
            </p>
            <p
              style={{
                color: "var(--White, #FAFAFA)",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "140%",
              }}
            >
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
        </Flex>
        <div className="invoice-btn-wrapper">
          <Button>{t("general.cancel")}</Button>
          <Button onClick={() => createInvoice()}>
            {t("payments.createInvoice")}
          </Button>
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
      </Flex>
    </div>
  );
};

export default CreateInvoice;
