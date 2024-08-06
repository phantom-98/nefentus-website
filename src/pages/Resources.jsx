import { Helmet } from "react-helmet";
import ResourcesBody from "../components/resources";
import Navigation from "../components/navigation/navigation";

const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | Resources</title>
      </Helmet>
      <Navigation />
      <ResourcesBody />
    </>
  );
};

export default Resources;
