// Deprecated on October 25 following the implementation of the new Nefentus design.
import { Helmet } from "react-helmet";
import B2CBody from "../components/landing/B2C";

const B2C = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | B2C</title>
      </Helmet>
      <B2CBody />
    </>
  );
};

export default B2C;
