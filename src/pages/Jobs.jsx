import { Helmet } from "react-helmet";
import JobBody from "../components/jobBody";

const Jobs = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Vacancy</title>
      </Helmet>
      <JobBody />
    </div>
  );
};

export default Jobs;
