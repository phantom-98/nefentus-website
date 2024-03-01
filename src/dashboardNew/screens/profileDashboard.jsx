import { useEffect, useState } from "react";
import ProfileSettings from "../containers/profileSettings/profileSettings";
import { useNavigate } from "react-router-dom";
import backendAPI from "../../api/backendAPI";
import { checkJwtToken, dashboardLink } from "../../utils";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/auth/authContext";

const ProfileDashboard = () => {
  const { user } = useAuth();
  const [requireKyc, setRequireKyc] = useState(user?.requireKyc);
  const [counter, setCounter] = useState(0);
  const [link, setLink] = useState(null);
  const navigate = useNavigate();
  const backendapi = new backendAPI();
  const { t } = useTranslation();

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicUrl(user?.profileImage);
      setCounter(counter + 1);
      setRequireKyc(user?.requireKyc);
    };

    async function checkJwtAndNavigate() {
      await checkJwtToken();
      const jwtIsValid = await backendapi.checkJwt();
      if (jwtIsValid) {
        const newLink = dashboardLink(user);
        setLink(newLink);
      } else {
        navigate("/login");
      }
    }

    checkJwtAndNavigate();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [counter]);

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.profile")}</title>
      </Helmet>
      <ProfileSettings />
      <SignupByEmail />
    </div>
  );
};

export default ProfileDashboard;
