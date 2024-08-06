import { Helmet } from "react-helmet";
import HomeBody from "../components/landing";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | Home</title>
      </Helmet>
      <HomeBody />
    </>
  );
};

export default Home;
