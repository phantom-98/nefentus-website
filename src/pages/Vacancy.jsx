import { Helmet } from "react-helmet";
import VacancyBody from "../components/vacancyBody";

const Vacancy = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Vacancy</title>
      </Helmet>
      <VacancyBody />
    </div>
  );
};

export default Vacancy;
