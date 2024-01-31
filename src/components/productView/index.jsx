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
    console.log(product, "product");
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
              <p>${product.price}</p>
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
                  console.log("quantity", quantity);
                  navigate(`/product/${product.link}/pay`, {
                    state: { defaultQuantity: quantity },
                  });
                }}
              >
                {t("products.view.buy")}
                <svg
                  height="1.6rem"
                  width="1.6rem"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 44.16 44.16"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      d="M44.16,6.6H11.592L10.66,1.179H2.408C1.076,1.179,0,2.257,0,3.588v2.408h6.602l4.248,24.709
                      c0.094,0.544,0.617,0.985,1.17,0.985h28.527c1.332,0,2.41-1.077,2.41-2.411v-2.406H15.078l-0.587-3.414h22.042
                      c2.66,0,5.172-2.128,5.611-4.75L44.16,6.6z"
                    />
                    <circle cx="19.47" cy="38.817" r="4.165" />
                    <path
                      d="M29.762,38.816c0,2.299,1.863,4.164,4.162,4.164c2.301,0,4.168-1.865,4.168-4.164
                      c0-2.299-1.867-4.166-4.168-4.166C31.625,34.65,29.762,36.518,29.762,38.816z"
                    />
                  </g>
                </svg>
              </Button>
              <div className={styles.total}>
                <p>{t("products.view.total")}</p>
                <p>${product.price * quantity}</p>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ProductView;
