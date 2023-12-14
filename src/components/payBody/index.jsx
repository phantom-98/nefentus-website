import styles from "./payBody.module.css";
import ReceivePayment from "../receivePayment";
import TopInfo from "../../dashboard/topInfo/topInfo";
import { useTranslation } from "react-i18next";

const PayBody = ({ invoice }) => {
  console.log(invoice);
  const { t } = useTranslation();
  return (
    <ReceivePayment
      priceUSD={invoice.price}
      userId={invoice.user ? invoice.user.id : null}
      transInfoArg={{ invoiceId: invoice.id }}
      info={
        <>
          <div className={`card ${styles.payInfo}`}>
            <div className={styles.body}>
              <TopInfo
                title={t("payments.pay.title")}
                description={t("payments.pay.description")}
              />

              <p className={styles.seller}>{t("payments.buyer")}</p>
              <div className={styles.columns}>
                <p className={styles.price}>
                  <span>{t("payments.price")}:</span>{" "}
                  <span>{invoice.price} USD</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.name")}:</span> <span>{invoice.name}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.email")}:</span>{" "}
                  <span>{invoice.email}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.company")}:</span>{" "}
                  <span>{invoice.company}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.address")}:</span>{" "}
                  <span>{invoice.address}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.taxNumber")}:</span>{" "}
                  <span>{invoice.taxNumber}</span>
                </p>
              </div>
              <p className={styles.seller}>{t("payments.seller")}</p>
              <div className={styles.columns}>
                <p className={styles.price}>
                  <span>{t("payments.price")}:</span>
                  <span>
                    {invoice.user?.firstName} {invoice.user?.lastName}
                  </span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.name")}:</span>{" "}
                  <span>{invoice.user?.email}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.email")}:</span>{" "}
                  <span>{invoice.user?.tel}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.company")}:</span>{" "}
                  <span>{invoice.user?.business}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.address")}:</span>{" "}
                  <span>{invoice.user?.country}</span>
                </p>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default PayBody;
