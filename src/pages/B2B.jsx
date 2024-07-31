import { Helmet } from "react-helmet";
import B2BBody from "../components/landing/B2B";

const B2B = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | B2B</title>
      </Helmet>
      <B2BBody />
    </>
  );
};

export default B2B;
