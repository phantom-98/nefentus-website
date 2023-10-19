import styles from "./payBody.module.css";
import ReceivePayment from "../receivePayment";
import TopInfo from "../../dashboard/topInfo/topInfo";

const PayBody = ({ invoice }) => {
  console.log(invoice);
  return (
    <ReceivePayment
      priceUSD={invoice.price}
      userId={invoice.user ? invoice.user.id : null}
      transInfoArg={{ invoiceId: invoice.id }}
      info={
        <>
          <div className={`card ${styles.payInfo}`}>
            <div className={styles.body}>
              <TopInfo title={"Invoice"} description={"Pay an invoice"} />

              <div className={styles.columns}>
                <p className={styles.price}>
                  <span>Price:</span> <span>{invoice.price} USD</span>
                </p>
                <p className={styles.price}>
                  <span>Name:</span> <span>{invoice.name}</span>
                </p>
                <p className={styles.price}>
                  <span>Email:</span> <span>{invoice.email}</span>
                </p>
                <p className={styles.price}>
                  <span>Company:</span> <span>{invoice.company}</span>
                </p>
                <p className={styles.price}>
                  <span>Address:</span> <span>{invoice.address}</span>
                </p>
                <p className={styles.price}>
                  <span>Tax Number:</span> <span>{invoice.taxNumber}</span>
                </p>
              </div>
              <p className={styles.seller}>Seller:</p>
              <div className={styles.columns}>
                <p className={styles.price}>
                  <span>Price:</span>
                  <span>
                    {invoice.user?.firstName} {invoice.user?.lastName}
                  </span>
                </p>
                <p className={styles.price}>
                  <span>Name:</span> <span>{invoice.user?.email}</span>
                </p>
                <p className={styles.price}>
                  <span>Email:</span> <span>{invoice.user?.tel}</span>
                </p>
                <p className={styles.price}>
                  <span>Company:</span> <span>{invoice.user?.business}</span>
                </p>
                <p className={styles.price}>
                  <span>Address:</span> <span>{invoice.user?.country}</span>
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
