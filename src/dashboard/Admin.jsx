import AdminBody from "./admin/index";
import { Helmet } from "react-helmet";
import Footer from "./footer";
import { useTranslation } from "react-i18next";

const Admin = ({ type }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="container dashboardContainer">
        <Helmet>
          <title>Nefentus | {t("navigation.dashboard")}</title>
        </Helmet>
        <AdminBody type={type} />
      </div>
      <Footer />
    </>
  );
};

export default Admin;
