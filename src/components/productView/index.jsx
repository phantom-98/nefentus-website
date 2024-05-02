import { useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./productView.module.css";
import backendAPI from "../../api/backendAPI";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/auth/authContext";
import { formatUSDBalance } from "../../utils";
import { getCurrencySymbol } from "../../countries";

const length = 400;

const ProductView = ({ product }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currencyRate } = useAuth();
  const [pic, setPic] = useState();
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const getProductImage = async () => {
    const res = await new backendAPI().getProductImage(product.link);
    if (res) {
      setPic(res);
    }
  };
  useEffect(() => {
    if (product) {
      getProductImage();
      product.description && setShow(product.description.length > length);
    }
  }, [product]);

  useEffect(() => {
    if (product.stock != -1 && quantity > product.stock) {
      setQuantity(product.stock);
    }
    if (quantity <= 0) {
      setQuantity(1);
    }
  }, [quantity]);

  return (
    <div className={styles.productWrapper}>
      <div className={styles.wrapper}>
        {pic && pic.toLowerCase() != "null" && (
          <div className={styles.imageWrapper}>
            <img src={pic} />
          </div>
        )}
        <div className={styles.infoWrapper}>
          <h1>{product.name}</h1>
          <div className={styles.actionWrapper}>
            <div className={styles.valueWrapper}>
              <p>{t("products.view.price")}</p>
              <p>
                {getCurrencySymbol()[product.currency]}
                {formatUSDBalance(product.price)}
              </p>
              <div className={styles.stockWrapper}>
                <p>{t("products.view.stock").concat(`:`)}&nbsp;</p>
                <p>
                  {product.stock == -1
                    ? t("products.unlimited")
                    : product.stock}
                </p>
              </div>
            </div>
            <div className={styles.buyWrapper}>
              <div className={styles.quantityWrapper}>
                <p>{t("products.view.quantity")}</p>
                <div>
                  <div onClick={() => setQuantity((prev) => prev - 1)}>-</div>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <div onClick={() => setQuantity((prev) => prev + 1)}>+</div>
                </div>
              </div>
              <Button
                style={{ height: "55px" }}
                onClick={() => {
                  navigate(`/product/${product.link}/pay`, {
                    state: { defaultQuantity: quantity },
                  });
                }}
              >
                {t("products.view.buy")}
              </Button>
              <div className={styles.total}>
                <p>{t("products.view.total")}</p>
                <p>
                  {getCurrencySymbol()[product.currency]}
                  {formatUSDBalance(
                    product.price * quantity, // * currencyRate.rate,
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionHeader}>
              <p>{t("products.view.description")}</p>
            </div>
            <div className={styles.descriptionBody}>
              <div className={more ? "" : styles.less}>
                {product.description &&
                  (more
                    ? product.description
                    : product.description.substring(0, length)
                  )
                    .split("\n")
                    .map((item) => {
                      return <p>{item}</p>;
                    })}
              </div>
              {show && (
                <p onClick={() => setMore((prev) => !prev)}>
                  {more
                    ? t("products.view.showLess")
                    : t("products.view.showMore")}
                </p>
              )}
            </div>
          </div>
          {product.user && (
            <div className={styles.seller}>
              <p>{t("products.view.seller")}: </p>
              <p>{product.user.firstName + " " + product.user.lastName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
