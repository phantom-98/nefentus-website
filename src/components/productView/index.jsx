import { useEffect, useRef, useState } from "react";
import Button from "../button/button";
import styles from "./productView.module.css";
import backendAPI from "../../api/backendAPI";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductView = ({ product }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    getProductImage();
  }, [product]);

  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      const current = divRef.current;
      setShow(current.scrollHeight > 250);
    }
  }, [divRef.current]);

  useEffect(() => {
    if (product.stock != -1 && quantity > product.stock) {
      setQuantity(product.stock);
    }
  }, [quantity]);

  return (
    <div className={styles.productWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>{pic && <img src={pic} />}</div>
        <div className={styles.infoWrapper}>
          <h1>{product.name}</h1>
          <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionHeader}>
              <p>{t("products.view.description")}</p>
            </div>
            <div className={styles.descriptionBody}>
              <div className={more ? "" : styles.less} ref={divRef}>
                {product.description &&
                  product.description.split("\n").map((item) => {
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
          <div className={styles.actionWrapper}>
            <div style={{ display: "flex" }}>
              <div className={styles.priceWrapper}>
                <p>{t("products.view.price")}</p>
                <p>${product.price}</p>
              </div>
              <div className={styles.stockWrapper}>
                <p>{t("products.view.stock")}</p>
                <p>
                  {product.stock == -1
                    ? t("products.unlimited")
                    : product.stock}
                </p>
              </div>
              <div className={styles.quantityWrapper}>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <Button
              style={{ width: "30%", height: "55px" }}
              onClick={() => {
                console.log("quantity", quantity);
                navigate(`/product/${product.link}/pay`, {
                  state: { defaultQuantity: quantity },
                });
              }}
            >
              {t("products.view.buy")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
