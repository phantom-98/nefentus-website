import styles from "./productCard.module.css";

import Edit from "../../../assets/icon/edit.svg";
import Delete from "../../../assets/icon/delete.svg";
import Button from "../button/button";

const ProductCard = ({ onClickEdit, onClickDelete, product = {} }) => {
  return (
    <div className={`card ${styles.card}`}>
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

      <div className={styles.body}>
        <div className={styles.name}>{product.name}</div>

        <p className={styles.description}>{product.description}</p>

        <p className={styles.price}>{product.price} USD</p>

        <Button color="light" link={`/product/${product.link}`}>
          Watch
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
