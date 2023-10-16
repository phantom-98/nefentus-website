import Contact from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Home from "./pages/Home";
import "./style/general.css";
import Navigation from "./components/navigation/navigation";
import setCookies from "./components/setCookie/setCookie";
import {
  Route,
  HashRouter,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import SignUp from "./pages/Signup";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Affiliate from "./pages/Affiliate";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Imprint from "./pages/Imprint";
import PasswordForgot from "./pages/PasswordForgot";
import Product from "./pages/Product";
import Pay from "./pages/Pay";
import { useEffect, useState } from "react";
import ResetPassword from "./pages/ResetPassword";
import CookieBanner from "./components/cookieBanner/cookieBanner";
import Cookies from "js-cookie";
import { MessageContextProvider } from "./context/message";
import MainDashboard from "./dashboardNew/screens/mainDashboard";
import ScreenLayout from "./dashboardNew/containers/screenLayout/screenLayout";
import ProfileDashboard from "./dashboardNew/screens/profileDashboard";
import SecuritySettings from "./dashboardNew/containers/securitySettings/securitySettings";
import ConverterDashboard from "./dashboardNew/screens/converterDashboard";
import IdentificationDashboard from "./dashboardNew/screens/identificationDashboard";

import AffiliateDashboard from "./dashboardNew/screens/affiliateDashboard";
import ProductsDashboard from "./dashboardNew/screens/productsDashboard";
import TransactionDashboard from "./dashboardNew/screens/transactionDashboard";
import PaymentDashboard from "./dashboardNew/screens/paymentDashboard";
import AdminDashboard from "./dashboardNew/screens/adminDashboard";

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
        <HashRouter>
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
              {/* <Route
              path="/payroll"
              element={
                <Layout>
                  <Payroll />
                </Layout>
              }
            /> */}
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
                    <AdminDashboard />
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
                path="/dashboardNew/transaction"
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
            </Routes>
          </ScrollToTop>

          {/* COOKIE BANNER */}
          {!ck && <CookieBanner close={() => setCK(true)} />}
        </HashRouter>
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
