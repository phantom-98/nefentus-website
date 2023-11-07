import styles from "./productCard.module.css";

import Edit from "../../../assets/icon/edit.svg";
import Delete from "../../../assets/icon/delete.svg";
import Button from "../button/button";
import { useState } from "react";
import Popup from "../popup/popup";

const ProductCard = ({ onClickDelete = () => {}, product = {} }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={`card ${styles.card}`}>
        <div className={styles.imageWrapper}>
          <div className={styles.icons}>
            <img src={Edit} alt="Edit product" onClick={() => setShow(true)} />
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

          <p className={styles.price}>{product.price}</p>

          <Button color="light">Watch</Button>
        </div>
      </div>

      <Popup show={show} setShow={setShow} title="Edit Product">
        <div className={styles.inputWrapper}>
          <div className={styles.inputItem}>
            <div className={styles.modalSubtitle}>Product name</div>
            <input
              type="text"
              className={styles.input}
              placeholder="Change product name"
              value={product.name}
            />
          </div>

          <div className={styles.inputItem}>
            <div className={styles.modalSubtitle}>Product price in $</div>
            <input
              type="number"
              className={styles.input}
              placeholder="Change product price in $"
              value={product.price}
            />
          </div>

          <div className={styles.inputItem}>
            <div className={styles.modalSubtitle}>Product description</div>
            <textarea
              type="text"
              className={styles.input}
              placeholder="Change product description"
              rows={3}
              value={product.description}
            />
          </div>
        </div>
      </Popup>
    </>
  );
};

export default ProductCard;
