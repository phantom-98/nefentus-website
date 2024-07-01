import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import backendAPI from "../api/backendAPI";
import ProductView from "../components/productView";
import { Spin } from "antd";
import ContentNotFound from "../NEFDashboard/components/contentNotFound";
import ProductNotFoundIcon from "../assets/newDashboardIcons/product-not-found.svg";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const productLink = params.productLink;
  const backend_API = new backendAPI();

  async function loadProduct() {
    const newProduct = await backend_API.getProduct(productLink);
    if (newProduct) setProduct(newProduct);
    setLoading(false);
  }

  useEffect(() => {
    loadProduct();
  }, []);

  return loading ? (
    <Spin size="large" spinning={loading} fullscreen />
  ) : (
    <div
      className={product && Object.keys(product)?.length > 0 ? "container" : ""}
    >
      <Helmet>
        <title>{product.name ? product.name : ""} | Nefentus</title>
      </Helmet>

      {product && Object.keys(product)?.length > 0 ? (
        <ProductView product={product} />
      ) : (
        <ContentNotFound
          icon={ProductNotFoundIcon}
          title={"content.productTitle"}
          description={"content.productDescription"}
        />
      )}
    </div>
  );
};

export default Product;
