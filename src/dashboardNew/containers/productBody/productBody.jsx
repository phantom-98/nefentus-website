import Card from "../../components/card/card";
import ProductCard from "../../components/productCard/productCard";
import SettingsTitle from "../../components/settings/settingsTitle";
import styles from "./productBody.module.css";

const cardContent = [
  {
    name: "Chainlink oracle",
    description: "Decentralized middleware that enables smart data.",
    image:
      "https://static6.depositphotos.com/1025740/593/i/450/depositphotos_5932535-stock-photo-euuro-metal.jpg",
    price: "30,000.00 $",
  },
];

const ProductBody = () => {
  return (
    <Card>
      <div className={styles.titleHeader}>
        <SettingsTitle
          title="Total Products"
          description="You’ve added 3 new product this month"
          product
        />
      </div>

      <div className={styles.row}>
        {cardContent.map((item) => (
          <ProductCard product={item} />
        ))}
      </div>
    </Card>
  );
};

export default ProductBody;
