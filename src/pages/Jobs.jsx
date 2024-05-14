import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import JobBody from "../components/jobBody";

const Jobs = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.vacancy")}</title>
      </Helmet>
      <JobBody />
    </div>
  );
};

export default Jobs;
