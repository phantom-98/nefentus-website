import Footer from "./components/footer/footer";
import "./style/general.css";
import Navigation from "./components/navigation/navigation";
import setCookies from "./components/setCookie/setCookie";
import DashboardLayout from "./dashboard/dashboardLayout/dashboardLayout";
import React, { useEffect, useState, Suspense } from "react";
import {
  Route,
  HashRouter,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import CookieBanner from "./components/cookieBanner/cookieBanner";
import Cookies from "js-cookie";
import { MessageContextProvider } from "./context/message";
import RingLoader from "react-spinners/RingLoader";

import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "./assets/logo/loadingAnimation.json";

const MainDashboard = React.lazy(() =>
  import("./dashboardNew/screens/mainDashboard"),
);
const ScreenLayout = React.lazy(() =>
  import("./dashboardNew/containers/screenLayout/screenLayout"),
);
const ProfileDashboard = React.lazy(() =>
  import("./dashboardNew/screens/profileDashboard"),
);
const SecuritySettings = React.lazy(() =>
  import("./dashboardNew/containers/securitySettings/securitySettings"),
);
const AffiliateDashboard = React.lazy(() =>
  import("./dashboardNew/screens/affiliateDashboard"),
);
const ConverterDashboard = React.lazy(() =>
  import("./dashboardNew/screens/converterDashboard"),
);
const ProductsDashboard = React.lazy(() =>
  import("./dashboardNew/screens/productsDashboard"),
);
const PaymentDashboard = React.lazy(() =>
  import("./dashboardNew/screens/paymentDashboard"),
);
const AdminDashboard = React.lazy(() =>
  import("./dashboardNew/screens/adminDashboard"),
);
const TransactionDashboard = React.lazy(() =>
  import("./dashboardNew/screens/transactionDashboard"),
);
const IdentificationDashboard = React.lazy(() =>
  import("./dashboardNew/screens/identificationDashboard"),
);

const IntegrationsDashboard = React.lazy(() =>
  import("./dashboardNew/screens/integrationsDashboard"),
);

const Contact = React.lazy(() => import("./components/contact/contact"));
const Home = React.lazy(() => import("./pages/Home"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Layout = React.lazy(() => import("./pages/Layout"));
const Login = React.lazy(() => import("./pages/Login"));
const Payment = React.lazy(() => import("./pages/Payment"));
const Affiliate = React.lazy(() => import("./pages/Affiliate"));
const Support = React.lazy(() => import("./pages/Support"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Imprint = React.lazy(() => import("./pages/Imprint"));
const PasswordForgot = React.lazy(() => import("./pages/PasswordForgot"));
const Product = React.lazy(() => import("./pages/Product"));
const Pay = React.lazy(() => import("./pages/Pay"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));

// OLD DASHBOARD
// const AffiliateDashboard = React.lazy(() => import("./dashboard/Affiliate"));
// const Settings = React.lazy(() => import("./dashboard/Settings"));
// const Vendor = React.lazy(() => import("./dashboard/Vendor"));
// const Products = React.lazy(() => import("./dashboard/Products"));
// const Transactions = React.lazy(() => import("./dashboard/Transactions"));
// const PaymentDashboard = React.lazy(() => import("./dashboard/Payment"));
// const PayrollDashboard = React.lazy(() => import("./dashboard/Payroll"));
// const Wallet = React.lazy(() => import("./dashboard/Wallet"));
// const Admin = React.lazy(() => import("./dashboard/Admin"));
// const Kyc = React.lazy(() => import("./dashboard/Kyc"));

function App() {
  useEffect(() => {
    const scrollEvent = () => {
      const scrollElement = document.querySelectorAll(".scroll");
      const slideElement = document.querySelectorAll(".slide-left");
      const slideElement2 = document.querySelectorAll(".slide-right");

      const addClass = (element, className) => {
        for (let i = 0; i < element.length; i++) {
          const sectionTop = element[i].offsetTop;

          const scrollPosition = window.scrollY;

          if (scrollPosition + window.innerHeight * 0.6 >= sectionTop) {
            element[i].classList.add(className);
          }
        }
      };

      addClass(scrollElement, "scrollAnimation");
      addClass(slideElement, "slideAnimation");
      addClass(slideElement2, "slideAnimation");
    };

    window.addEventListener("scroll", scrollEvent);

    document.addEventListener("contextmenu", (event) => {
      // event.preventDefault();
    });

    return () => {
      window.removeEventListener("scroll", () => scrollEvent);
    };
  }, []);

  const [ck, setCK] = useState(Cookies.get("acceptCookie"));

  return (
    <div className="App">
      <MessageContextProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="loadingAnimationWrapper">
                <Player
                  src={LoadingAnimation}
                  className="loadingAnimation"
                  loop
                  autoplay
                />
              </div>
            }
          >
            <ScrollToTop>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/forgot-password"
                  element={
                    <>
                      <PasswordForgot />
                    </>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <>
                      <ResetPassword />
                    </>
                  }
                />

                <Route
                  path="/payment"
                  element={
                    <>
                      <Navigation />

                      <Payment />
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/affiliate"
                  element={
                    <Layout affiliate={true}>
                      <Affiliate />
                    </Layout>
                  }
                />
                <Route
                  path="/support"
                  element={
                    <>
                      <Navigation />

                      <Support />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <>
                      <Navigation />
                      <Privacy />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/imprint"
                  element={
                    <>
                      <Navigation />
                      <Imprint />
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/dashboardNew/"
                  element={
                    <ScreenLayout>
                      <MainDashboard />
                    </ScreenLayout>
                  }
                />

                <Route
                  path="/dashboardNew/affiliate"
                  element={
                    <ScreenLayout>
                      <AffiliateDashboard />
                    </ScreenLayout>
                  }
                />

                <Route
                  path="/dashboardNew/profile"
                  element={
                    <ScreenLayout>
                      <ProfileDashboard />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/security"
                  element={
                    <ScreenLayout>
                      <SecuritySettings />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/converter"
                  element={
                    <ScreenLayout>
                      <ConverterDashboard />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/products"
                  element={
                    <ScreenLayout>
                      <ProductsDashboard />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/payments"
                  element={
                    <ScreenLayout>
                      <PaymentDashboard />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/admin"
                  element={
                    <ScreenLayout>
                      <AdminDashboard type={"admin"} />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/partner"
                  element={
                    <ScreenLayout>
                      <AdminDashboard type="partner" />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/transactions"
                  element={
                    <ScreenLayout>
                      <TransactionDashboard />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/Identification"
                  element={
                    <ScreenLayout>
                      <IdentificationDashboard />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/integrations"
                  element={
                    <ScreenLayout>
                      <IntegrationsDashboard />
                    </ScreenLayout>
                  }
                />
              </Routes>
            </ScrollToTop>
          </Suspense>

          {/* COOKIE BANNER */}
          {!ck && <CookieBanner close={() => setCK(true)} />}
        </BrowserRouter>
      </MessageContextProvider>
    </div>
  );
}

export default App;

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};
