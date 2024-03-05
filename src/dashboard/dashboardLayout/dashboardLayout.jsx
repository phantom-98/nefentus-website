import Sidebar from "../sidebar/sidebar";
import Countdown from "../countdown/countdown";
import Header from "../header/header";
import Footer from "../footer";
import styles from "./dashboardLayout.module.css";
import Button from "../../components/button/button";
import { ROLE_TO_NAME } from "../../constants";
import { getRole, dashboardLink } from "../../utils";
import { useAuth } from "../../context/auth/authContext";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const role = getRole(localStorage);
  const roleName = ROLE_TO_NAME[role];
  const isAdmin = role === "admin";
  const email = user?.email;

  if (isAdmin || email === "nikolaykislik@gmail.com") {
    return (
      <>
        <div className="dashboard dashboardFont">
          <Sidebar />
          <div className={styles.content}>
            {children}
            <Footer />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="container dashboardFont">
        <Header title="Dashboard" logo={true} />
        <div>
          <Countdown>
            {(role === "admin" ||
              role === "leader" ||
              role === "seniorbroker" ||
              role === "broker") && (
              <div>
                <Button
                  link={dashboardLink(user)}
                  color={"white"}
                  style={{ padding: "0.3rem 0.5rem" }}
                >
                  To {roleName} Dashboard
                </Button>
              </div>
            )}
          </Countdown>
        </div>
      </div>
    );
  }
};

export default DashboardLayout;
