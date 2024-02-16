import { useTranslation } from "react-i18next";
import ProductBody from "./products/index";
import { Helmet } from "react-helmet";

const Products = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.products")}</title>
      </Helmet>
      <ProductBody />
    </>
  );
};

export default Products;
