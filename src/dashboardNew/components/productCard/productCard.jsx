import styles from "./productCard.module.css";

import Edit from "../../../assets/icon/edit.svg";
import Delete from "../../../assets/icon/delete.svg";
import Button from "../button/button";
import { useTranslation } from "react-i18next";

const ProductCard = ({
  onClickDelete = () => {},
  onClickEdit = () => {},
  product = {},
  update,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`card ${styles.card} ${styles.flex}`}>
        <div>
          <div className={styles.imageWrapper}>
            <div className={styles.icons}>
              <img src={Edit} alt="Edit product" onClick={onClickEdit} />
              <img src={Delete} alt="Delete product" onClick={onClickDelete} />
            </div>
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className={styles.image}
              />
            )}
            <div className={styles.overlay}></div>
          </div>
          <p className={styles.name}>{product.name}</p>
          <p className={`${styles.description} ${styles.less}`}>
            {product.description.substring(0, 180)}
          </p>
        </div>

        <div className={`${styles.body} ${styles.flex}`}>
          <div>
            <p className={styles.price}>${product.price}</p>
            <Button link={`${window.location.origin}/product/${product.link}`}>
              {t("general.openAction")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
