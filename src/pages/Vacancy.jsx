import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import VacancyBody from "../components/vacancyBody";

const Vacancy = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.vacancy")}</title>
      </Helmet>
      <VacancyBody />
    </div>
  );
};

export default Vacancy;
