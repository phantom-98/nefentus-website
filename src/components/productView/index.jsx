import Button from "../button/button";
import styles from "./productView.module.css";

const ProductView = ({ product }) => {
  console.log(product);

  return (
    <div className={styles.productWrapper}>
      <p>Steven Products/ Rolex Watch</p>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={product.s3Key}
            alt="Product Image"
          />
        </div>
        <div className={styles.infoWrapper}>
          <h1 className={styles.name}>{product.name}</h1>
          <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionHeaderWrapper}>
              <p className={styles.descriptionHeader}>Product Description</p>
            </div>
            <div className={styles.descriptionBodyWrapper}>
              {product.description &&
                product.description.split("\n").map((item) => {
                  return <p className={styles.descriptionBody}>{item}</p>;
                })}
              <p className={styles.descriptionBody}>Show less</p>
            </div>
          </div>
          {product.user && (
            <div className={styles.sellerWrapper}>
              <p>Seller: </p>
              <p>{product.user.firstName + " " + product.user.lastName}</p>
            </div>
          )}
          <div className={styles.actionWrapper}>
            <div className={styles.priceWrapper}>
              <p>Unit Price</p>
              <p>{product.price}</p>
            </div>
            <div className={styles.stockWrapper}>
              <p>Stock Quantity</p>
              <p>{product.stock}</p>
            </div>
            <Button style={{ width: "40%", height: "55px" }}>Buy</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
