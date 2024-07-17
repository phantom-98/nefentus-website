import Footer from "./components/footer";
import "./style/general.css";
import Navigation from "./components/navigation/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import CookieBanner from "./components/cookieBanner/cookieBanner";
import { getAcceptCookie } from "./func/cookies";
import { MessageContextProvider } from "./context/message";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SignUp = React.lazy(() => import("./pages/Signup"));
const Layout = React.lazy(() => import("./pages/Layout"));
const Login = React.lazy(() => import("./pages/Login"));
const Payment = React.lazy(() => import("./pages/Payment"));
const Affiliate = React.lazy(() => import("./pages/Affiliate"));
const Support = React.lazy(() => import("./pages/Support"));
const Privacy = React.lazy(() => import("./pages/PrivacyPolicy"));
const Imprint = React.lazy(() => import("./pages/Imprint"));
const PasswordForgot = React.lazy(() => import("./pages/PasswordForgot"));
const Product = React.lazy(() => import("./pages/Product"));
const ProductPay = React.lazy(() => import("./pages/ProductPay"));
const Pay = React.lazy(() => import("./pages/Pay"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Vacancy = React.lazy(() => import("./pages/Vacancy"));
const Jobs = React.lazy(() => import("./pages/Jobs"));

import { ThemeProvider } from "./context/themeContext/themeContext";
import { AuthProvider } from "./context/auth/authContext";
import {
  ThirdwebProvider,
  bloctoWallet,
  coin98Wallet,
  coinbaseWallet,
  coreWallet,
  cryptoDefiWallet,
  frameWallet,
  metamaskWallet,
  okxWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnect,
  xdefiWallet,
  zerionWallet,
} from "@thirdweb-dev/react";
import DashboardLayout from "./NEFDashboard/containers/dashboardLayout";
import PersonalDashboard from "./NEFDashboard/containers/personalDashboard";
import ReferralDashboard from "./NEFDashboard/containers/referralDashboard";
import SalesDashboard from "./NEFDashboard/containers/salesDashboard";
import SettingLayout from "./NEFDashboard/containers/settingLayout";
import SettingPage from "./NEFDashboard/containers/settings";
import Products from "./NEFDashboard/containers/products";
import CreateInvoice from "./NEFDashboard/containers/createInvoiceDashboard";
import AuthLayout from "./NEFDashboard/containers/authLayout";
import LoginForm from "./NEFDashboard/containers/login";
import SignForm from "./NEFDashboard/containers/signUp";
import ForgotPassword from "./NEFDashboard/containers/forgotPassword";
import SetPasswordForm from "./NEFDashboard/containers/setPassword";
import NewLanding, {
  Contact,
  Contact_Expert,
  NewB2B,
  NewB2C,
  NewResources,
} from "./pages/Landing";
import Resources from "./components/resources";
import PageNotFound from "./NEFDashboard/components/pageNotFound";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
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

  const [ck, setCK] = useState(getAcceptCookie());

  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="639eea2ebcabed7eab90b56aceeed08b"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            coinbaseWallet({ recommended: true }),
            walletConnect(),
            trustWallet(),
            zerionWallet(),
            bloctoWallet(),
            frameWallet(),
            rainbowWallet(),
            phantomWallet(),
          ],
        }),
        trustWallet(),
        zerionWallet(),
        bloctoWallet(),
        frameWallet(),
        rainbowWallet(),
        phantomWallet(),
        okxWallet(),
        coin98Wallet(),
        coreWallet(),
        cryptoDefiWallet(),
        oneKeyWallet(),
        rabbyWallet(),
        xdefiWallet(),
      ]}
    >
      <AuthProvider>
        <ThemeProvider>
          <div className={`App`}>
            <MessageContextProvider>
              <ToastContainer />
              <BrowserRouter>
                <Suspense
                  fallback={
                    <div className="loadingAnimationWrapper">
                      {/* <Player
                      src={LoadingAnimation}
                      className="loadingAnimation"
                      loop
                      autoplay
                    /> */}
                    </div>
                  }
                >
                  <ScrollToTop>
                    <Routes>
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/signup" element={<SignForm />} />
                      <Route
                        path="/forgot-password"
                        element={
                          <AuthLayout>
                            <ForgotPassword />
                          </AuthLayout>
                        }
                      />
                      <Route
                        path="/reset-password"
                        element={
                          <AuthLayout>
                            <SetPasswordForm />
                          </AuthLayout>
                        }
                      />
                      <Route
                        path="/new-settings"
                        element={
                          <SettingLayout title={"settingPage.title"}>
                            <SettingPage />
                          </SettingLayout>
                        }
                      />
                      <Route
                        path="/personal-dashboard"
                        element={
                          <DashboardLayout
                            title={"personalDashboard.title"}
                            type={"admin"}
                          >
                            <PersonalDashboard />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="/referral-dashboard"
                        element={
                          <DashboardLayout title={"referralDashboard.title"}>
                            <ReferralDashboard />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="/sales-dashboard"
                        element={
                          <DashboardLayout title={"salesDashboard.title"}>
                            <SalesDashboard />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="/products-dashboard"
                        element={
                          <DashboardLayout title={"productsDashboard.title"}>
                            <Products />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="/create-invoice"
                        element={
                          <DashboardLayout title={"payments.createInvoice"}>
                            <CreateInvoice />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="/product-detail/:productLink"
                        element={
                          <DashboardLayout
                            title={"productsDashboard.productDetail"}
                          >
                            <Product />
                          </DashboardLayout>
                        }
                      />
                      {/* <Route
                        path="/"
                        element={
                          <Layout>
                            <Home />
                          </Layout>
                        }
                      /> */}
                      <Route
                        path="/"
                        element={
                          <Layout>
                            <NewLanding />
                          </Layout>
                        }
                      />
                      <Route
                        path="/b2c"
                        element={
                          <Layout>
                            <NewB2C />
                          </Layout>
                        }
                      />
                      <Route
                        path="/b2b"
                        element={
                          <Layout>
                            <NewB2B />
                          </Layout>
                        }
                      />
                      <Route path="/resources" element={<NewResources />} />
                      <Route
                        path="/business-support"
                        element={
                          <Layout>
                            <Contact />
                          </Layout>
                        }
                      />
                      <Route
                        path="/technical-support"
                        element={
                          <Layout>
                            <Contact_Expert />
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
                        path="/vacancy"
                        element={
                          <>
                            <Layout>
                              <Vacancy />
                            </Layout>
                          </>
                        }
                      />
                      <Route
                        path="/jobs"
                        element={
                          <>
                            <Layout>
                              <Jobs />
                            </Layout>
                          </>
                        }
                      />
                      <Route
                        path="/product/:productLink"
                        element={
                          <>
                            <Navigation />
                            <Product />
                            <Footer />
                          </>
                        }
                      />
                      <Route
                        path="/product/:productLink/pay"
                        element={
                          <>
                            {/* <Navigation /> */}
                            <ProductPay />
                            {/* <Footer /> */}
                          </>
                        }
                      />
                      <Route
                        path="/pay/:payLink"
                        element={
                          <>
                            {/* <Navigation /> */}
                            <Pay />
                            {/* <Footer /> */}
                          </>
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <>
                            <Navigation />
                            <PageNotFound />
                          </>
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
        </ThemeProvider>
      </AuthProvider>
    </ThirdwebProvider>
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
