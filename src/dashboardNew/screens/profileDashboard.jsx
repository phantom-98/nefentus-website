import { useEffect, useState } from "react";
import ProfileSettings from "../containers/profileSettings/profileSettings";
import { useNavigate } from "react-router-dom";
import backendAPI from "../../api/backendAPI";
import { dashboardLink } from "../../utils";

const ProfileDashboard = () => {
  const [requireKyc, setRequireKyc] = useState(
    localStorage.getItem("requireKyc"),
  );
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const backendapi = new backendAPI();

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicUrl(localStorage.getItem("profile_pic"));
      setCounter(counter + 1);
      setRequireKyc(localStorage.setItem("requireKyc"));
    };

    async function checkJwtAndNavigate() {
      const jwtIsValid = await backendapi.checkJwt();
      if (jwtIsValid) {
        const newLink = dashboardLink(localStorage);
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
      <ProfileSettings />
    </div>
  );
};

export default ProfileDashboard;
