import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import ProductBody from "../containers/productBody/productBody";
import { checkJwtToken } from "../../utils";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const ProductsDashboard = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.products")}</title>
      </Helmet>
      <ProductBody />
      <SignupByEmail />
    </div>
  );
};

export default ProductsDashboard;
