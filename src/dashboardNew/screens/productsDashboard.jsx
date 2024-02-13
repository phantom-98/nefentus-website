import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import ProductBody from "../containers/productBody/productBody";
import { checkJwtToken } from "../../utils";

const ProductsDashboard = () => {
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <ProductBody />
      <SignupByEmail />
    </div>
  );
};

export default ProductsDashboard;
