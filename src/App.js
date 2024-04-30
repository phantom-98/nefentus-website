import Footer from "./components/footer/footer";
import "./style/general.css";
import Navigation from "./components/navigation/navigation";
import React, { useEffect, useState, Suspense } from "react";
import {
  Route,
  HashRouter,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import CookieBanner from "./components/cookieBanner/cookieBanner";
import { getAcceptCookie } from "./func/cookies";
import { MessageContextProvider } from "./context/message";
import RingLoader from "react-spinners/RingLoader";

import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "./assets/logo/loadingAnimation.json";
import WalletSetting from "./dashboardNew/containers/walletSetting/walletSetting";
import InvoicesBody from "./dashboardNew/components/invoiceBody/invoiceBody";
import { KYC } from "./dashboard/settings/components/KYC";
import Kyc from "./dashboardNew/components/kyc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const Privacy = React.lazy(() => import("./pages/PrivacyPolicy"));
const Imprint = React.lazy(() => import("./pages/Imprint"));
const PasswordForgot = React.lazy(() => import("./pages/PasswordForgot"));
const Product = React.lazy(() => import("./pages/Product"));
const ProductPay = React.lazy(() => import("./pages/ProductPay"));
const Pay = React.lazy(() => import("./pages/Pay"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));

// OLD DASHBOARD
// const AffiliateDashboard = React.lazy(() => import("./dashboard/Affiliate"));
// const Settings = React.lazy(() => import("./dashboard/Settings"));
// const Vendor = React.lazy(() => import("./dashboard/Vendor"));
//const Products = React.lazy(() => import("./dashboard/Products"));
// const Transactions = React.lazy(() => import("./dashboard/Transactions"));
// const PaymentDashboardOld = React.lazy(() => import("./dashboard/Payment"));
// const PayrollDashboard = React.lazy(() => import("./dashboard/Payroll"));
// const Wallet = React.lazy(() => import("./dashboard/Wallet"));
// const Admin = React.lazy(() => import("./dashboard/Admin"));
// const Kyc = React.lazy(() => import("./dashboard/Kyc"));
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
                        path="/dashboard/"
                        element={
                          <ScreenLayout>
                            <MainDashboard />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/admin"
                        element={
                          <ScreenLayout>
                            <AdminDashboard type={"admin"} />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/partner"
                        element={
                          <ScreenLayout>
                            <AdminDashboard type="partner" />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/agent"
                        element={
                          <ScreenLayout>
                            <AdminDashboard type="agent" />
                          </ScreenLayout>
                        }
                      />

                      <Route
                        path="/dashboard/profile"
                        element={
                          <ScreenLayout>
                            <ProfileDashboard />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/invoices"
                        element={
                          <ScreenLayout>
                            <InvoicesBody />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/security"
                        element={
                          <ScreenLayout>
                            <SecuritySettings />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/converter"
                        element={
                          <ScreenLayout>
                            <ConverterDashboard />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/products"
                        element={
                          <ScreenLayout>
                            <ProductsDashboard />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/payments"
                        element={
                          <ScreenLayout>
                            <PaymentDashboard />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/admin"
                        element={
                          <ScreenLayout>
                            <AdminDashboard type={"admin"} />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/kyc"
                        element={
                          <ScreenLayout>
                            <Kyc />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/partner"
                        element={
                          <ScreenLayout>
                            <AdminDashboard type="partner" />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/transactions"
                        element={
                          <ScreenLayout>
                            <TransactionDashboard />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/identification"
                        element={
                          <ScreenLayout>
                            <IdentificationDashboard />
                          </ScreenLayout>
                        }
                      />
                      <Route
                        path="/dashboard/integrations"
                        element={
                          <ScreenLayout>
                            <IntegrationsDashboard />
                          </ScreenLayout>
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
                            <Navigation />
                            <ProductPay />
                            <Footer />
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
