import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import backendAPI from "../api/backendAPI";
import ProductBody from "../components/productBody";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

const Product = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const productLink = params.productLink;
  const { state } = useLocation();
  const { defaultQuantity } = state || {};

  const backend_API = new backendAPI();

  async function loadProduct() {
    const newProduct = await backend_API.getProduct(productLink);
    if (newProduct) setProduct(newProduct);
  }

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>{product.name ? product.name : ""} | Nefentus</title>
      </Helmet>
      <ThirdwebProvider
        activeChain="ethereum"
        supportedWallets={[metamaskWallet()]}
        clientId="639eea2ebcabed7eab90b56aceeed08b"
      >
        <ProductBody product={product} quantity={defaultQuantity} />
      </ThirdwebProvider>
    </div>
  );
};

export default Product;
